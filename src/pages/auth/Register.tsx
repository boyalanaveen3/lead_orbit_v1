import { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { register } from "../../services/Auth.service";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({ organization_name:"",firstname: "", lastname:"",email: "", password: "", phone_no:""});
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      setIsRegistered(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          (err.response?.data as { message?: string })?.message ||
          err.response?.statusText ||
          err.message;
        setError(message || "Registration failed. Please try again.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  if (isRegistered) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthLayout>
      <div className="register-page">
        <h1 className="register-title">Create Account</h1><br></br>
        <p className="register-subtitle">Join Lead Orbit today.</p><br></br>
        <form className="register-form" onSubmit={handleSubmit}>
          <Input label="organization_name" type="text" placeholder="companey name" value={form.organization_name} onChange={e => setForm({ ...form, organization_name: e.target.value })} required />
          <Input label="firstname" type="text" placeholder="first name" value={form.firstname} onChange={e => setForm({ ...form, firstname: e.target.value })} required />
          <Input label="lastname" type="text" placeholder="last name" value={form.lastname} onChange={e => setForm({ ...form, lastname: e.target.value })} required />
          <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <Input label="Phone No" type="text" placeholder="Your phone number" value={form.phone_no} onChange={e => setForm({ ...form, phone_no: e.target.value })} required />
          {error && <p className="register-error">{error}</p>}
          <Button type="submit">Register</Button>
        </form>
        <p className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
