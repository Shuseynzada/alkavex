"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, LayoutList } from "lucide-react";

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

export default function Products() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="products" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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

        {/* Product categories */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Long Products */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-border bg-light-gray p-8"
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
                  animate={inView ? { opacity: 1, x: 0 } : {}}
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
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="rounded-2xl border border-border bg-light-gray p-8"
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
                  animate={inView ? { opacity: 1, x: 0 } : {}}
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
    </section>
  );
}
