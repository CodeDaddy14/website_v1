/**
 * Scroll Utilities
 * Helper functions for smooth scrolling and navigation
 */

/**
 * Smoothly scrolls to a target element by ID
 * @param targetId - The ID of the target element (without #)
 * @param offset - Optional offset from the top (default: 80px for header)
 */
export const scrollToSection = (targetId: string, offset: number = 80): void => {
  const element = document.getElementById(targetId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Handles navigation link clicks with smooth scrolling
 * @param href - The href attribute (e.g., "#contact")
 * @param callback - Optional callback function to execute after scroll
 */
export const handleNavClick = (href: string, callback?: () => void): void => {
  if (href.startsWith('#')) {
    const targetId = href.substring(1);
    scrollToSection(targetId);
    if (callback) callback();
  }
};