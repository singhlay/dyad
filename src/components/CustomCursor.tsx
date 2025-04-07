import  { useEffect, useState } from 'react';
import {cursor} from "../assets/images/index.ts"

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  return (
    <div 
      className="custom-cursor"
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <img src={cursor} alt="" width="30" height="30" />
    </div>
  );
};

export default CustomCursor;