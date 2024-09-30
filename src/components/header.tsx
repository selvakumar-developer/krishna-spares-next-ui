import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronRight, Menu, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface HeaderProps {
  isDesktop: boolean;
  toggleSidebar: () => void;
}
export default function Header({ isDesktop, toggleSidebar }: HeaderProps) {
  return (
    <div>
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {!isDesktop && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/account" className="flex items-center">
                  View Account
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/logout" className="flex items-center">
                  Logout
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
}
