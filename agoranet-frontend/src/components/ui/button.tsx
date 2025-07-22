import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
