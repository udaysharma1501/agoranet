// src/components/Navbar.tsx
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <h1 className="text-2xl font-semibold">AgoraNet</h1>
      <nav className="hidden md:flex gap-4">
        <Button variant="ghost">Home</Button>
        <Button variant="ghost">Posts</Button>
        <Button variant="ghost">About</Button>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col gap-4 mt-4">
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">Posts</Button>
            <Button variant="ghost">About</Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
