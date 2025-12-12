"use client";

import Link from "next/link";
import { useState } from "react";

// Mock data function to simulate fetching task details
const fetchTaskDetails = (id) => {
  // In the real app, this would be an API call based on the ID
  return {
    id: id,
    title: `Task #${id}: Github Basics Setup`,
    description:
      "This task requires you to set up Git on your local machine, create a new repository, make an initial commit, and push it to GitHub. This is a foundational step for all tech tasks.",
    category: "Tech", // Category (tech, creative, social impact, etc.) [cite: 33]
    difficulty: "Easy", // Difficulty Level [cite: 34]
    score: 25, // Impact Score awarded [cite: 35]
    briefingLink: "https://youtube.com/git-briefing-video", // Mock Video/Summary PDF link [cite: 38]
  };
};

export default function DetailedTaskPage({ params }) {
  // Extract the task ID from the URL parameters
  const taskId = params.taskId;
  const task = fetchTaskDetails(taskId);

  // State to handle the submission modal (mocking interaction)
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);

  // --- Submission Handler Mock ---
  const handleSubmission = (event) => {
    event.preventDefault();
    // In the real app: Send data to the secure task submission storage [cite: 68]
    // and trigger the Impact Score calculation engine[cite: 62].
    alert(
      `Task ${task.title} submission successful! (Submission Type: ${event.target.submissionType.value})`
    );
    setIsSubmissionOpen(false);
    // Backend notes: Auto tracking and time-stamp happens here [cite: 42]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <Link
        href="/dashboard"
        className="text-purple-600 hover:underline mb-6 inline-block"
      >
        &larr; Back to Task Library
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          {task.title}
        </h1>

        <div className="flex flex-wrap items-center space-x-4 mb-8 text-sm">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
            {task.category}
          </span>
          <span className="text-gray-500">Difficulty: {task.difficulty}</span>
          <span className="text-green-600 font-bold">
            Impact Score: +{task.score}
          </span>
        </div>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          {task.description}
        </p>

        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          Task Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* On Clicking a Task → Detailed Task Page Includes 3 key action buttons: [cite: 36] */}

          {/* 3.2.1. Get a Briefing [cite: 37] */}
          <a
            href={task.briefingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border-2 border-purple-500 rounded-xl text-center bg-purple-50 hover:bg-purple-100 transition duration-300 shadow-md flex flex-col items-center justify-center"
          >
            <span className="text-3xl mb-2">🎥</span>
            <span className="font-bold text-lg text-purple-800">
              Get a Briefing
            </span>
            <p className="text-sm text-gray-600">
              Opens a short video/summary PDF explaining the task. [cite: 38]
            </p>
          </a>

          {/* 3.2.2. Task Submission [cite: 39] */}
          <button
            onClick={() => setIsSubmissionOpen(true)}
            className="p-4 border-2 border-green-500 rounded-xl text-center bg-green-50 hover:bg-green-100 transition duration-300 shadow-md flex flex-col items-center justify-center"
          >
            <span className="text-3xl mb-2">✅</span>
            <span className="font-bold text-lg text-green-800">
              Task Submission
            </span>
            <p className="text-sm text-gray-600">
              Submit your work (Link / Photo / Document / Text write-up). [cite:
              41]
            </p>
          </button>

          {/* 3.2.3. Get Mentorship [cite: 43] */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Mock: Connecting you to an available mentor now!");
            }}
            className="p-4 border-2 border-blue-500 rounded-xl text-center bg-blue-50 hover:bg-blue-100 transition duration-300 shadow-md flex flex-col items-center justify-center"
          >
            <span className="text-3xl mb-2">🧑‍🏫</span>
            <span className="font-bold text-lg text-blue-800">
              Get Mentorship
            </span>
            <p className="text-sm text-gray-600">
              Connect to available mentors. [cite: 44]
            </p>
          </a>
        </div>
      </div>

      {/* Mock Submission Modal */}
      {isSubmissionOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Submit: {task.title}
            </h3>
            <form onSubmit={handleSubmission}>
              <label className="block mb-2 font-medium text-gray-700">
                Submission Type:
              </label>
              <select
                name="submissionType"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              >
                <option value="link">Link</option>{" "}
                {/* Submission types: Link / Photo / Document / Text write-up [cite: 41] */}
                <option value="photo">Photo</option>
                <option value="document">Document</option>
                <option value="text">Text write-up</option>
              </select>
              <textarea
                name="submissionContent"
                rows="4"
                placeholder="Paste your link or type your submission here..."
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 mb-4"
              ></textarea>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsSubmissionOpen(false)}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
                >
                  Submit Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
