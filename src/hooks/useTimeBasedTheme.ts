/**
 * Time-Based Theme Hook
 * Automatically changes website colors based on time of day
 */

import { useState, useEffect } from 'react';

export interface TimeTheme {
  name: 'morning' | 'afternoon' | 'evening' | 'night';
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  gradient: string;
  heroGradient: string;
}

const themes: Record<string, TimeTheme> = {
  morning: {
    name: 'morning',
    primary: '#F59E0B', // Warm amber
    secondary: '#FCD34D',
    accent: '#FBBF24',
    background: 'from-amber-50 to-orange-50',
    text: 'text-amber-900',
    gradient: 'from-amber-500 to-orange-500',
    heroGradient: 'from-amber-900 via-orange-900 to-yellow-800'
  },
  afternoon: {
    name: 'afternoon',
    primary: '#3B82F6', // Bright blue
    secondary: '#60A5FA',
    accent: '#93C5FD',
    background: 'from-blue-50 to-sky-50',
    text: 'text-blue-900',
    gradient: 'from-blue-500 to-sky-500',
    heroGradient: 'from-blue-900 via-sky-900 to-cyan-800'
  },
  evening: {
    name: 'evening',
    primary: '#8B5CF6', // Purple
    secondary: '#A78BFA',
    accent: '#C4B5FD',
    background: 'from-purple-50 to-violet-50',
    text: 'text-purple-900',
    gradient: 'from-purple-500 to-violet-500',
    heroGradient: 'from-purple-900 via-violet-900 to-indigo-800'
  },
  night: {
    name: 'night',
    primary: '#1F2937', // Dark gray
    secondary: '#374151',
    accent: '#4B5563',
    background: 'from-gray-900 to-slate-900',
    text: 'text-gray-100',
    gradient: 'from-gray-700 to-slate-700',
    heroGradient: 'from-slate-900 via-gray-900 to-black'
  }
};

/**
 * Determines theme based on current time
 */
const getTimeBasedTheme = (): TimeTheme => {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 12) {
    return themes.morning;
  } else if (hour >= 12 && hour < 17) {
    return themes.afternoon;
  } else if (hour >= 17 && hour < 21) {
    return themes.evening;
  } else {
    return themes.night;
  }
};

/**
 * Hook for time-based theme management
 */
export const useTimeBasedTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<TimeTheme>(getTimeBasedTheme());

  useEffect(() => {
    // Update theme immediately
    setCurrentTheme(getTimeBasedTheme());

    // Set up interval to check every minute
    const interval = setInterval(() => {
      const newTheme = getTimeBasedTheme();
      setCurrentTheme(newTheme);
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return currentTheme;
};