"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Rocket, Users, Handshake } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Ownership & Accountability",
    description: "We take responsibility for outcomes and deliver results.",
    accent: "#0d3b66",
    number: "01",
  },
  {
    icon: Rocket,
    title: "Entrepreneurial Drive & Innovation",
    description:
      "We embrace challenges, seize opportunities, and continuously improve. We act with agility and expand into new markets.",
    accent: "#1e3a5f",
    number: "02",
  },
  {
    icon: Users,
    title: "Collaboration & Unity",
    description:
      "We operate as one team across markets, functions, and geographies. We share knowledge, support each other, and leverage our combined strengths to serve partners and customers seamlessly.",
    accent: "#0d3b66",
    number: "03",
  },
  {
    icon: Handshake,
    title: "Shared Success",
    description: "We grow together with those we serve.",
    accent: "#1e3a5f",
    number: "04",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

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

        {/* Values section */}
        <div className="mt-24" id="values" ref={valuesRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#0d3b66] font-semibold tracking-[0.2em] uppercase text-xs mb-4">
              What We Stand For
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
              Our Values
            </h2>
            <div className="w-16 h-[2px] bg-[#0d3b66] mx-auto mt-6" />
          </motion.div>

          <div className="space-y-6">
            {values.map((value, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  animate={valuesInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
                  className={`relative flex flex-col sm:flex-row items-start gap-6 rounded-2xl border border-border bg-light-gray p-8 overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                    isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Large faded number */}
                  <span
                    className={`absolute top-3 font-black text-[5rem] leading-none opacity-[0.04] pointer-events-none select-none ${
                      isEven ? "right-6" : "left-6"
                    } max-sm:right-6 max-sm:left-auto`}
                  >
                    {value.number}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: value.accent }}
                  >
                    <value.icon size={24} className="text-white" />
                  </div>

                  {/* Text */}
                  <div className={isEven ? "text-left" : "sm:text-right"}>
                    <h3 className="text-lg font-bold text-navy mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate leading-relaxed max-w-lg">
                      {value.description}
                    </p>
                  </div>

                  {/* Accent bar */}
                  <span
                    className={`absolute bottom-0 h-1 w-24 rounded-t ${
                      isEven ? "left-8" : "right-8"
                    }`}
                    style={{ backgroundColor: value.accent }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
