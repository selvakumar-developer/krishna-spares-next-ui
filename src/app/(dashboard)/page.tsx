import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  LucideProps,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export default function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Products" value="1,234" icon={Package} />
        <StatCard title="Total Orders" value="5,678" icon={ShoppingCart} />
        <StatCard title="Total Suppliers" value="90" icon={Users} />
        <StatCard title="System Performance" value="95%" icon={BarChart} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-100 rounded-lg">
              <BarChartPlaceholder />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-100 rounded-lg">
              <PieChartPlaceholder />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number | string | boolean;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function BarChartPlaceholder() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 200 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="70" width="20" height="30" fill="#3b82f6" />
      <rect x="40" y="40" width="20" height="60" fill="#3b82f6" />
      <rect x="70" y="20" width="20" height="80" fill="#3b82f6" />
      <rect x="100" y="50" width="20" height="50" fill="#3b82f6" />
      <rect x="130" y="30" width="20" height="70" fill="#3b82f6" />
      <rect x="160" y="60" width="20" height="40" fill="#3b82f6" />
    </svg>
  );
}

function PieChartPlaceholder() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="45" fill="#3b82f6" />
      <path d="M50 50 L95 50 A45 45 0 0 1 85 85 Z" fill="#2563eb" />
      <path d="M50 50 L85 85 A45 45 0 0 1 50 95 Z" fill="#1d4ed8" />
    </svg>
  );
}
