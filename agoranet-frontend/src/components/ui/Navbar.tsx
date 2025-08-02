// src/components/Navbar.tsx
// import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <h1 className="text-2xl font-semibold">AgoraNet</h1>
      <nav className="hidden md:flex gap-4">
        {/* <Button variant="ghost">Home</Button>
        <Button variant="ghost">Posts</Button>
        <Button variant="ghost">About</Button> */}
      </nav>
      
    </header>
  );
}
