import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/leads", label: "Leads" },
  { to: "/tasks", label: "Tasks" },
  { to: "/settings", label: "Settings" },
];

const leadsSubItems = [
  { to: "/leads", label: "All Leads" },
  { to: "/leads/create", label: "+ Create Lead" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLeadsSection = pathname.startsWith("/leads");

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar">
      <h1 className="sidebar-brand">LeadOrbit</h1>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <div key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === "/leads"}
              className={({ isActive }) =>
                `sidebar-link${isActive || (item.to === "/leads" && isLeadsSection) ? " sidebar-link-active" : ""}`
              }
            >
              {item.label}
            </NavLink>
            {item.to === "/leads" && isLeadsSection && (
              <div className="sidebar-subnav">
                {leadsSubItems.map((sub) => (
                  <NavLink
                    key={sub.to}
                    to={sub.to}
                    end
                    className={({ isActive }) =>
                      `sidebar-sublink${isActive ? " sidebar-sublink-active" : ""}`
                    }
                  >
                    {sub.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <button type="button" className="sidebar-logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
