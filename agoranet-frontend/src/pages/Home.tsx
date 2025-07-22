import React from "react";
import Button from "../components/ui/button";

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to AgoraNet</h1>
      <Button onClick={() => alert("Button clicked!")}>Click Me</Button>
    </div>
  );
};


export default Home;
