import { Link } from 'react-router-dom';

const LandingPage = () => {
  console.log('Showing from landing page.');
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-red-500 flex flex-col justify-between text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-opacity-30 backdrop-blur-md">
        <h1 className="text-3xl font-bold tracking-wide">Instamedia</h1>
        <nav className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md font-semibold transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-red-600 hover:bg-red-100 px-4 py-2 rounded-md font-semibold transition duration-300"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col justify-center items-center text-center px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Connect. Share. Inspire.
        </h2>
        <p className="text-lg md:text-xl max-w-xl mb-8">
          Welcome to <span className="font-semibold">Instamedia</span> — your go-to platform to
          express yourself, connect with friends, and discover what matters to you.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-white text-red-600 hover:bg-red-100 px-6 py-3 rounded-md font-semibold transition duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-white text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-md font-semibold transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 bg-opacity-30 backdrop-blur-md text-sm">
        &copy; {new Date().getFullYear()} Instamedia. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
