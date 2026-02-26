'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-volt text-void-black pt-32 pb-12 px-6 relative overflow-hidden">
      
      {/* Background Grid - Refined */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] blur-[0.5px]" 
           style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 lg:mb-32">
            <div>
                <h2 className="text-[12vw] lg:text-[8rem] leading-[0.8] font-bold font-display tracking-tighter mb-8 uppercase mix-blend-multiply select-none">
                    Master<br/>The<br/>Future
                </h2>
            </div>
            <div className="flex flex-col justify-end items-start lg:pl-12">
                <p className="text-xl md:text-2xl font-mono max-w-md mb-8 font-semibold leading-relaxed tracking-tight group cursor-default">
                    Join the new standard of technical education. <br/>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Stop consuming. Start building.</span>
                </p>
                <Link href="/roadmaps" className="relative group">
                    <div className="absolute inset-0 bg-void-black blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse-slow" />
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative px-12 py-5 bg-void-black text-white text-lg font-bold font-mono uppercase tracking-wider hover:bg-white hover:text-void-black transition-colors duration-300"
                    >
                        Enter System
                    </motion.button>
                </Link>
            </div>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            
            <div className="flex flex-col gap-4 text-sm font-mono font-bold uppercase tracking-widest">
                <span className="opacity-40 mb-2">Social</span>
                <a href="#" className="hover:text-white transition-colors hover:translate-x-1 duration-300 block">Twitter</a>
                <a href="#" className="hover:text-white transition-colors hover:translate-x-1 duration-300 block">Github</a>
                <a href="#" className="hover:text-white transition-colors hover:translate-x-1 duration-300 block">Discord</a>
            </div>

            <div className="flex flex-col gap-4 text-sm font-mono font-bold uppercase tracking-widest">
                <span className="opacity-40 mb-2">Legal</span>
                <a href="#" className="hover:text-white transition-colors hover:translate-x-1 duration-300 block">Terms</a>
                <a href="#" className="hover:text-white transition-colors hover:translate-x-1 duration-300 block">Privacy</a>
            </div>

            <div className="md:col-span-2 text-right flex flex-col justify-end items-end">
                <div className="mb-2 flex items-center justify-end gap-2 text-xs font-mono uppercase tracking-widest opacity-60">
                    <div className="w-2 h-2 bg-void-black rounded-full animate-pulse" />
                    System Status: Operational
                </div>
                <div className="text-sm font-bold font-mono uppercase tracking-widest">
                    © 2026 SkillTrail Inc.
                </div>
            </div>

         </div>

      </div>
    </footer>
  );
}
