/**
 * Enhanced Header Component with Time-Based Theming
 * Main navigation header with adaptive colors
 */

import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useScrolled } from '../../hooks/useScrollEffect';
import { useTimeBasedTheme } from '../../hooks/useTimeBasedTheme';
import { handleNavClick } from '../../utils/scrollUtils';
import { NAV_ITEMS } from '../../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrolled(50);
  const theme = useTimeBasedTheme();

  /**
   * Handles mobile menu item clicks
   * Closes menu and navigates to section
   */
  const handleMobileNavClick = (href: string): void => {
    handleNavClick(href, () => setIsMenuOpen(false));
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center">
            <div 
              className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                isScrolled 
                  ? '' 
                  : 'backdrop-blur-sm'
              }`}
              style={{
                background: isScrolled 
                  ? `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`
                  : `${theme.primary}33`
              }}
            >
              <Sparkles className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-white'}`} />
            </div>
            <span className={`text-xl font-bold ${
              isScrolled ? 'text-slate-900' : 'text-white'
            }`}>
              Aurifie
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-slate-700 hover:text-blue-600' 
                    : 'text-white/90 hover:text-white'
                }`}
                style={{
                  color: isScrolled 
                    ? undefined 
                    : item.name === 'Home' ? theme.primary : undefined
                }}
                onMouseEnter={(e) => {
                  if (!isScrolled) {
                    e.currentTarget.style.color = theme.primary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isScrolled) {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                  }
                }}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => handleNavClick('#contact')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                isScrolled 
                  ? 'text-white hover:shadow-lg' 
                  : 'text-slate-900 hover:shadow-lg'
              }`}
              style={{
                background: isScrolled 
                  ? `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`
                  : 'white',
                boxShadow: isScrolled 
                  ? `0 4px 15px ${theme.primary}40`
                  : '0 4px 15px rgba(255,255,255,0.25)'
              }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-slate-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-200">
            <nav className="py-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleMobileNavClick(item.href)}
                  className="block w-full text-left px-4 py-3 text-slate-700 hover:bg-gray-50 transition-colors duration-300"
                  style={{
                    color: item.name === 'Home' ? theme.primary : undefined
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#334155';
                  }}
                >
                  {item.name}
                </button>
              ))}
              <div className="px-4 py-3">
                <button 
                  onClick={() => handleMobileNavClick('#contact')}
                  className="w-full text-white font-semibold py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300"
                  style={{
                    background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`
                  }}
                >
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;