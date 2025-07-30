import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-gray-100 py-16 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
      <div className="text-center max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-6 animate-fade-in">
          Welcome to TechBit
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-5 leading-relaxed font-light italic tracking-wide max-w-2xl mx-auto">
          Your ultimate source for tech trends, coding tutorials, and vibrant
          community discussions.
        </p>
        <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
          Dive into cutting-edge web development insights and join the
          conversation!
        </p>
        <Link
          href="/blog"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
        >
          Explore Blog
        </Link>
      </div>
    </div>
  );
}
