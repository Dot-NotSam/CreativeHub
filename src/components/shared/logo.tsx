"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("h-10 w-10 select-none", className)}
    >
      <defs>
        <radialGradient id="logoBgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#120e2e" />
          <stop offset="100%" stopColor="#030303" />
        </radialGradient>
        
        <linearGradient id="logoEmblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        <linearGradient id="logoRingGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#6366f1" stopOpacity={0.15} />
        </linearGradient>
      </defs>

      <circle cx="50%" cy="50%" r="47" fill="url(#logoBgGrad)" stroke="#27272a" strokeWidth={2} />
      
      <circle cx="50%" cy="50%" r="41" fill="none" stroke="url(#logoRingGrad)" strokeWidth={1.5} strokeDasharray="14 6 8 4" />

      <g transform="translate(10, 10) scale(0.8)">
        <path d="M35 30 A20 20 0 1 0 35 70" fill="none" stroke="url(#logoEmblemGrad)" strokeWidth={7} strokeLinecap="round" />
        
        <line x1="33" y1="50" x2="67" y2="50" stroke="url(#logoEmblemGrad)" strokeWidth={7} strokeLinecap="round" />

        <path d="M49 30 L49 70 M65 30 L65 70" fill="none" stroke="url(#logoEmblemGrad)" strokeWidth={7} strokeLinecap="round" />
      </g>

      <circle cx="50" cy="50" r="4" fill="#ffffff" />
    </svg>
  );
}
