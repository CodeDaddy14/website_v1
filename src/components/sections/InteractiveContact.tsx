/**
 * Enhanced Interactive Contact Component
 * Contact form with improved email integration and meeting scheduler
 */

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Mail, Phone, MapPin, Send, MessageCircle, Calendar, CheckCircle } from 'lucide-react';
import { useTimeBasedTheme } from '../../hooks/useTimeBasedTheme';
import { useNotifications } from '../../hooks/useNotifications';
import { sendContactForm, ContactFormData } from '../../services/emailService';
import MeetingScheduler from '../ui/MeetingScheduler';
import * as THREE from 'three';

/**
 * 3D Contact Sphere Component
 */
const ContactSphere: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[0.5, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.2}
          speed={1}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
};

/**
 * Main Interactive Contact Component
 */
const InteractiveContact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTimeBasedTheme();
  const { showSuccess, showError } = useNotifications();
  const [isMeetingSchedulerOpen, setIsMeetingSchedulerOpen] = useState(false);
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await sendContactForm(formData);
      if (success) {
        setIsSuccess(true);
        showSuccess(
          'Message Sent Successfully!',
          'Thank you for reaching out. We\'ll get back to you within 24 hours.'
        );
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            name: '',
            email: '',
            company: '',
            service: '',
            budget: '',
            message: ''
          });
        }, 3000);
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      showError(
        'Failed to Send Message',
        'Please try again or contact us directly via email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "adityakumar2482@gmail.com",
      link: "mailto:adityakumar2482@gmail.com",
      color: theme.primary
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+918340496841",
      link: "tel:+918340496841",
      color: theme.primary
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Innovation Street, Tech City, TC 12345",
      link: "#",
      color: theme.primary
    }
  ];

  const services = [
    "Brand Identity Design",
    "UI/UX Design", 
    "Web Development",
    "Mobile App Development",
    "CRM Development",
    "AI/ML Solutions",
    "Data Engineering",
    "Brand Management",
    "E-commerce Branding",
    "Consulting",
    "Other"
  ];

  const budgetRanges = [
    "Under ₹5K",
    "₹5K - ₹15K",
    "₹15K - ₹30K",
    "₹30K - ₹50K",
    "₹50K+",
    "Let's Discuss"
  ];

  return (
    <section 
      id="contact" 
      className={`py-20 bg-gradient-to-br ${theme.heroGradient} text-white relative overflow-hidden`} 
      ref={containerRef}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} />
          
          <ContactSphere position={[-3, 2, 0]} color={theme.primary} />
          <ContactSphere position={[3, -1, 0]} color={theme.secondary} />
          <ContactSphere position={[0, 1, -2]} color={theme.accent} />
          <ContactSphere position={[-2, -2, 1]} color={theme.primary} />
        </Canvas>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ y }}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Let's Build Something Amazing
          </motion.h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Ready to transform your ideas into reality? Get in touch with our team 
            and let's discuss how we can help you achieve your goals.
          </p>
          <div className="mt-4 text-sm opacity-75">
            Current theme: {theme.name} • Colors adapt to time of day
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className="bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-slate-700 relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 relative z-10">
              <motion.h3 
                className="text-2xl font-bold mb-2"
                style={{ color: theme.secondary }}
                whileHover={{ color: theme.primary }}
                transition={{ duration: 0.3 }}
              >
                {isSuccess ? 'Message Sent!' : ''}
              </motion.h3>
              <p className="text-slate-300">
                {isSuccess 
                  ? 'Thank you! We\'ll get back to you within 24 hours.' 
                  : 'Fill out the form below and we\'ll get back to you within 24 hours.'
                }
              </p>
            </div>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/80 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300"
                      style={{ '--tw-ring-color': theme.primary } as React.CSSProperties}
                      placeholder="John Doe"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/80 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300"
                      placeholder="john@company.com"
                    />
                  </motion.div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-200 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/80 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300"
                    placeholder="Your Company"
                  />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label htmlFor="service" className="block text-sm font-medium text-slate-200 mb-2">
                      Service Needed *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/80 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label htmlFor="budget" className="block text-sm font-medium text-slate-200 mb-2">
                      Project Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/80 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range, index) => (
                        <option key={index} value={range}>{range}</option>
                      ))}
                    </select>
                  </motion.div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-200 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/80 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300"
                    placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white font-semibold py-4 px-8 rounded-lg relative overflow-hidden disabled:opacity-50"
                  style={{ background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            ) : (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                <p className="text-slate-300">
                  Thank you for reaching out! We'll get back to you within 24 hours.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Info & CTA */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div 
              className="bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-700 relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-2xl font-bold mb-6 relative z-10"
                style={{ color: theme.secondary }}
                whileHover={{ color: theme.primary }}
                transition={{ duration: 0.3 }}
              >
                Get In Touch
              </motion.h3>
              <div className="space-y-6 relative z-10">
                {contactInfo.map((info, index) => (
                  <motion.a 
                    key={index}
                    href={info.link}
                    className="flex items-center p-4 bg-slate-700/50 rounded-xl hover:bg-slate-600/50 transition-colors duration-300 group"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 relative overflow-hidden"
                      style={{ backgroundColor: theme.primary }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <info.icon className="w-6 h-6 text-white relative z-10" />
                    </motion.div>
                    <div>
                      <div className="font-semibold text-white">{info.title}</div>
                      <div className="text-slate-300">{info.content}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <motion.div 
                className="rounded-2xl p-6 text-center relative overflow-hidden cursor-pointer"
                style={{ background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                onClick={() => window.open('mailto:adityakumar2482@gmail.com?subject=Quick Chat Request')}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MessageCircle className="w-8 h-8 text-white mx-auto mb-3" />
                </motion.div>
                <h4 className="text-lg font-bold text-white mb-2">Quick Chat</h4>
                <p className="text-white/80 text-sm mb-4">Have a quick question? Let's chat!</p>
                <motion.div 
                  className="bg-white/20 backdrop-blur-sm text-white font-semibold py-2 px-6 rounded-full border border-white/30 inline-block"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Start Chat
                </motion.div>
              </motion.div>

              <motion.div 
                className="rounded-2xl p-6 text-center relative overflow-hidden cursor-pointer"
                style={{ background: `linear-gradient(to right, ${theme.secondary}, ${theme.accent})` }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                onClick={() => setIsMeetingSchedulerOpen(true)}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Calendar className="w-8 h-8 text-white mx-auto mb-3" />
                </motion.div>
                <h4 className="text-lg font-bold text-white mb-2">Schedule Call</h4>
                <p className="text-white/80 text-sm mb-4">Book a free 30-minute consultation</p>
                <motion.div 
                  className="bg-white/20 backdrop-blur-sm text-white font-semibold py-2 px-6 rounded-full border border-white/30 inline-block"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Book Call
                </motion.div>
              </motion.div>
            </div>

            {/* Response Time */}
            <motion.div 
              className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="text-3xl font-bold mb-2 relative z-10"
                style={{ color: theme.primary }}
                animate={{ 
                  textShadow: [
                    `0 0 0px ${theme.primary}00`,
                    `0 0 20px ${theme.primary}80`,
                    `0 0 0px ${theme.primary}00`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {'< 24hrs'}
              </motion.div>
              <div className="text-slate-300 relative z-10">Average Response Time</div>
              <div className="text-sm text-slate-400 mt-2 relative z-10">We typically respond within a few hours</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Meeting Scheduler Modal */}
      <MeetingScheduler 
        isOpen={isMeetingSchedulerOpen}
        onClose={() => setIsMeetingSchedulerOpen(false)}
      />
    </section>
  );
};

export default InteractiveContact;