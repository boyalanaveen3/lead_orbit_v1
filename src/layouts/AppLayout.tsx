import { useEffect, type ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import "./AppLayout.css";

export default function AppLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.getElementById("root");

    root?.classList.add("app-shell");

    return () => {
      root?.classList.remove("app-shell");
    };
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-content">{children}</main>
    </div>
  );
}
