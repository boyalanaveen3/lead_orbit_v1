import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { createLead, type CreateLeadPayload } from "../services/LeadsList";
import "./CreateLead.css";

const INITIAL: CreateLeadPayload = {
  firstname: "",
  lastname: "",
  email: "",
  phone_no: "",
  company_name: "",
  source: "",
  remarks: "",
  status_id: "status_new",
  assigned_to: "",
};

const SOURCE_OPTIONS = ["Website", "Social Media", "Referral", "Email", "Cold Call", "Other"];

export default function CreateLead() {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateLeadPayload>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof CreateLeadPayload, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createLead(form);
      navigate("/leads");
    } catch {
      setError("Failed to create lead. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <section className="cl-page">
        <div className="cl-header">
          <h1 className="cl-title">Create Lead</h1>
          <p className="cl-subtitle">Fill in the details to add a new lead.</p>
        </div>

        <form className="cl-form" onSubmit={handleSubmit}>
          <div className="cl-row">
            <div className="cl-field">
              <label>First Name</label>
              <input required value={form.firstname} onChange={e => set("firstname", e.target.value)} placeholder="John" />
            </div>
            <div className="cl-field">
              <label>Last Name</label>
              <input required value={form.lastname} onChange={e => set("lastname", e.target.value)} placeholder="Doe" />
            </div>
          </div>

          <div className="cl-row">
            <div className="cl-field">
              <label>Email</label>
              <input required type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="john@example.com" />
            </div>
            <div className="cl-field">
              <label>Phone</label>
              <input required value={form.phone_no} onChange={e => set("phone_no", e.target.value)} placeholder="9100129823" />
            </div>
          </div>

          <div className="cl-row">
            <div className="cl-field">
              <label>Company Name</label>
              <input required value={form.company_name} onChange={e => set("company_name", e.target.value)} placeholder="ASBL" />
            </div>
            <div className="cl-field">
              <label>Source</label>
              <select required value={form.source} onChange={e => set("source", e.target.value)}>
                <option value="">Select source</option>
                {SOURCE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="cl-row">
            <div className="cl-field">
              <label>Status</label>
              <select value={form.status_id} onChange={e => set("status_id", e.target.value)}>
                <option value="status_new">New</option>
                <option value="status_open">Open</option>
                <option value="status_closed">Closed</option>
              </select>
            </div>
            <div className="cl-field">
              <label>Assigned To <span className="cl-optional">(User ID)</span></label>
              <input value={form.assigned_to} onChange={e => set("assigned_to", e.target.value)} placeholder="UUID of user" />
            </div>
          </div>

          <div className="cl-field">
            <label>Remarks</label>
            <textarea rows={3} value={form.remarks} onChange={e => set("remarks", e.target.value)} placeholder="Interested in CRM demo..." />
          </div>

          {error && <p className="cl-error">{error}</p>}

          <div className="cl-actions">
            <button type="button" className="cl-cancel" onClick={() => navigate("/leads")}>Cancel</button>
            <button type="submit" className="cl-submit" disabled={loading}>
              {loading ? "Creating..." : "Create Lead"}
            </button>
          </div>
        </form>
      </section>
    </AppLayout>
  );
}
