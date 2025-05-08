import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-dark flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              LUXE
            </span>
          </div>
        </motion.div>
        
        <div className="flex space-x-3">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="h-3 w-3 rounded-full bg-gradient-to-r from-primary to-secondary"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;