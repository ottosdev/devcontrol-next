import { DashboardHeader } from "./_components/header";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
