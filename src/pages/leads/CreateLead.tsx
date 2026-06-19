import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { createLead, type CreateLeadPayload } from "../../services/LeadsList";
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

type FormErrors = Partial<Record<keyof CreateLeadPayload, string>>;

function validate(form: CreateLeadPayload): FormErrors {
  const errors: FormErrors = {};
  if (!form.firstname.trim()) errors.firstname = "First name is required.";
  if (!form.lastname.trim()) errors.lastname = "Last name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email.";
  if (!form.phone_no.trim()) errors.phone_no = "Phone is required.";
  else if (!/^\d{10}$/.test(form.phone_no.trim())) errors.phone_no = "Enter a valid 10-digit phone number.";
  if (!form.company_name.trim()) errors.company_name = "Company name is required.";
  if (!form.source) errors.source = "Please select a source.";
  return errors;
}

export default function CreateLead() {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateLeadPayload>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  const set = (key: keyof CreateLeadPayload, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setApiError("");
    setLoading(true);
    try {
      await createLead(form);
      setSuccess(true);
      setForm(INITIAL);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setApiError("Failed to create lead. Please try again.");
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
            <h2>Lead Created Successfully!</h2>
            <p>The lead has been added to your pipeline.</p>
            <div className="cl-success-actions">
              <button className="cl-submit" onClick={() => setSuccess(false)}>+ Create Another</button>
              <button className="cl-cancel" onClick={() => navigate("/leads")}>View All Leads</button>
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
          <h1 className="cl-title">Create Lead</h1>
          <p className="cl-subtitle">Fill in the details to add a new lead.</p>
        </div>

        <form className="cl-form" onSubmit={handleSubmit} noValidate>
          <div className="cl-row">
            <div className="cl-field">
              <label>First Name</label>
              <input value={form.firstname} onChange={e => set("firstname", e.target.value)} placeholder="John" className={errors.firstname ? "cl-input-error" : ""} />
              {errors.firstname && <span className="cl-error">{errors.firstname}</span>}
            </div>
            <div className="cl-field">
              <label>Last Name</label>
              <input value={form.lastname} onChange={e => set("lastname", e.target.value)} placeholder="Doe" className={errors.lastname ? "cl-input-error" : ""} />
              {errors.lastname && <span className="cl-error">{errors.lastname}</span>}
            </div>
          </div>

          <div className="cl-row">
            <div className="cl-field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="john@example.com" className={errors.email ? "cl-input-error" : ""} />
              {errors.email && <span className="cl-error">{errors.email}</span>}
            </div>
            <div className="cl-field">
              <label>Phone</label>
              <input value={form.phone_no} onChange={e => set("phone_no", e.target.value)} placeholder="9100129823" className={errors.phone_no ? "cl-input-error" : ""} />
              {errors.phone_no && <span className="cl-error">{errors.phone_no}</span>}
            </div>
          </div>

          <div className="cl-row">
            <div className="cl-field">
              <label>Company Name</label>
              <input value={form.company_name} onChange={e => set("company_name", e.target.value)} placeholder="ASBL" className={errors.company_name ? "cl-input-error" : ""} />
              {errors.company_name && <span className="cl-error">{errors.company_name}</span>}
            </div>
            <div className="cl-field">
              <label>Source</label>
              <select value={form.source} onChange={e => set("source", e.target.value)} className={errors.source ? "cl-input-error" : ""}>
                <option value="">Select source</option>
                {SOURCE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.source && <span className="cl-error">{errors.source}</span>}
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

          {apiError && <p className="cl-error">{apiError}</p>}

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
