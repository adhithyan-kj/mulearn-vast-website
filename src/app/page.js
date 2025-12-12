import Link from "next/link";

export default function Home() {
  const mottos = [
    "Re-engineering campus talent",
    "into real-world impact.",
    "Building the ecosystem.",
  ];

  return (
    <main className="min-h-screen font-sans">
      {/* 1.1 Header: Glassmorphism Effect */}
      <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-600">
                MuLearn VAST
              </span>
            </div>

            {/* CTA Button */}
            <Link
              href="/onboarding"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-full hover:shadow-lg hover:opacity-90 transition-all transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* 1.2 Hero Section: Modern & Clean */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-6 tracking-wide">
            🚀 JOIN THE REVOLUTION
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            {mottos[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              {mottos[1]}
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 mb-10">
            Connect, learn, and grow with the MuLearn club at Vidya Academy.
            Progress through unity. Building the ecosystem together.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/onboarding"
              className="px-8 py-4 bg-gray-900 text-white text-lg font-bold rounded-xl shadow-xl hover:bg-gray-800 transition-all hover:scale-105"
            >
              Start Your Journey
            </Link>
            <button className="px-8 py-4 bg-white text-gray-700 text-lg font-bold rounded-xl shadow-md hover:bg-gray-50 border border-gray-200 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats / Impact Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Our Impact So Far
            </h2>
            <p className="text-gray-500 mt-2">
              Creating milestones every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Hackathons",
                value: "12+",
                icon: "🏆",
                color: "bg-yellow-100 text-yellow-600",
              },
              {
                title: "Workshops",
                value: "50+",
                icon: "🎓",
                color: "bg-blue-100 text-blue-600",
              },
              {
                title: "Active Students",
                value: "300+",
                icon: "🚀",
                color: "bg-purple-100 text-purple-600",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-center group"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl ${item.color} group-hover:scale-110 transition-transform`}
                >
                  {item.icon}
                </div>
                <h3 className="text-4xl font-extrabold text-gray-800 mb-2">
                  {item.value}
                </h3>
                <p className="text-gray-500 font-medium uppercase tracking-wider text-sm">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
