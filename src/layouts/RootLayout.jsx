import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import DemoBanner from "../components/common/DemoBanner";
import Footer from "../components/common/Footer";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory dark:bg-wine-deep text-charcoal dark:text-ivory transition-colors duration-300">
      <DemoBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

