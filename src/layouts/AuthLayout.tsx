import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const root = document.getElementById("root");

    root?.classList.add("auth-shell");

    return () => {
      root?.classList.remove("auth-shell");
    };
  }, []);

  return (
    <main className="auth-layout min-h-screen grid place-items-center p-6">
      <section className="w-full max-w-[400px]">
        {children}
      </section>
    </main>
  );
}
