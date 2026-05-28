export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="min-h-screen grid place-items-center p-6">

      <section className="w-full max-w-[400px]">
        {children}
      </section>

    </main>
  );
}