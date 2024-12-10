import React from 'react';
import { cn } from "@/lib/utils";

interface BirdProps {
  position: number;
  rotation: number;
}

export const Bird: React.FC<BirdProps> = ({ position, rotation }) => {
  return (
    <div
      className="absolute left-1/4 w-8 h-8 bg-bird rounded-full"
      style={{
        top: `${position}px`,
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.1s ease-in-out',
      }}
    >
      {/* Bird's eye */}
      <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full" />
      {/* Bird's wing */}
      <div className="absolute bottom-0 left-0 w-4 h-2 bg-[#FFA500] rounded-full" />
    </div>
  );
};