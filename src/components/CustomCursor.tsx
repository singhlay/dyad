import { useEffect, useState } from 'react';
import {cursor} from "../assets/images/index.ts"

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if cursor is over reCAPTCHA
      const isOverRecaptcha = target.closest('.g-recaptcha') || 
                             target.closest('iframe[title="reCAPTCHA"]');

      // Check if cursor is within viewport
      const isInViewport = 
        e.clientX >= 0 &&
        e.clientX <= window.innerWidth &&
        e.clientY >= 0 &&
        e.clientY <= window.innerHeight;

      if (isOverRecaptcha) {
        setIsVisible(false);
      } else if (isInViewport) {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      className="custom-cursor"
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: isVisible ? 1 : 0,
        pointerEvents: 'none',
      }}
    >
      <img src={cursor} alt="" width="30" height="30" />
    </div>
  );
};

export default CustomCursor;