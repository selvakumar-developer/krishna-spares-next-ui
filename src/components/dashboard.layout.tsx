"use client";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import React from "react";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("./sidenav"), { ssr: false });
const Header = dynamic(() => import("./header"), { ssr: false });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <React.Fragment>
      <Sidebar
        isDesktop={isDesktop}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <Header isDesktop={isDesktop} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </React.Fragment>
  );
}
