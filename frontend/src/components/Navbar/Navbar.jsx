import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await fetch(`${backendUrl}/user/user`, {
          credentials: "include", 
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setUser(data); 
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="nav">
      <ul className="menu-1">
        <li className="nav-logo cursor-pointer">
          <Link to="/">EcoMitra</Link>
        </li>
        <li>
          <Link to="/investments">
            <button>Investments</button>
          </Link>
        </li>
        <li>
          <Link to="/#about">
            <button>About Us</button>
          </Link>
        </li>
         <li className='game'><button><IoGameController /></button></li>
      </ul>
      <ul className="nav-menu">
        {user ? (
        
          <li>
            <Link to="/user">
              <button className="nav-contact">Dashboard</button>
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <button className="nav-signup">Log In</button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button className="nav-login">Create Account</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
