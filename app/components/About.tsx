"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#0d3b66] font-semibold tracking-[0.2em] uppercase text-xs mb-4">
              Who We Are
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6">
              Steel trading,{" "}
              <span className="text-[#0d3b66] font-bold">redefined.</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#0d3b66] mb-8" />
            <p className="text-lg text-slate leading-relaxed mb-6">
              Alkavex is the dedicated steel&#8209;trading arm of{" "}
              <a
                href="https://alkagesta.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy font-semibold hover:text-[#0d3b66] transition-colors underline decoration-[#0d3b66]/40 underline-offset-4"
              >
                Alkagesta Group
              </a>
              , created to power reliable and risk&#8209;controlled steel flows
              into fast&#8209;growing markets worldwide.
            </p>
            <p className="text-base text-slate leading-relaxed">
              Built on Alkagesta&apos;s institutional governance, strong banking
              relationships, and disciplined risk framework, Alkavex brings
              together global sourcing capabilities, financial structuring
              expertise, and deep market understanding to serve customers and
              partners with unmatched reliability.
            </p>
          </motion.div>

          {/* Right column — mission card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-navy rounded-2xl p-10 lg:p-12 text-white relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full" />
              <p className="text-accent font-semibold tracking-[0.2em] uppercase text-xs mb-6 relative z-10">
                Our Mission
              </p>
              <p className="text-2xl md:text-3xl font-light leading-relaxed relative z-10">
                Make steel supply{" "}
                <span className="font-semibold text-accent">predictable</span>,{" "}
                <span className="font-semibold text-accent">secure</span>, and{" "}
                <span className="font-semibold text-accent">seamless</span>{" "}
                &mdash; from mill to final destination.
              </p>
              {/* Subtle accent line */}
              <div className="mt-8 w-24 h-[2px] bg-accent/50 relative z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
