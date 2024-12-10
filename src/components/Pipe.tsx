import React from 'react';

interface PipeProps {
  height: number;
  isTop: boolean;
  position: number;
}

export const Pipe: React.FC<PipeProps> = ({ height, isTop, position }) => {
  return (
    <div
      className="absolute w-16 bg-pipe"
      style={{
        height: `${height}px`,
        left: `${position}px`,
        top: isTop ? 0 : undefined,
        bottom: isTop ? undefined : 0,
      }}
    >
      <div className={`absolute left-0 right-0 h-8 bg-pipe ${isTop ? 'bottom-0' : 'top-0'}`} 
           style={{ width: '120%', left: '-10%' }} />
    </div>
  );
};