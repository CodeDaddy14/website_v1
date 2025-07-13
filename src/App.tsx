/**
 * Main App Component
 * Root component that orchestrates all sections and global effects
 */

import React from 'react';
import { useMouseTracking } from './hooks/useScrollEffect';
import { useNotifications } from './hooks/useNotifications';

// Import all section components
import Header from './components/common/Header';
import Hero3D from './components/sections/Hero3D';
import Services from './components/sections/Services';
import About3D from './components/sections/About3D';
import Portfolio3D from './components/Portfolio3D';
import Testimonials from './components/Testimonials';
import InteractiveContact from './components/sections/InteractiveContact';
import Footer from './components/Footer';
import NotificationSystem from './components/ui/NotificationSystem';

/**
 * Main Application Component
 * Manages global state and renders all page sections
 */
function App() {
  // Initialize mouse tracking for cursor effects
  useMouseTracking();
  
  // Initialize notification system
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="min-h-screen">
      {/* Fixed Header Navigation */}
      <Header />
      
      {/* Main Content Sections */}
      <main>
        {/* Hero Section - Landing page with 3D elements */}
        <Hero3D />
        
        {/* Services Section - Moved before About section */}
        <Services />
        
        {/* About Section - Team and company values */}
        <About3D />
        
        {/* Portfolio Section - Project showcase */}
        <Portfolio3D />
        
        {/* Testimonials Section - Client feedback */}
        <Testimonials />
        
        {/* Contact Section - Contact form and information */}
        <InteractiveContact />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Global Notification System */}
      <NotificationSystem 
        notifications={notifications}
        onRemove={removeNotification}
      />
    </div>
  );
}

export default App;