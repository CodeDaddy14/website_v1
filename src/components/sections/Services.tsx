/**
 * Services Component
 * Enhanced services section with flip cards and scrollable content
 */

import React from 'react';
import { Palette, Code, Brain, Award, ArrowRight, CheckCircle, Smartphone, Database, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { handleNavClick } from '../../utils/scrollUtils';
import { SERVICE_CATEGORIES } from '../../constants';

/**
 * Icon mapping for dynamic icon rendering
 */
const iconMap = {
  Palette,
  Code,
  Brain,
  Award
};

/**
 * Service Card Component with flip animation and scrollable content
 */
const ServiceCard: React.FC<{ category: any; index: number }> = ({ category, index }) => {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap];

  return (
    <motion.div 
      className="group h-[600px] perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
        {/* Front of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Category Header */}
          <div className={`bg-gradient-to-r ${category.gradient} p-8 text-white relative overflow-hidden h-48`}>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-center">
              <IconComponent className="w-16 h-16 mb-4" />
              <h3 className="text-3xl font-bold">{category.category}</h3>
              <p className="text-white/80 mt-2">Hover to explore services</p>
            </div>
          </div>

          {/* Front Content */}
          <div className="p-8 h-[calc(100%-12rem)] flex flex-col justify-center">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-slate-900 mb-4">
                {category.services.length} Specialized Services
              </h4>
              <p className="text-slate-600 mb-6">
                Professional {category.category.toLowerCase()} solutions tailored to your needs
              </p>
              <div className="inline-flex items-center text-blue-600 font-medium">
                <span>View Details</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card - Scrollable Content */}
        <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 ${category.bgPattern} rounded-3xl shadow-lg overflow-hidden`}>
          <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center mb-4 flex-shrink-0">
              <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-xl flex items-center justify-center mr-4`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{category.category}</h3>
            </div>

            {/* Scrollable Services Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
              <div className="space-y-4">
                {category.services.map((service: any, serviceIndex: number) => (
                  <motion.div 
                    key={serviceIndex} 
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: serviceIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">{service.title}</h4>
                    <p className="text-slate-600 text-sm mb-3 leading-relaxed">{service.description}</p>
                    
                    {/* Features Grid */}
                    <div className="grid grid-cols-1 gap-1">
                      {service.features.map((feature: string, featureIndex: number) => (
                        <span 
                          key={featureIndex}
                          className="inline-flex items-center px-2 py-1 bg-white/80 text-slate-700 text-xs rounded-full mb-1"
                        >
                          <CheckCircle className="w-3 h-3 mr-1 text-green-500 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="mt-4 text-center flex-shrink-0">
              <motion.button 
                onClick={() => handleNavClick('#contact')}
                className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${category.gradient} text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Main Services Component
 */
const Services: React.FC = () => {
  const additionalServices = [
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Responsive designs that work beautifully across all devices and screen sizes.",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Database,
      title: "Database Architecture",
      description: "Scalable database design and optimization for high-performance applications.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed and performance optimization for web applications and user experiences.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From concept to completion, we offer comprehensive digital solutions 
            that drive growth and create lasting impact.
          </p>
        </motion.div>

        {/* Main Services Grid with Flip Cards */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {SERVICE_CATEGORIES.map((category, index) => (
            <ServiceCard key={index} category={category} index={index} />
          ))}
        </div>

        {/* Additional Services */}
        <motion.div 
          className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Additional Capabilities</h3>
            <p className="text-lg text-slate-600">Extra services that complement our core offerings</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div 
                key={index} 
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className={`w-20 h-20 ${service.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <service.icon className={`w-10 h-10 ${service.color} transition-colors duration-300`} />
                </motion.div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ready to Transform Your Business Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full -translate-x-12 -translate-y-12"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
              <p className="text-lg md:text-xl mb-6 text-blue-100 max-w-2xl mx-auto">
                Let's discuss your project and create something amazing together. Get started with a free consultation!
              </p>
              <motion.button 
                onClick={() => handleNavClick('#contact')}
                className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 font-semibold rounded-full hover:shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1 transition-all duration-300 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .group:hover .group-hover\\:rotate-y-180 {
          transform: rotateY(180deg);
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 6px;
        }
        .scrollbar-track-gray-100::-webkit-scrollbar-track {
          background-color: #f3f4f6;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
      `}</style>
    </section>
  );
};

export default Services;