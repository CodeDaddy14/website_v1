import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Box, Sphere, Torus } from '@react-three/drei';
import { ExternalLink, ArrowRight, X } from 'lucide-react';
import * as THREE from 'three';

const ProjectGeometry: React.FC<{ type: string; position: [number, number, number]; color: string }> = ({ type, position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime) * 0.3;
    }
  });

  const GeometryComponent = () => {
    switch (type) {
      case 'box':
        return <Box ref={meshRef} position={position} args={[0.5, 0.5, 0.5]}><meshStandardMaterial color={color} /></Box>;
      case 'sphere':
        return <Sphere ref={meshRef} position={position} args={[0.3]}><meshStandardMaterial color={color} /></Sphere>;
      case 'torus':
        return <Torus ref={meshRef} position={position} args={[0.3, 0.1]}><meshStandardMaterial color={color} /></Torus>;
      default:
        return <Box ref={meshRef} position={position} args={[0.5, 0.5, 0.5]}><meshStandardMaterial color={color} /></Box>;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <GeometryComponent />
    </Float>
  );
};

const Portfolio3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const projects = [
    {
      title: "E-Commerce Platform Redesign",
      category: "UI/UX Design & Development",
      description: "Complete redesign and development of a modern e-commerce platform with improved user experience and conversion rates.",
      image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      gradient: "from-blue-500 to-purple-600",
      geometryType: "box",
      geometryColor: "#3B82F6"
    },
    {
      title: "AI-Powered Analytics Dashboard",
      category: "AI/ML & Data Visualization",
      description: "Custom analytics dashboard with machine learning insights for business intelligence and predictive analytics.",
      image: "https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Python", "TensorFlow", "React", "D3.js"],
      gradient: "from-emerald-500 to-teal-600",
      geometryType: "sphere",
      geometryColor: "#10B981"
    },
    {
      title: "Brand Identity System",
      category: "Branding & Visual Identity",
      description: "Complete brand identity design including logo, color palette, typography, and brand guidelines for a tech startup.",
      image: "https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Illustrator", "Photoshop", "Brand Strategy", "Print Design"],
      gradient: "from-pink-500 to-rose-600",
      geometryType: "torus",
      geometryColor: "#EC4899"
    },
    {
      title: "CRM Integration System",
      category: "Backend Development",
      description: "Custom CRM system with third-party integrations, automated workflows, and comprehensive reporting features.",
      image: "https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["PHP", "Laravel", "MySQL", "API Integration"],
      gradient: "from-orange-500 to-red-600",
      geometryType: "box",
      geometryColor: "#F97316"
    },
    {
      title: "Mobile App UI Design",
      category: "Mobile Design",
      description: "Modern mobile app design with intuitive navigation, micro-interactions, and seamless user experience.",
      image: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Figma", "Prototyping", "Mobile UX", "Design System"],
      gradient: "from-cyan-500 to-blue-600",
      geometryType: "sphere",
      geometryColor: "#06B6D4"
    },
    {
      title: "Data Pipeline Architecture",
      category: "Data Engineering",
      description: "Scalable data pipeline for processing large datasets with real-time analytics and automated reporting.",
      image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Apache Spark", "Python", "AWS", "Docker"],
      gradient: "from-violet-500 to-purple-600",
      geometryType: "torus",
      geometryColor: "#8B5CF6"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-white relative overflow-hidden" ref={containerRef}>
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} />
          
          {projects.map((project, index) => (
            <ProjectGeometry
              key={index}
              type={project.geometryType}
              position={[
                (index % 3 - 1) * 3,
                Math.floor(index / 3) * 2 - 1,
                Math.sin(index) * 2
              ]}
              color={project.geometryColor}
            />
          ))}
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
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Our Work
          </motion.h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A showcase of our recent projects demonstrating our expertise across 
            design, development, and AI/ML solutions.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 cursor-pointer"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                rotateX: 5,
                scale: 1.02
              }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(index)}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 flex items-center justify-center`}
                  whileHover={{ opacity: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ExternalLink className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>

                {/* Floating Particles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/50 rounded-full"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${20 + i * 20}%`
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                ))}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <motion.div 
                  className="text-sm font-medium text-blue-600 mb-2"
                  whileHover={{ scale: 1.05 }}
                >
                  {project.category}
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.title}
                </motion.h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span 
                      key={tagIndex}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: project.geometryColor,
                        color: "white"
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* View Project Link */}
                <motion.button 
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  View Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div 
          className="bg-slate-50 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-blue-600 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 360, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: Math.random() * 5
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
              Our Process
            </motion.h3>
            <p className="text-lg text-slate-600">How we bring your ideas to life</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {[
              { step: "01", title: "Discovery", description: "We dive deep to understand your goals, challenges, and vision." },
              { step: "02", title: "Strategy", description: "We create a comprehensive plan tailored to your specific needs." },
              { step: "03", title: "Design & Build", description: "Our team brings the strategy to life with stunning design and robust code." },
              { step: "04", title: "Launch & Optimize", description: "We launch your project and continuously optimize for better results." }
            ].map((phase, index) => (
              <motion.div 
                key={index} 
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg relative overflow-hidden"
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
                  <span className="text-xl font-bold text-blue-600 relative z-10">{phase.step}</span>
                </motion.div>
                <motion.h4 
                  className="text-xl font-bold text-slate-900 mb-3"
                  whileHover={{ color: "#3B82F6" }}
                  transition={{ duration: 0.3 }}
                >
                  {phase.title}
                </motion.h4>
                <p className="text-slate-600 leading-relaxed">{phase.description}</p>
                
                {/* Connector Line */}
                {index < 3 && (
                  <motion.div 
                    className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-slate-200 -translate-x-1/2 z-0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.5, rotateY: -90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.5, rotateY: 90 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={projects[selectedProject].image} 
                  alt={projects[selectedProject].title}
                  className="w-full h-64 object-cover rounded-t-3xl"
                />
                <button
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  {projects[selectedProject].title}
                </h3>
                <p className="text-lg text-slate-600 mb-6">
                  {projects[selectedProject].description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {projects[selectedProject].tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio3D;