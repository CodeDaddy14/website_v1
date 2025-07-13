import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Mail, Phone, MapPin, Send, MessageCircle, Calendar } from 'lucide-react';
import * as THREE from 'three';

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

const InteractiveContact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    mobile: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const response = await fetch('https://deno.land/std@0.168.0/http/server.ts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    const result = await response.json();
    alert(result.message || "Submitted successfully!");
  } catch (err) {
    console.error(err);
    alert("Submission failed. Please try again.");
  } finally {
    setIsSubmitting(false);
    setFormData({
      name: '',
      email: '',
      mobile: '',
      company: '',
      service: '',
      budget: '',
      message: ''
    });
  }
};


  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@digitalcraft.com",
      link: "mailto:hello@digitalcraft.com",
      color: "#3B82F6"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      color: "#10B981"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Innovation Street, Tech City, TC 12345",
      link: "#",
      color: "#8B5CF6"
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
    "Consulting",
    "Other"
  ];

  const budgetRanges = [
    "Under $5K",
    "$5K - $15K",
    "$15K - $30K",
    "$30K - $50K",
    "$50K+",
    "Let's Discuss"
  ];

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white relative overflow-hidden" ref={containerRef}>
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} />
          
          <ContactSphere position={[-3, 2, 0]} color="#3B82F6" />
          <ContactSphere position={[3, -1, 0]} color="#10B981" />
          <ContactSphere position={[0, 1, -2]} color="#8B5CF6" />
          <ContactSphere position={[-2, -2, 1]} color="#F59E0B" />
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
            transition={{ type: "spring", stiffness: 300 }}>
            Let's Build Something Amazing
          </motion.h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Ready to transform your ideas into reality? Get in touch with our team 
            and let's discuss how we can help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className="bg-slate-800 rounded-3xl p-8 md:p-10 border border-slate-700 relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: Math.random() * 3
                  }}
                />
              ))}
            </div>

            <div className="mb-8 relative z-10">
              <motion.h3 
                className="text-2xl font-bold mb-2"
                whileHover={{ color: "#60A5FA" }}
                transition={{ duration: 0.3 }}
              >
                Start Your Project
              </motion.h3>
              <p className="text-slate-300">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
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
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="John Doe"
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
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
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="john@company.com"
                  />
                </motion.div>
              </div>



              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
              
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                >
                <label htmlFor="company" className="block text-sm font-medium text-slate-200 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your Company"
                />
              </motion.div>

              <motion.div
              
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                >
                <label htmlFor="Mobile" className="block text-sm font-medium text-slate-200 mb-2">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="Mobile"
                  name="Mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="+1 (555) 123-4567"
                />
              </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="service" className="block text-sm font-medium text-slate-200 mb-2">
                    Service Needed *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="budget" className="block text-sm font-medium text-slate-200 mb-2">
                    Project Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((range, index) => (
                      <option key={index} value={range}>{range}</option>
                    ))}
                  </select>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
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
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-4 px-8 rounded-lg relative overflow-hidden disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
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
          </motion.div>

          {/* Contact Info & CTA */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div 
              className="bg-slate-800 rounded-3xl p-8 border border-slate-700 relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-5">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-emerald-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 360, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: Math.random() * 4
                    }}
                  />
                ))}
              </div>

              <motion.h3 
                className="text-2xl font-bold mb-6 relative z-10"
                whileHover={{ color: "#10B981" }}
                transition={{ duration: 0.3 }}
              >
                Get In Touch
              </motion.h3>
              <div className="space-y-6 relative z-10">
                {contactInfo.map((info, index) => (
                  <motion.a 
                    key={index}
                    href={info.link}
                    className="flex items-center p-4 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors duration-300 group"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: info.color
                      }}
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
                className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MessageCircle className="w-8 h-8 text-white mx-auto mb-3" />
                </motion.div>
                <h4 className="text-lg font-bold text-white mb-2">Quick Chat</h4>
                <p className="text-emerald-100 text-sm mb-4">Have a quick question? Let's chat!</p>
                <motion.button 
                  className="bg-white text-emerald-600 font-semibold py-2 px-6 rounded-full"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Start Chat
                </motion.button>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Calendar className="w-8 h-8 text-white mx-auto mb-3" />
                </motion.div>
                <h4 className="text-lg font-bold text-white mb-2">Schedule Call</h4>
                <p className="text-purple-100 text-sm mb-4">Book a free 30-minute consultation</p>
                <motion.button 
                  className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-full"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Book Call
                </motion.button>
              </motion.div>
            </div>

            {/* Response Time */}
            <motion.div 
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Pulsing Background */}
              <motion.div
                className="absolute inset-0 bg-blue-500/10 rounded-2xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <motion.div 
                className="text-3xl font-bold text-blue-400 mb-2 relative z-10"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(59, 130, 246, 0)",
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                    "0 0 0px rgba(59, 130, 246, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                &lt; 24hrs
              </motion.div>
              <div className="text-slate-300 relative z-10">Average Response Time</div>
              <div className="text-sm text-slate-400 mt-2 relative z-10">We typically respond within a few hours</div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl p-8 md:p-12 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated Background Elements */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-white/10 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 3
                }}
              />
            ))}

            <motion.h3 
              className="text-3xl md:text-4xl font-bold mb-4 relative z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Ready to Get Started?
            </motion.h3>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto relative z-10">
              Join the growing list of satisfied clients who've transformed their business with our digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <motion.button 
                className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255,255,255,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                View Our Portfolio
              </motion.button>
              <motion.button 
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Download Company Brochure
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default InteractiveContact;