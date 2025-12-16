// src/app/dashboard/profile/page.js
import Link from "next/link";
// CORRECTED IMPORT: Medal is now included here.
import {
  Mail,
  Briefcase,
  Zap,
  Trophy,
  TrendingUp,
  Github,
  ExternalLink,
  GraduationCap,
  Code,
  Medal,
} from "lucide-react";

// Mock data for the Profile
const mockProfileData = {
  name: "Adithyan V.",
  stream: "EE 2024",
  college: "College of Engineering, Trivandrum",
  impactScore: 6850,
  globalRank: 42,
  badges: [
    {
      name: "First Contribution",
      color: "bg-yellow-500",
      icon: <Trophy size={18} />,
    },
    {
      name: "Backend Fundementals",
      color: "bg-green-500",
      icon: <Code size={18} />,
    },
    { name: "Git Guru", color: "bg-purple-500", icon: <Github size={18} /> },
    {
      name: "Frontend Warrior",
      color: "bg-blue-500",
      icon: <Briefcase size={18} />,
    },
  ],
  achievements: [
    { title: "React Basics", progress: 90, level: "Advanced" },
    { title: "Node.js API", progress: 75, level: "Intermediate" },
    { title: "Design Thinking", progress: 50, level: "Beginner" },
  ],
  contact: [
    { type: "Email", value: "adithyan.v@vast.edu", icon: <Mail size={18} /> },
    { type: "GitHub", value: "adithyan-dev", icon: <Github size={18} /> },
  ],
};

export default function ProfilePage() {
  const user = mockProfileData;

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h2>
        <p className="text-gray-500 text-sm">
          Manage your personal details and view your progress.
        </p>
      </header>

      {/* Profile Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Column 1: Identity & Contact */}
        <div className="lg:col-span-1 xl:col-span-1 space-y-6">
          <ProfileCard>
            <div className="flex flex-col items-center text-center">
              {/* Profile Picture Placeholder (Matching the reference design) */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center text-5xl font-extrabold text-white mb-4 shadow-xl">
                {user.name[0]}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.stream}</p>
              <button className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors">
                Edit Profile
              </button>
            </div>
          </ProfileCard>

          {/* Contact Details Card */}
          <ProfileCard title="Contact Info">
            <div className="space-y-3">
              {user.contact.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 text-sm text-gray-700"
                >
                  <span className="text-purple-600">{item.icon}</span>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </ProfileCard>
        </div>

        {/* Column 2: Stats and Achievements (Main Column) */}
        <div className="lg:col-span-2 xl:col-span-3 space-y-6">
          {/* Top Stat Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatMetric
              icon={<Zap size={24} />}
              label="Impact Score"
              value={user.impactScore}
              color="from-purple-600 to-indigo-500"
            />
            <StatMetric
              icon={<Trophy size={24} />}
              label="Global Rank"
              value={`#${user.globalRank}`}
              color="from-green-500 to-emerald-600"
            />
            <StatMetric
              icon={<TrendingUp size={24} />}
              label="Tasks Completed"
              value="12"
              color="from-blue-500 to-cyan-500"
            />
          </div>

          {/* Achievements/Skills Card */}
          <ProfileCard
            title="Current Learning Path"
            icon={<GraduationCap size={20} className="text-purple-600" />}
          >
            <div className="space-y-4">
              {user.achievements.map((item, index) => (
                <ProgressItem
                  key={index}
                  title={item.title}
                  progress={item.progress}
                  level={item.level}
                />
              ))}
            </div>
          </ProfileCard>

          {/* Badges Card */}
          <ProfileCard
            title="Badges & Recognitions"
            icon={<Medal size={20} className="text-yellow-600" />}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {user.badges.map((badge, index) => (
                <Badge
                  key={index}
                  name={badge.name}
                  color={badge.color}
                  icon={badge.icon}
                />
              ))}
            </div>
          </ProfileCard>

          {/* External Links / Social */}
          <ProfileCard
            title="Portfolio & Social"
            icon={<ExternalLink size={20} className="text-blue-600" />}
          >
            <div className="flex flex-wrap gap-3">
              <SocialButton
                icon={<Github size={20} />}
                text="GitHub"
                href={`https://github.com/${
                  user.contact.find((c) => c.type === "GitHub").value
                }`}
              />
              <SocialButton
                icon={<Mail size={20} />}
                text="Email"
                href={`mailto:${
                  user.contact.find((c) => c.type === "Email").value
                }`}
              />
            </div>
          </ProfileCard>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// HELPER COMPONENTS
// ----------------------------------------------------

// Base Card component for the Glassmorphism look
function ProfileCard({ title, icon, children }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-lg relative">
      {(title || icon) && (
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          {icon}
        </div>
      )}
      {children}
    </div>
  );
}

// Metric component for the top stat bar
function StatMetric({ label, value, icon, color }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-sm">
      <div className="flex items-center space-x-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${color} bg-gradient-to-br shadow-md`}
        >
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">
            {label}
          </p>
          <p
            className={`text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${color}`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

// Progress Bar Item
function ProgressItem({ title, progress, level }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <span className="text-xs text-gray-500">
          {level} - {progress}%
        </span>
      </div>
      <div className="w-full bg-gray-200/50 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-600 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

// Badge Component
function Badge({ name, color, icon }) {
  return (
    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white transition-colors">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${color}`}
      >
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </div>
  );
}

// Social Button
function SocialButton({ icon, text, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-purple-600 transition-colors shadow-md"
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}
