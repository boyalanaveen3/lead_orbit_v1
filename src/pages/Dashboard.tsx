import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { Dashboard as fetchDashboard } from "../services/Dashboard.service";
import "./Dashboard.css";

type Stats = {
  totalLeads: number;
  newLeads: number;
  pendingTasks: number;
  totalUsers: number;
};

const CARDS = [
  { key: "totalLeads",    label: "Total Leads",    icon: "📋" },
  { key: "newLeads",      label: "New Leads",      icon: "🆕" },
  { key: "pendingTasks",  label: "Pending Tasks",  icon: "⏳" },
  { key: "totalUsers",    label: "Total Users",    icon: "👥" },
] as const;

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard()
      .then(res => setStats(res?.data))
      .catch(() => setError("Failed to load dashboard."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout>
      <section className="dashboard-page">
        <h1 className="dashboard-title">Dashboard</h1>
        {loading && <p className="dash-state">Loading...</p>}
        {error && <p className="dash-error">{error}</p>}
        {stats && (
          <div className="dash-cards">
            {CARDS.map(({ key, label, icon }) => (
              <div className="dash-card" key={key}>
                <span className="dash-card-icon">{icon}</span>
                <p className="dash-card-label">{label}</p>
                <p className="dash-card-value">{stats[key]}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </AppLayout>
  );
}
