import React from 'react';
import { motion } from 'framer-motion';

export const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative w-16 h-16">
                {[...Array(3)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute inset-0 border-2 border-cyber-green rounded-full"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.6,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
            <motion.p
                className="text-cyber-green font-mono text-sm tracking-widest"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                ANALYZING...
            </motion.p>
        </div>
    );
};
