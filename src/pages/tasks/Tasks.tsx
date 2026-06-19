import { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import { tasklist } from "../../services/Tasks.service";
import "../leads/Leads.css";

type Task = {
  task_id: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  assigned_to: string;
  lead_id: string;
  created_at: string;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => { loadTasks(); }, [page]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await tasklist({ page, limit });
      const list = response?.data?.data ?? [];
      setTasks(list);
    } catch {
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <section className="leads-page">
        <div className="leads-page-header">
          <div>
            <p className="leads-eyebrow">Task Management</p>
            <h1 className="leads-title">Tasks</h1>
          </div>
        </div>

        {loading && <p className="leads-state">Loading tasks...</p>}
        {error && !loading && <p className="leads-error">{error}</p>}
        {!loading && !error && tasks.length === 0 && (
          <p className="leads-state">No tasks found.</p>
        )}

        {!loading && !error && tasks.length > 0 && (
          <div className="leads-table-wrap">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, i) => (
                  <tr key={task.task_id}>
                    <td>{(page - 1) * limit + i + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description || "—"}</td>
                    <td>{task.due_date ? new Date(task.due_date).toLocaleDateString() : "—"}</td>
                    <td><span className={`status-badge status-${task.status}`}>{task.status}</span></td>
                    <td>{task.assigned_to || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && tasks.length > 0 && (
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
            <span>Page {page}</span>
            <button disabled={tasks.length < limit} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        )}
      </section>
    </AppLayout>
  );
}
