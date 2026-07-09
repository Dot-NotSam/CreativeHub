"use client";

import React from "react";
import Sidebar from "@/components/shared/sidebar";
import Header from "@/components/shared/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Glow Backdrop */}
      <div className="fixed inset-0 pointer-events-none radial-glow z-0" />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen relative z-10">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
