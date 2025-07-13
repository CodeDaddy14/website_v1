import React from 'react';
import { Sparkles, Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    { name: 'Brand Design', href: '#services' },
    { name: 'Web Development', href: '#services' },
    { name: 'UI/UX Design', href: '#services' },
    { name: 'AI Solutions', href: '#services' }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                {/* Example: Sparkles icon from lucide-react */}
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Aurifie</span>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed mb-6 max-w-md">
              A next-gen digital agency crafting brands, building seamless user experiences, and engineering smart, AI-powered solutions — all under one roof.


            </p>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-400" />
                <a href="mailto:hello@digitalcraft.com" className="hover:text-white transition-colors">
                  support@aurifie.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-blue-400" />
                <a href="tel:+15551234567" className="hover:text-white transition-colors">
                  +91 8340496841
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                <span>We believe in open location policy</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-slate-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.href} 
                    className="text-slate-300 hover:text-white transition-colors duration-300"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Links */}
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <span className="text-slate-300 mr-4">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="flex items-center space-x-4">
              <span className="text-slate-300">Stay updated:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-r-lg hover:shadow-lg transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
          <div className="mb-4 md:mb-0">
            © 2025 Aurifie.com All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;