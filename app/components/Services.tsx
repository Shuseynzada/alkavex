"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRightLeft,
  Truck,
  Settings,
  Landmark,
  Layers,
  LayoutList,
} from "lucide-react";

const services = [
  {
    icon: ArrowRightLeft,
    title: "Steel Trading",
    description:
      "End-to-end sourcing and supply of steel products from top-tier mills worldwide, with competitive pricing and reliable delivery.",
    accent: "#0d3b66",
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
    accent: "#0d3b66",
  },
  {
    icon: Landmark,
    title: "Trade Financing",
    description:
      "Structured trade finance solutions backed by strong banking relationships, enabling seamless transactions for all parties.",
    accent: "#1e3a5f",
  },
];

const longProducts = [
  "Steel Billets",
  "Reinforcing Bars (Rebars)",
  "Wire Rods / Wire Mesh",
  "Wires (Black / Galvanized / Annealed / etc.)",
  "Merchant Bars (Angles, Flat, Round & Square Bars, T‑bars)",
  "Beams (UPN, IPE, IPN, U‑Channels)",
];

const flatProducts = [
  "Hot Rolled Coils / Sheets / Strips",
  "Cold Rolled Coils / Sheets / Strips",
  "Coated Coils (Aluzinc, PPGI, Galvanized)",
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const productsRef = useRef(null);
  const productsInView = useInView(productsRef, { once: true, margin: "-80px" });

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
          <p className="text-[#0d3b66] font-semibold tracking-[0.2em] uppercase text-xs mb-4">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
            Our Services
          </h2>
          <div className="w-16 h-[2px] bg-[#0d3b66] mx-auto mt-6" />
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative bg-white rounded-xl p-8 lg:p-10 border border-border hover:border-[#0d3b66]/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Accent top bar */}
              <div
                className="absolute top-0 left-8 right-8 h-[2px] rounded-b"
                style={{ backgroundColor: '#0d3b66', opacity: 0.5 }}
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

        {/* Products section */}
        <div className="mt-24" ref={productsRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#0d3b66] font-semibold tracking-[0.2em] uppercase text-xs mb-4">
              What We Trade
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
              Our Products
            </h2>
            <div className="w-16 h-[2px] bg-[#0d3b66] mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Long Products */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={productsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-border bg-white p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#0d3b66] flex items-center justify-center">
                  <Layers size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy tracking-wide">
                  Long Products
                </h3>
              </div>
              <ul className="space-y-3">
                {longProducts.map((product, i) => (
                  <motion.li
                    key={product}
                    initial={{ opacity: 0, x: -15 }}
                    animate={productsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="flex items-start gap-3 text-sm text-slate leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0d3b66] shrink-0" />
                    {product}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Flat Products */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={productsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="rounded-2xl border border-border bg-white p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#1e3a5f] flex items-center justify-center">
                  <LayoutList size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy tracking-wide">
                  Flat Products
                </h3>
              </div>
              <ul className="space-y-3">
                {flatProducts.map((product, i) => (
                  <motion.li
                    key={product}
                    initial={{ opacity: 0, x: -15 }}
                    animate={productsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-start gap-3 text-sm text-slate leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1e3a5f] shrink-0" />
                    {product}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
