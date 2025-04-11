import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [content, setContent] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/";
        return;
      }

      try {
        // Using relative URL which will be proxied through Vite
        const response = await axios.get("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.role === "admin") {
          setIsAdmin(true);
          setContent(response.data.content);
        } else {
          setErrorMessage("You do not have admin access.");
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
        setErrorMessage("Access denied or token expired.");
        setTimeout(() => (window.location.href = "/"), 1500);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {!isAdmin ? <p>{errorMessage}</p> : <p>{content}</p>}
    </div>
  );
}

export default Admin;