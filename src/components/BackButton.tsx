import React from 'react';
import { ChevronLeft } from 'lucide-react'


interface ButtonProps {
  onClick?: () => void; 
  text: string;
}

export default function BackButton({
  onClick,
  text
}: ButtonProps) {
  return (
    <button
      onClick={onClick} 
      className={`flex m-2 py-2 px-4 rounded-md text-zinc-700 
                  bg-white hover:bg-zinc-300
                  transition-colors duration-300`}
    >
      <ChevronLeft />
      {text}
    </button>
  );
}