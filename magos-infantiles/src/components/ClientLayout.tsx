'use client';

import { useSidebar } from "@/context/SidebarContext";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebar();

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-[180px]' : 'ml-0'} pt-16`}>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
} 