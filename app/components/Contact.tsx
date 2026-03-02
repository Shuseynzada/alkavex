"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Globe, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-24 lg:py-32 bg-navy text-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-semibold tracking-[0.2em] uppercase text-xs mb-4">
            Get in Touch
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Ready to partner with us?
          </h2>
          <div className="w-16 h-[2px] bg-accent mx-auto mb-8" />
          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-12 leading-relaxed">
            Whether you&apos;re sourcing steel, seeking a trading partner, or
            exploring financing solutions — we&apos;re here to help.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="mailto:contact@alkavex.com"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-navy font-semibold rounded hover:bg-accent-light transition-colors text-sm"
          >
            <Mail size={18} />
            contact@alkavex.com
          </a>
          <a
            href="https://alkagesta.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/30 text-white font-medium rounded hover:bg-white/10 transition-colors text-sm"
          >
            <Globe size={18} />
            Alkagesta Group
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
