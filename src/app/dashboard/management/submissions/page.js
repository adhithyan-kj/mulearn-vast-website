"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  increment,
  getDoc,
} from "firebase/firestore";
import {
  CheckCircle,
  XCircle,
  ExternalLink,
  Loader2,
  User,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import RoleGuard from "@/components/RoleGuard";

export default function VerifySubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      // Fetch only "pending" submissions
      const q = query(
        collection(db, "submissions"),
        where("status", "==", "pending")
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubmissions(data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (submission, status) => {
    let feedback = "";
    if (status === "rejected") {
      feedback = prompt("Please provide a reason for rejection (Mandatory):");
      if (!feedback) return alert("Rejection requires a reason.");
    }

    setProcessing(submission.id);
    try {
      const subRef = doc(db, "submissions", submission.id);
      const studentRef = doc(db, "users", submission.studentId);

      // 1. Update Submission Status
      await updateDoc(subRef, {
        status: status,
        feedback: feedback,
        verifiedAt: new Date(),
      });

      // 2. If Approved, update Student Stats
      if (status === "approved") {
        // Fetch task reward amount (fixedXP)
        const taskRef = doc(db, "tasks", submission.taskId);
        const taskSnap = await getDoc(taskRef);
        const reward = taskSnap.exists() ? Number(taskSnap.data().score) : 0;

        await updateDoc(studentRef, {
          impactScore: increment(reward),
          tasksCompleted: increment(1),
        });
      }

      // Refresh list
      setSubmissions((prev) => prev.filter((s) => s.id !== submission.id));
      alert(`Submission ${status} successfully!`);
    } catch (error) {
      console.error("Action error:", error);
      alert("Failed to process submission.");
    } finally {
      setProcessing(null);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    );

  return (
    <RoleGuard allowedRoles={["admin", "mentor"]}>
      <div className="max-w-6xl mx-auto space-y-6 pb-10">
        <header>
          <h2 className="text-2xl font-black text-gray-900">
            Verify Submissions
          </h2>
          <p className="text-gray-500 text-sm italic">
            Review and reward community contributions.
          </p>
        </header>

        {submissions.length === 0 ? (
          <div className="bg-white/50 border border-dashed border-gray-200 rounded-3xl p-20 text-center">
            <CheckCircle className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-400 font-medium">
              All caught up! No pending submissions.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:shadow-md transition-all"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-purple-100 text-purple-600 rounded-lg">
                      <User size={16} />
                    </span>
                    <p className="font-bold text-gray-900">{sub.studentId}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                      <BookOpen size={16} />
                    </span>
                    <p className="text-sm text-gray-600 font-medium">
                      Task: <span className="text-gray-900">{sub.taskId}</span>
                    </p>
                  </div>

                  {/* Proof Links */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <a
                      href={sub.links.drive}
                      target="_blank"
                      className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                      Drive Link <ExternalLink size={10} />
                    </a>
                    <a
                      href={sub.links.screenshot}
                      target="_blank"
                      className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                      Screenshots <ExternalLink size={10} />
                    </a>
                  </div>
                </div>

                <div className="flex gap-2 w-full lg:w-auto">
                  <button
                    onClick={() => handleAction(sub, "rejected")}
                    disabled={processing === sub.id}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all disabled:opacity-50"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                  <button
                    onClick={() => handleAction(sub, "approved")}
                    disabled={processing === sub.id}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-100 transition-all disabled:opacity-50"
                  >
                    {processing === sub.id ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <>
                        <CheckCircle size={18} /> Approve
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
