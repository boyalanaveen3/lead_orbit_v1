import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { createTask, type CreateTaskPayload } from "../../services/Tasks.service";
import "../leads/CreateLead.css";

const INITIAL: CreateTaskPayload = {
  title: "",
  description: "",
  due_date: "",
  priority: "medium",
  status: "pending",
  assigned_to: "",
  lead_id: "",
};

type FormErrors = Partial<Record<keyof CreateTaskPayload, string>>;

function validate(form: CreateTaskPayload): FormErrors {
  const errors: FormErrors = {};
  if (!form.title.trim()) errors.title = "Title is required.";
  if (!form.due_date) errors.due_date = "Due date is required.";
  return errors;
}

export default function CreateTask() {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateTaskPayload>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  const set = (key: keyof CreateTaskPayload, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) { setErrors(fieldErrors); return; }
    setApiError("");
    setLoading(true);
    try {
      await createTask(form);
      setSuccess(true);
      setForm(INITIAL);
      setErrors({});
    } catch {
      setApiError("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AppLayout>
        <section className="cl-page">
          <div className="cl-success-screen">
            <div className="cl-success-icon">✅</div>
            <h2>Task Created Successfully!</h2>
            <p>The task has been added.</p>
            <div className="cl-success-actions">
              <button className="cl-submit" onClick={() => setSuccess(false)}>+ Create Another</button>
              <button className="cl-cancel" onClick={() => navigate("/tasks")}>View All Tasks</button>
            </div>
          </div>
        </section>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <section className="cl-page">
        <div className="cl-header">
          <h1 className="cl-title">Create Task</h1>
          <p className="cl-subtitle">Fill in the details to add a new task.</p>
        </div>

        <form className="cl-form" onSubmit={handleSubmit} noValidate>
          <div className="cl-field">
            <label>Title</label>
            <input value={form.title} onChange={e => set("title", e.target.value)} placeholder="Task title" className={errors.title ? "cl-input-error" : ""} />
            {errors.title && <span className="cl-error">{errors.title}</span>}
          </div>

          <div className="cl-field">
            <label>Description</label>
            <textarea rows={3} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Task details..." />
          </div>

          <div className="cl-row">
            <div className="cl-field">
              <label>Due Date</label>
              <input type="date" value={form.due_date} onChange={e => set("due_date", e.target.value)} className={errors.due_date ? "cl-input-error" : ""} />
              {errors.due_date && <span className="cl-error">{errors.due_date}</span>}
            </div>
            {/* <div className="cl-field">
              <label>Priority</label>
              <select value={form.priority} onChange={e => set("priority", e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div> */}
          </div>

          <div className="cl-row">
            <div className="cl-field">
              <label>Status</label>
              <select value={form.status} onChange={e => set("status", e.target.value)}>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="cl-field">
              <label>Lead ID <span className="cl-optional">(optional)</span></label>
              <input value={form.lead_id} onChange={e => set("lead_id", e.target.value)} placeholder="UUID of related lead" />
            </div>
          </div>

          <div className="cl-field">
            <label>Assigned To <span className="cl-optional">(User ID)</span></label>
            <input value={form.assigned_to} onChange={e => set("assigned_to", e.target.value)} placeholder="UUID of user" />
          </div>

          {apiError && <p className="cl-error">{apiError}</p>}

          <div className="cl-actions">
            <button type="button" className="cl-cancel" onClick={() => navigate("/tasks")}>Cancel</button>
            <button type="submit" className="cl-submit" disabled={loading}>
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </section>
    </AppLayout>
  );
}
