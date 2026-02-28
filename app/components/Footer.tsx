import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#060e1a] text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <Image
              src="/Logo_Text.png"
              alt="Alkavex"
              width={140}
              height={42}
              className="h-9 w-auto object-contain brightness-0 invert"
            />
            <span className="text-gray-500 text-sm">
              Part of{" "}
              <a
                href="https://alkagesta.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1"
              >
                Alkagesta Group
                <ArrowUpRight size={12} />
              </a>
            </span>
          </div>

          <p className="text-sm">
            &copy; {new Date().getFullYear()} Alkavex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
