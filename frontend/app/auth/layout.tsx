export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#dcfce7,transparent_35%),radial-gradient(circle_at_80%_0%,#bbf7d0,transparent_30%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] px-6 py-14 lg:px-8">
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-lime-200/40 blur-3xl" />

      <div className="relative mx-auto flex min-h-[80vh] w-full max-w-4xl items-center justify-center">
        {children}
      </div>
    </div>
  );
}
