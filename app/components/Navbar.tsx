"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Locations", href: "#locations" },
  { label: "Contact", href: "#contact" },
];

const aboutDropdown = [
  { label: "About Us", href: "#about" },
  { label: "Our Values", href: "#values" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Image
            src="/Logo_Text.png"
            alt="Alkavex"
            width={160}
            height={48}
            className="h-10 lg:h-12 w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* About Us dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-slate hover:text-navy transition-colors">
              Who we are
              <ChevronDown size={14} className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg border border-border shadow-lg overflow-hidden"
                >
                  {aboutDropdown.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm font-medium text-slate hover:bg-light-gray hover:text-navy transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate hover:text-navy transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://alkagesta.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 rounded bg-navy text-white text-sm font-medium text-center hover:bg-navy-light transition-colors flex items-center justify-center gap-2 md:px-5 md:py-2"
          >
            Alkagesta Group
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-navy"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-b border-border"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {/* Mobile About Us dropdown */}
              <button
                className="flex items-center gap-1 text-base font-medium text-slate hover:text-navy transition-colors"
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              >
                Who we are
                <ChevronDown size={14} className={`transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileAboutOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="pl-4 flex flex-col gap-3 overflow-hidden"
                  >
                    {aboutDropdown.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="text-sm font-medium text-slate hover:text-navy transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-base font-medium text-slate hover:text-navy transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://alkagesta.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-navy text-white text-sm font-medium text-center hover:bg-navy-light transition-colors flex items-center justify-center gap-2 md:px-5 md:py-2"
              >
                Alkagesta Group
                <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
