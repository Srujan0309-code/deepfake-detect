import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from './ui/Button';

export const Hero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Particle Animation
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5
            });
        }

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.fillStyle = `rgba(0, 255, 157, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(animateParticles);
        };
        animateParticles();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);


        // Text Reveal Animation
        const ctx2 = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".hero-title span", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out"
            })
                .from(".hero-subtitle", {
                    y: 20,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.5")
                .from(".hero-btn", {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }, "-=0.5");

        }, containerRef);

        return () => {
            window.removeEventListener('resize', handleResize);
            ctx2.revert();
        }
    }, []);

    const titleText = "TRUTH VERIFICATION_SYSTEM";

    return (
        <div ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-cyber-dark">
            {/* Particle Background */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />

            {/* Glow Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-green/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <h1 ref={textRef} className="hero-title text-5xl md:text-7xl font-bold tracking-tighter mb-6 overflow-hidden">
                    {titleText.split("").map((char, i) => (
                        <span key={i} className="inline-block">{char === " " ? "\u00A0" : char}</span>
                    ))}
                </h1>

                <p className="hero-subtitle text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
                    Advanced AI-powered deepfake detection for the post-truth era.
                    Secure your reality with military-grade analysis.
                </p>

                <div className="hero-btn">
                    <Button variant="primary" glow onClick={onStart}>
                        INITIALIZE SCAN
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <span className="text-xs tracking-[0.3em] text-cyber-green">SCROLL TO BEGIN</span>
            </div>
        </div>
    );
};
