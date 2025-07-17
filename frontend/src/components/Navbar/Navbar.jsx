import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${backendUrl}/user/user`, {
          credentials: "include",
        });
        const data = await response.json();
        setUser(response.ok ? data : null);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b 
        ${isScrolled
          ? "bg-white/70 text-black backdrop-blur-md border-slate-300 shadow-md"
          : "bg-white text-black border-transparent"}
      `}
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex gap-2 items-center ">
            <Link to="/" className="text-2xl font-medium mx-1.5 hover:text-blue-900 tracking-tight hover:opacity-80 transition">
            EcoMitra
          </Link>

          {/* Links */}
        
            <Link to="/investments" className="hover:text-blue-900 transition">
              Investments
            </Link>
            <Link to="/#about" className="hover:text-blue-900 transition">
              About Us
            </Link>
          </div>
          
      

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/user">
                <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition">
                  Dashboard
                </button>
              </Link>
            ) : (
              <>
            <Link to="/login">
  <button
    className={`${
      isScrolled
        ? "border-black text-black hover:bg-black hover:text-white"
        : "border-white text-white hover:bg-white hover:text-black"
    } border px-4 py-2 rounded-full transition`}
  >
    Log In
  </button>
</Link>

<Link to="/signup">
  <button
    className={`${
      isScrolled ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black "
    }  px-4 py-2 rounded-full transition`}
  >
    Create Account
  </button>
</Link>

              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
