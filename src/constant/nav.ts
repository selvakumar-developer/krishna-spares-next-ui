import { BarChart, Package, Settings, ShoppingCart, Users } from "lucide-react";

export const SIDE_NAV_ITEMS = [
  { icon: BarChart, label: "Dashboard", href: "/" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: ShoppingCart, label: "Orders", href: "/orders" },
  { icon: Users, label: "Suppliers", href: "/suppliers" },
  { icon: Settings, label: "Settings", href: "/settings" },
];
