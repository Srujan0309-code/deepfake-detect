import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    glow = false,
    className = '',
    ...props
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const xTo = gsap.quickTo(button, "x", { duration: 0.8, ease: "power3" });
        const yTo = gsap.quickTo(button, "y", { duration: 0.8, ease: "power3" });

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = button.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            // Magnetic strength
            xTo(x * 0.3);
            yTo(y * 0.3);
        };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        button.addEventListener("mousemove", mouseMove);
        button.addEventListener("mouseleave", mouseLeave);

        return () => {
            button.removeEventListener("mousemove", mouseMove);
            button.removeEventListener("mouseleave", mouseLeave);
        };
    }, []);

    const baseStyles = "relative px-8 py-3 rounded-full font-medium tracking-wide overflow-hidden transition-all duration-300 group";

    const variants = {
        primary: "bg-cyber-green text-black hover:shadow-[0_0_30px_rgba(0,255,157,0.4)]",
        secondary: "bg-cyber-gray text-white hover:bg-opacity-80",
        outline: "border border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black"
    };

    return (
        <button
            ref={buttonRef}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            {glow && (
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            )}
        </button>
    );
};
