import { useState, useEffect } from "react";
import AppLayout from "../../layouts/AppLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  updateProfile,
  updateOrganization,
  changePassword,
  getOrganization,
  getUsers,
} from "../../services/Settings.service";
import "./Settings.css";

// Helper to decode JWT token in browser
function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<"profile" | "organization" | "security">("profile");

  // State for forms
  const [profileForm, setProfileForm] = useState({
    firstname: "",
    lastname: "",
    phone_no: "",
    email: "", // Read-only
  });

  const [orgForm, setOrgForm] = useState({
    name: "",
    email: "",
    phone_no: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  // UI feedback states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load initial settings data
  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User session not found. Please log in again.");
          setLoading(false);
          return;
        }

        const decoded = parseJwt(token);
        if (!decoded || !decoded.user_id || !decoded.organization_id) {
          setError("Invalid session. Please log in again.");
          setLoading(false);
          return;
        }

        // Fetch users to find current user details
        const usersResponse = await getUsers();
        const usersList = usersResponse?.data || [];
        const currentUser = usersList.find((u: any) => u.user_id === decoded.user_id);

        if (currentUser) {
          setProfileForm({
            firstname: currentUser.firstname || "",
            lastname: currentUser.lastname || "",
            phone_no: currentUser.phone_no || "",
            email: currentUser.email || "",
          });
        }

        // Fetch organization details
        const orgData = await getOrganization(decoded.organization_id);
        if (orgData) {
          setOrgForm({
            name: orgData.name || "",
            email: orgData.email || "",
            phone_no: orgData.phone_no || "",
          });
        }
      } catch (err: any) {
        console.error("Failed to load settings:", err);
        setError("Failed to load settings data. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  // Form submit handlers
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const result = await updateProfile({
        firstname: profileForm.firstname,
        lastname: profileForm.lastname,
        phone_no: profileForm.phone_no,
      });
      if (result.success) {
        setSuccess("Profile settings updated successfully.");
      } else {
        setError(result.message || "Failed to update profile.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleOrgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const result = await updateOrganization({
        name: orgForm.name,
        email: orgForm.email,
        phone_no: orgForm.phone_no,
      });
      if (result.success) {
        setSuccess("Organization settings updated successfully.");
      } else {
        setError(result.message || "Failed to update organization.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to update organization.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setError("New passwords do not match.");
      return;
    }

    if (passwordForm.new_password.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    setSaving(true);
    try {
      const result = await changePassword({
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
      });
      if (result.success) {
        setSuccess("Password updated successfully.");
        setPasswordForm({
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
      } else {
        setError(result.message || "Failed to update password.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to update password.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <section className="settings-page">
        <div className="settings-page-header">
          <div>
            <p className="settings-eyebrow">Configuration</p>
            <h1 className="settings-title">Settings</h1>
          </div>
        </div>

        {loading ? (
          <div className="settings-state">Loading configuration data...</div>
        ) : (
          <div className="settings-container">
            {/* Tabs Sidebar */}
            <div className="settings-tabs">
              <button
                type="button"
                className={`settings-tab-btn ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("profile");
                  setError("");
                  setSuccess("");
                }}
              >
                Profile Settings
              </button>
              <button
                type="button"
                className={`settings-tab-btn ${activeTab === "organization" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("organization");
                  setError("");
                  setSuccess("");
                }}
              >
                Organization Settings
              </button>
              <button
                type="button"
                className={`settings-tab-btn ${activeTab === "security" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("security");
                  setError("");
                  setSuccess("");
                }}
              >
                Security & Password
              </button>
            </div>

            {/* Form Panels */}
            <div className="settings-panel">
              {error && <div className="settings-alert alert-error">{error}</div>}
              {success && <div className="settings-alert alert-success">{success}</div>}

              {activeTab === "profile" && (
                <form className="settings-form" onSubmit={handleProfileSubmit}>
                  <h2>Personal Information</h2>
                  <p className="settings-panel-desc">Update your personal account details and phone number.</p>

                  <div className="settings-form-grid">
                    <Input
                      label="First Name"
                      type="text"
                      placeholder="John"
                      value={profileForm.firstname}
                      onChange={(e) => setProfileForm({ ...profileForm, firstname: e.target.value })}
                      required
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      placeholder="Doe"
                      value={profileForm.lastname}
                      onChange={(e) => setProfileForm({ ...profileForm, lastname: e.target.value })}
                      required
                    />
                  </div>

                  <Input
                    label="Email Address (read-only)"
                    type="email"
                    value={profileForm.email}
                    disabled
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={profileForm.phone_no}
                    onChange={(e) => setProfileForm({ ...profileForm, phone_no: e.target.value })}
                  />

                  <div className="settings-form-actions">
                    <Button type="submit" disabled={saving}>
                      {saving ? "Saving Changes..." : "Save Profile"}
                    </Button>
                  </div>
                </form>
              )}

              {activeTab === "organization" && (
                <form className="settings-form" onSubmit={handleOrgSubmit}>
                  <h2>Organization Profile</h2>
                  <p className="settings-panel-desc">Manage your organization's public name, contact email, and phone number.</p>

                  <Input
                    label="Organization Name"
                    type="text"
                    placeholder="Acme Corp"
                    value={orgForm.name}
                    onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                    required
                  />

                  <Input
                    label="Contact Email Address"
                    type="email"
                    placeholder="contact@acme.com"
                    value={orgForm.email}
                    onChange={(e) => setOrgForm({ ...orgForm, email: e.target.value })}
                  />

                  <Input
                    label="Contact Phone Number"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={orgForm.phone_no}
                    onChange={(e) => setOrgForm({ ...orgForm, phone_no: e.target.value })}
                  />

                  <div className="settings-form-actions">
                    <Button type="submit" disabled={saving}>
                      {saving ? "Saving Changes..." : "Save Organization"}
                    </Button>
                  </div>
                </form>
              )}

              {activeTab === "security" && (
                <form className="settings-form" onSubmit={handlePasswordSubmit}>
                  <h2>Change Password</h2>
                  <p className="settings-panel-desc">Ensure your account is secure by using a strong password.</p>

                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.current_password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                    required
                  />

                  <Input
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.new_password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                    required
                  />

                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.confirm_password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                    required
                  />

                  <div className="settings-form-actions">
                    <Button type="submit" disabled={saving}>
                      {saving ? "Updating Password..." : "Update Password"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </section>
    </AppLayout>
  );
}
