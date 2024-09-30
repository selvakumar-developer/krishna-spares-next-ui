import DashboardLayout from "@/components/dashboard.layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardLayout>{children}</DashboardLayout>
    </div>
    // <div></div>
  );
}
