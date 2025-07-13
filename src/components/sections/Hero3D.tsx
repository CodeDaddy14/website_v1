/**
 * Enhanced Hero3D Component with Time-Based Theming
 * Main hero section with 3D elements and adaptive colors
 */

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Environment, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code, Palette, Brain } from 'lucide-react';
import { handleNavClick } from '../../utils/scrollUtils';
import { useTimeBasedTheme } from '../../hooks/useTimeBasedTheme';
import FloatingLogos from '../ui/FloatingLogos';
import * as THREE from 'three';

/**
 * Floating Geometry Component for 3D background
 */
const FloatingGeometry: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </Float>
  );
};

/**
 * Animated Sphere Component
 */
const AnimatedSphere: React.FC<{ color: string }> = ({ color }) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
};

/**
 * Particle Field Component
 */
const ParticleField: React.FC<{ color: string }> = ({ color }) => {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color={color} transparent opacity={0.6} />
    </points>
  );
};

/**
 * Main Hero3D Component
 */
const Hero3D: React.FC = () => {
  const theme = useTimeBasedTheme();

  return (
    <section 
      id="home" 
      className={`relative min-h-screen bg-gradient-to-br ${theme.heroGradient} overflow-hidden`}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Environment preset={theme.name === 'night' ? 'night' : 'sunset'} />
          
          <ParticleField color={theme.secondary} />
          <AnimatedSphere color={theme.primary} />
          
          <FloatingGeometry position={[-3, 2, -2]} color={theme.primary} />
          <FloatingGeometry position={[3, -1, -1]} color={theme.secondary} />
          <FloatingGeometry position={[-2, -2, 1]} color={theme.accent} />
          <FloatingGeometry position={[2, 2, 0]} color={theme.primary} />
          
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Floating E-commerce Logos */}
      <FloatingLogos />

      {/* Floating Interactive Elements */}
      <motion.div 
        className="absolute top-20 left-10"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm border border-opacity-30 hover:scale-110 transition-transform cursor-pointer"
          style={{ 
            backgroundColor: `${theme.primary}33`,
            borderColor: theme.primary
          }}
        >
          <Code className="w-8 h-8" style={{ color: theme.primary }} />
        </div>
      </motion.div>

      <motion.div 
        className="absolute top-40 right-20"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm border border-opacity-30 hover:scale-110 transition-transform cursor-pointer"
          style={{ 
            backgroundColor: `${theme.secondary}33`,
            borderColor: theme.secondary
          }}
        >
          <Palette className="w-6 h-6" style={{ color: theme.secondary }} />
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-40 left-20"
        animate={{ 
          y: [0, -10, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm border border-opacity-30 hover:scale-110 transition-transform cursor-pointer"
          style={{ 
            backgroundColor: `${theme.accent}33`,
            borderColor: theme.accent
          }}
        >
          <Brain className="w-7 h-7" style={{ color: theme.accent }} />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Time-based Theme Indicator */}
          <motion.div 
            className="inline-flex items-center px-6 py-2 rounded-full backdrop-blur-sm mb-8 border"
            style={{ 
              backgroundColor: `${theme.primary}20`,
              borderColor: `${theme.primary}40`
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 mr-2" style={{ color: theme.primary }} />
            <span className="text-sm font-medium" style={{ color: theme.primary }}>
              Aurifie • {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)} Theme
            </span>
          </motion.div>

          {/* Main Heading with Dynamic Colors */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              <motion.span
                className="block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                We Create
              </motion.span>
              <motion.span 
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary}, ${theme.accent})`
                }}
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                whileHover={{ scale: 1.1 }}
              >
                Aurifie
              </motion.span>
            </h1>
          </motion.div>

          {/* Animated Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A next-gen digital agency crafting brands, building seamless user experiences, and engineering smart, AI-powered solutions — all under one roof.
          </motion.p>

          {/* Interactive CTA Buttons with Theme Colors */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button 
              onClick={() => handleNavClick('#portfolio')}
              className="group inline-flex items-center px-8 py-4 text-white font-semibold rounded-full relative overflow-hidden"
              style={{
                background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 20px 40px ${theme.primary}50`
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="relative z-10">View Our Work</span>
              <ArrowRight className="ml-2 w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button 
              onClick={() => handleNavClick('#about')}
              className="inline-flex items-center px-8 py-4 border-2 text-white font-semibold rounded-full backdrop-blur-sm relative overflow-hidden"
              style={{ borderColor: `${theme.primary}60` }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: `${theme.primary}20`
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Meet the Team
            </motion.button>
          </motion.div>

          {/* Animated Stats with Theme Colors */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { number: "50+", label: "Projects Delivered" },
              { number: "4", label: "Expert Team Members" },
              { number: "3", label: "Years Experience" },
              { number: "100%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                  animate={{ 
                    textShadow: [
                      `0 0 0px ${theme.primary}00`,
                      `0 0 20px ${theme.primary}80`,
                      `0 0 0px ${theme.primary}00`
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {stat.number}
                </motion.div>
                <div 
                  className="text-slate-400 transition-colors"
                  style={{ 
                    color: theme.name === 'night' ? '#94A3B8' : '#64748B'
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Interactive Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.2 }}
        onClick={() => handleNavClick('#services')}
      >
        <div 
          className="w-6 h-10 border-2 rounded-full flex justify-center relative overflow-hidden"
          style={{ borderColor: `${theme.primary}60` }}
        >
          <motion.div 
            className="w-1 h-3 rounded-full mt-2"
            style={{ backgroundColor: `${theme.primary}80` }}
            animate={{ 
              y: [0, 16, 0],
              opacity: [1, 0, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Interactive Cursor Trail Effect */}
      <div className="pointer-events-none fixed inset-0 z-30">
        <div 
          className="absolute w-4 h-4 rounded-full opacity-50 animate-ping" 
          style={{ 
            backgroundColor: theme.primary,
            left: 'var(--mouse-x, 50%)', 
            top: 'var(--mouse-y, 50%)',
            transform: 'translate(-50%, -50%)'
          }} 
        />
      </div>
    </section>
  );
};

export default Hero3D;