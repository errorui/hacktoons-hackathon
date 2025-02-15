import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css"; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <span className="logo-icon">🌱</span>
        </div>
        <h2>Welcome</h2>
        <form>
          <div className="input-group">
            <input type="email" placeholder="Email address*" required />
          </div>
          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <a href="#" className="forgot-password">
            Forgot password?
          </a>
          <button type="submit" className="login-button">
            Continue
          </button>
        </form>
        <p className="signup-text">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
