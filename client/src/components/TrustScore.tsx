import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TrustScoreProps {
    score: number;
    riskLevel: 'Low' | 'Medium' | 'High';
}

export const TrustScore: React.FC<TrustScoreProps> = ({ score, riskLevel }) => {
    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease out

            setAnimatedScore(Math.floor(start + (score - start) * ease));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [score]);

    const getColor = () => {
        if (score >= 80) return '#00ff9d'; // Green
        if (score >= 50) return '#ffd700'; // Yellow
        return '#ff0055'; // Red
    };

    const color = getColor();
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (animatedScore / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-black/20 rounded-2xl backdrop-blur-sm border border-white/5">
            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="128"
                        cy="128"
                        r={radius}
                        stroke="#1a1a1a"
                        strokeWidth="12"
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="128"
                        cy="128"
                        r={radius}
                        stroke={color}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-300 ease-out drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        className="text-6xl font-bold font-mono"
                        style={{ color }}
                    >
                        {animatedScore}%
                    </motion.span>
                    <span className="text-gray-500 text-sm mt-2 tracking-widest">TRUST SCORE</span>
                </div>
            </div>

            <div className="mt-6 text-center">
                <div className="text-sm text-gray-400 mb-1">RISK LEVEL</div>
                <div
                    className="text-2xl font-bold tracking-widest uppercase"
                    style={{ color }}
                >
                    {riskLevel}
                </div>
            </div>
        </div>
    );
};
