import { useEffect, useState } from "react";

const PingTest = () => {
  const [response, setResponse] = useState<string>("Loading...");

  useEffect(() => {
    fetch("https://agoranet.onrender.com/api/ping")
      .then((res) => res.json())
      .then((data) => setResponse(data.message))
      .catch((err) => {
        console.error("Ping failed:", err);
        setResponse("Failed to reach backend");
      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-2xl">
      Backend says: <span className="ml-3 font-bold">{response}</span>
    </div>
  );
};

export default PingTest;
