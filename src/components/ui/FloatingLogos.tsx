/**
 * Floating Logos Component
 * Animated e-commerce platform logos for hero section
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ECOMMERCE_PLATFORMS } from '../../constants';

const FloatingLogos: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {ECOMMERCE_PLATFORMS.map((platform, index) => (
        <motion.div
          key={platform.name}
          className="absolute"
          style={{
            left: `${20 + index * 25}%`,
            top: `${30 + index * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        >
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={platform.logo}
              alt={`${platform.name} logo`}
              className="w-10 h-10 md:w-12 md:h-12 object-contain filter brightness-0 invert opacity-70"
            />
          </motion.div>
          
          {/* Floating particles around logos */}
          {[...Array(3)].map((_, particleIndex) => (
            <motion.div
              key={particleIndex}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingLogos;