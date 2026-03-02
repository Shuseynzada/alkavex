"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRightLeft,
  Truck,
  Settings,
  Landmark,
} from "lucide-react";

const services = [
  {
    icon: ArrowRightLeft,
    title: "Steel Trading",
    description:
      "End-to-end sourcing and supply of steel products from top-tier mills worldwide, with competitive pricing and reliable delivery.",
    accent: "#c8a96e",
  },
  {
    icon: Truck,
    title: "Logistics",
    description:
      "Comprehensive freight management, port handling, and inland distribution ensuring goods arrive on time and on spec.",
    accent: "#1e3a5f",
  },
  {
    icon: Settings,
    title: "Operational Execution",
    description:
      "Hands-on management of every shipment — documentation, quality control, and compliance from origin to destination.",
    accent: "#c8a96e",
  },
  {
    icon: Landmark,
    title: "Trade Financing",
    description:
      "Structured trade finance solutions backed by strong banking relationships, enabling seamless transactions for all parties.",
    accent: "#1e3a5f",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24 lg:py-32 bg-light-gray" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#EAEAEA] font-semibold tracking-[0.2em] uppercase text-xs mb-4">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
            Our Services
          </h2>
          <div className="w-16 h-[2px] bg-[#EAEAEA] mx-auto mt-6" />
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative bg-white rounded-xl p-8 lg:p-10 border border-border hover:border-[#EAEAEA]/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Accent top bar */}
              <div
                className="absolute top-0 left-8 right-8 h-[2px] rounded-b"
                style={{ backgroundColor: '#EAEAEA', opacity: 0.5 }}
              />

              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: `${s.accent}15` }}
              >
                <s.icon size={24} style={{ color: s.accent }} />
              </div>

              <h3 className="text-xl font-bold text-navy mb-3">{s.title}</h3>
              <p className="text-slate leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
