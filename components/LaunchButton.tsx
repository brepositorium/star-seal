import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface LaunchButtonProps {
  href: string;
  children: string;
}

const LaunchButton = ({ href, children }: LaunchButtonProps) => {
  return (
    <Link href={href} passHref>
      <motion.button
        className="relative font-poppins bg-primary rounded-xl text-white font-bold py-3 px-6 overflow-hidden group"
        whileHover={{ background: "#DCB44A" }}
      >
        <span className="relative z-10">Launch App</span>
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="100%"
            height="100%"
            fill="none"
            stroke="url(#futuristic-gradient)"
            strokeWidth="4"
            strokeDasharray="200"
            strokeDashoffset="0"
            rx="12"
            ry="12"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-400"
              dur="4s"
              repeatCount="indefinite"
            />
          </rect>
          <defs>
            <linearGradient
              id="futuristic-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#FDDA0D" />
              <stop offset="0%" stopColor="#FDDA0D" />
            </linearGradient>
          </defs>
        </svg>
      </motion.button>
    </Link>
  );
};

export default LaunchButton;
