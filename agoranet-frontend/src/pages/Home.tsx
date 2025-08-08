import React from "react";
import API from "../lib/api";

const PingTest = () => {
  const testAuth = async () => {
    try {
      const token = localStorage.getItem("token"); // get saved token
      if (!token) {
        alert("❌ No token found. Please log in first.");
        return;
      }

      const res = await API.get("/api/users/me", { headers: { Authorization: `Bearer ${token}` } });


      console.log("Authenticated user:", res.data);
      alert("✅ Logged in as: " + res.data.name);
    } catch (error: any) {
      console.error("❌ Auth failed", error);
      alert(
        "❌ Token might be missing, invalid, or the route URL is wrong. Check console for details."
      );
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={testAuth}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Test Authenticated Route
      </button>
    </div>
  );
};

export default PingTest;