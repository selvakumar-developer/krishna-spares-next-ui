import { SIDE_NAV_ITEMS } from "@/constant/nav";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface SidebarProps {
  isSidebarOpen: boolean;
  isDesktop: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({
  isSidebarOpen,
  isDesktop,
  toggleSidebar,
}: SidebarProps) {
  const showSidebar = isSidebarOpen || isDesktop;

  return (
    <div>
      <AnimatePresence initial={false}>
        {showSidebar && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white w-64 min-h-screen flex flex-col shadow-lg z-20"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
              {!isDesktop && (
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <X className="h-6 w-6" />
                </Button>
              )}
            </div>
            <nav className="flex-1 p-4">
              {SIDE_NAV_ITEMS.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg mb-2"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
