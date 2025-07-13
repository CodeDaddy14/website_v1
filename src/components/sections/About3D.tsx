/**
 * About3D Component
 * Team section with 3D elements and animations
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { Users, Award, Target, Zap } from 'lucide-react';
import { TEAM_MEMBERS } from '../../constants';
import * as THREE from 'three';

/**
 * 3D Team Member Component
 */
const TeamMember3D: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.5, 0.8, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Float>
  );
};

/**
 * Main About3D Component
 */
const About3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "Every pixel, every line of code, every decision is made with purpose and attention to detail."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We stay ahead of trends, embracing new technologies to deliver cutting-edge solutions."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Our diverse skills complement each other, creating synergy that amplifies our impact."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We don't just meet expectations – we exceed them with every project we touch."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden" ref={containerRef}>
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} />
          
          <TeamMember3D position={[-3, 1, 0]} color="#EC4899" />
          <TeamMember3D position={[-1, -1, 0]} color="#3B82F6" />
          <TeamMember3D position={[1, 1, 0]} color="#10B981" />
          <TeamMember3D position={[3, -1, 0]} color="#8B5CF6" />
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ y, opacity }}
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
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Meet Our Creative Minds
          </motion.h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Four passionate professionals united by a shared vision: creating digital experiences 
            that inspire, engage, and deliver exceptional results.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div 
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden"
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                scale: 1.02
              }}
              viewport={{ once: true }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated Background */}
              <motion.div 
                className={`h-32 bg-gradient-to-br ${member.color} rounded-t-2xl relative overflow-hidden`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-black/10"
                  animate={{ 
                    background: [
                      "rgba(0,0,0,0.1)",
                      "rgba(0,0,0,0.05)",
                      "rgba(0,0,0,0.1)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <motion.div 
                  className="absolute bottom-4 left-4"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <motion.div 
                      className="w-8 h-8 bg-white rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>

                {/* Floating Particles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                ))}
              </motion.div>
              
              <div className="p-6">
                <motion.h3 
                  className="text-xl font-bold text-slate-900 mb-2"
                  whileHover={{ color: member.meshColor }}
                  transition={{ duration: 0.3 }}
                >
                  {member.name}
                </motion.h3>
                <p className="text-sm font-medium text-slate-500 mb-3">{member.role}</p>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">{member.bio}</p>
                
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, skillIndex) => (
                    <motion.span 
                      key={skillIndex}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full cursor-pointer"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: member.meshColor,
                        color: "white"
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <motion.div 
          className="bg-slate-50 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-600 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: Math.random() * 4
                }}
              />
            ))}
          </div>

          <div className="text-center mb-12 relative z-10">
            <motion.h3 
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Our Values
            </motion.h3>
            <p className="text-lg text-slate-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {values.map((value, index) => (
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
                  className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500 to-emerald-500 opacity-0"
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <value.icon className="w-8 h-8 text-blue-600 relative z-10" />
                </motion.div>
                <motion.h4 
                  className="text-xl font-bold text-slate-900 mb-3"
                  whileHover={{ color: "#3B82F6" }}
                  transition={{ duration: 0.3 }}
                >
                  {value.title}
                </motion.h4>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About3D;