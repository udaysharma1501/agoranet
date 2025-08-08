import React from "react";
import API from "D:\\Code\\agoranet\\agoranet-frontend\\src\\lib\\api";

const PingTest = () => {
  const testAuth = async () => {
    try {
      const res = await API.get("/users/me");
      console.log("Authenticated user:", res.data);
      alert("✅ Logged in as: " + res.data.name); // or email, etc.
    } catch (error) {
      console.error("❌ Auth failed", error);
      alert("❌ Token might be missing or invalid.");
    }
  };

  return (
    <div className="p-4">
      <button onClick={testAuth} className="px-4 py-2 bg-green-600 text-white rounded">
        Test Authenticated Route
      </button>
    </div>
  );
};

export default PingTest;
