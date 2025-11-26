import { Metadata } from "next";
import { DashboardHeader } from "../layouts/Header";

export const metadata: Metadata = {
  title: "Dashboard | Plural Health",
  description: "Building better healthcare",
};

export default function GeneralDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen bg-secondary">
      <DashboardHeader />
      <div className="overflow-y-auto h-[calc(100vh-48px)]">{children}</div>
    </div>
  );
}
