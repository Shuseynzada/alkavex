"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#c8a96e"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-accent font-medium tracking-[0.25em] uppercase text-sm mb-6">
            A Division of Alkagesta Group
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.05]"
        >
          ALKAVEX
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-[2px] bg-accent mx-auto my-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Reliable steel flows from mill to final destination.
          <br />
          <span className="text-accent-light">
            Predictable. Secure. Seamless.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#about"
            className="px-8 py-3.5 bg-accent text-navy font-semibold rounded hover:bg-accent-light transition-colors text-sm tracking-wide"
          >
            Discover More
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border border-white/30 text-white font-medium rounded hover:bg-white/10 transition-colors text-sm tracking-wide"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.a>
    </section>
  );
}
