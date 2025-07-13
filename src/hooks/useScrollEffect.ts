/**
 * Custom Hook for Scroll Effects
 * Manages scroll-based state changes and animations
 */

import { useState, useEffect } from 'react';

/**
 * Hook to track if the page has been scrolled past a threshold
 * @param threshold - Scroll position threshold (default: 50px)
 * @returns boolean indicating if scrolled past threshold
 */
export const useScrolled = (threshold: number = 50): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isScrolled;
};

/**
 * Hook for mouse tracking (used for cursor effects)
 * @returns void (sets CSS custom properties)
 */
export const useMouseTracking = (): void => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
};