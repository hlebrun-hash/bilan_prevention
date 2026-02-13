import React, { useState } from "react";
import { motion } from "framer-motion";

const containerVariants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const letterVariants = {
    initial: {
        y: 0,
        color: "var(--color-text-secondary)", // Couleur initiale (gris)
    },
    animate: {
        y: "-120%",
        color: "var(--color-primary)", // Couleur active (vert médical)
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
        },
    },
};

export const AnimatedInput = ({
    label,
    value,
    onChange,
    className = "",
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const showLabel = isFocused || (value && value.length > 0);

    return (
        <div style={{ position: "relative", width: "100%", ...props.style }} className={className}>
            <motion.div
                style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    left: 0,
                    display: "flex", // Pour aligner les lettres
                }}
                variants={containerVariants}
                initial="initial"
                animate={showLabel ? "animate" : "initial"}
            >
                {label.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        style={{
                            display: "inline-block",
                            fontSize: "0.875rem",
                            willChange: "transform"
                        }}
                        variants={letterVariants}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.div>

            <input
                type="text"
                value={value}
                onChange={onChange}
                onFocus={(e) => {
                    setIsFocused(true);
                    e.target.style.borderColor = "var(--color-primary)";
                }}
                onBlur={(e) => {
                    setIsFocused(false);
                    e.target.style.borderColor = "#E5E5E5";
                }}
                style={{
                    outline: "none",
                    border: "none",
                    borderBottom: "2px solid #E5E5E5",
                    padding: "0.5rem 0",
                    width: "100%",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "var(--color-text-primary)",
                    backgroundColor: "transparent",
                    transition: "border-color 0.2s"
                }}
                onMouseEnter={(e) => {
                    if (document.activeElement !== e.target) {
                        e.target.style.borderColor = "#B8956A"; // Couleur secondaire au survol
                    }
                }}
                onMouseLeave={(e) => {
                    if (document.activeElement !== e.target) {
                        e.target.style.borderColor = "#E5E5E5";
                    }
                }}
                {...props}
            />
        </div>
    );
};
