import React from "react";
import { ChevronRight } from "lucide-react";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
}

export default function NextButton({
  onClick,
  text,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex m-2 py-2 px-4 rounded-md text-zinc-700 
                  ${
                    disabled
                      ? "bg-gray-200 opacity-50 cursor-not-allowed"
                      : "bg-white hover:bg-zinc-300"
                  }
                  transition-colors duration-300`}
    >
      {text}
      <ChevronRight />
    </button>
  );
}
