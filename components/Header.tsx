import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-md sticky top-0 z-50">
      <nav className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-3xl font-extrabold hover:text-blue-200 transition-colors duration-200 tracking-tight"
          >
            TechBit
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-lg font-semibold hover:text-blue-200 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-lg font-semibold hover:text-blue-200 transition-colors duration-200"
            >
              Blog
            </Link>
          </div>
          <div className="md:hidden">
            <Link
              href="/blog"
              className="text-sm font-semibold hover:text-blue-200 transition-colors duration-200"
            >
              Blog
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
