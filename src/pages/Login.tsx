import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginuser } from "../services/auth.service";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await loginuser(form);
      setIsLoggedIn(true);
    } catch {
      setError("Invalid email or password.");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout>
      <h1 style={{ marginBottom: 8 }}>Login</h1>
      <p style={{ marginBottom: 20 }}>Welcome to Lead Orbit.</p>
      <form onSubmit={handleSubmit}>
        <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        {error && <p style={{ color: "red", fontSize: 13, marginBottom: 8 }}>{error}</p>}
        <Button type="submit">Login</Button>
      </form>
      <p style={{ marginTop: 16, fontSize: 14 }}>
        Don't have an account? <Link to="/register">Create one</Link>
      </p>
    </AuthLayout>
  );
}
