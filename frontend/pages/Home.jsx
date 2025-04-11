import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleRegister = async () => {
    try {
      // Using relative URL which will be proxied through Vite
      const response = await axios.post("/api/auth/register", {
        username,
        password,
        role,
      });

      console.log("Registration response:", response.data);
      alert("Registration successful!");
      setUsername("");
      setPassword("");
      setRole("user");
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(error.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      // Using relative URL which will be proxied through Vite
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      window.location.href = "/admin";
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {!isLogin && (
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      )}

      <button onClick={isLogin ? handleLogin : handleRegister}>
        {isLogin ? "Login" : "Register"}
      </button>

      <p>{errorMessage}</p>

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default Home;