import { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { register } from "../services/auth.service";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      <h1 style={{ marginBottom: 8 }}>Create Account</h1>
      <p style={{ marginBottom: 20 }}>Join Lead Orbit today.</p>
      <form onSubmit={handleSubmit}>
        <Input label="Name" type="text" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        {error && <p style={{ color: "red", fontSize: 13, marginBottom: 8 }}>{error}</p>}
        <Button type="submit">Register</Button>
      </form>
      <p style={{ marginTop: 16, fontSize: 14 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </AuthLayout>
  );
}
