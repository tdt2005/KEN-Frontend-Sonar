import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useAuth } from "../auth/useKeycloak";
import { logoutApi } from "../api/authApi";

// Import your sub-pages
import UserProfilePage from "./UserProfilePage"; // ✅ your profile page
import ProjectsPage from "./Projects"; // ✅ your profile page


const Dashboard: React.FC = () => {
  const { logout, username } = useAuth(); // Logout SSO từ Keycloak
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email") || username || "user";

  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  // NEW: track selected content
  const [activePage, setActivePage] = useState("Dashboard");

  // Nếu không có token thì quay lại trang login
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = async () => {
    const typeLogin = localStorage.getItem("Type_login");

    if (typeLogin === "SSO") {
      logout(); // Keycloak tự redirect về login page
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        await logoutApi(); // gửi token tới backend
      }
      console.log("đăng xuất thành công");
      localStorage.clear(); // Xóa toàn bộ dữ liệu local login
      navigate("/login");
    }
  };

  // Menu Sidebar
  const menuItems = [
    { name: "Dashboard", icon: "📊" },
    { name: "Projects", icon: "📁" },
    { name: "Filters", icon: "🔎" },
    { name: "Reports", icon: "📊" },
    { name: "Teams", icon: "👥" },
    { name: "Profile", icon: "🙍" },
    { name: "Settings", icon: "⚙️" },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const projects = ["E-commerce Platform", "Mobile App", "Analytics Dashboard"];

  // ✅ Function to render content dynamically
  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Total Issues</h3>
              <p className="card-value">
                4 <span className="sub-text">(+2 from last week)</span>
              </p>
            </div>
            <div className="dashboard-card">
              <h3>Completed</h3>
              <p className="card-value">
                1 <span className="sub-text">(25% completion rate)</span>
              </p>
              <span className="status-icon">✔️</span>
            </div>
            <div className="dashboard-card">
              <h3>In Progress</h3>
              <p className="card-value">
                1 <span className="sub-text">(Active development)</span>
              </p>
              <span className="status-icon">⏳</span>
            </div>
            <div className="dashboard-card high-priority">
              <h3>High Priority</h3>
              <p className="card-value">
                2 <span className="sub-text">(Needs attention)</span>
              </p>
              <span className="status-icon">⚠️</span>
            </div>
            <div className="dashboard-card progress-card">
              <h3>Project Progress</h3>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "25%" }}></div>
              </div>
              <p className="completion-rate">Completion Rate: 25%</p>
              <div className="progress-status">
                <span>To Do: 1</span>
                <span>In Progress: 1</span>
                <span>Review: 1</span>
                <span>Done: 1</span>
              </div>
            </div>
            <div className="dashboard-card">
              <h3>Issue Types</h3>
              <div className="issue-type">
                <span className="issue-dot" style={{ backgroundColor: "red" }}></span>{" "}
                Bugs: 1
              </div>
            </div>
            <div className="dashboard-card">
              <h3>Team Members</h3>
              <div className="team-member">
                <img
                  src="https://placehold.co/30x30"
                  alt="Member"
                  className="member-icon"
                />
                <span>John Doe</span>
              </div>
            </div>
          </div>
        );

      case "Profile":
        return <UserProfilePage />;
      
      case "Projects":
        return <ProjectsPage />;
        
      case "Settings":
        return <div className="p-6">⚙️ Settings Page (coming soon)</div>;

      default:
        return <div className="p-6">🚧 {activePage} page under construction</div>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="app-title">KEN</h2>

        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ul className="nav-menu">
          {filteredItems.map((item) => (
            <li
              key={item.name}
              className={`nav-item ${activePage === item.name ? "active" : ""}`}
              onClick={() => setActivePage(item.name)} // ✅ change page instead of navigate
            >
              <span className="logo">{item.icon}</span> {item.name}
            </li>
          ))}
        </ul>

        {/* Danh sách Projects */}
        <div className="project-list">
          <h3
            className="project-title"
            onClick={() => setIsProjectsOpen(!isProjectsOpen)}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Projects
            <span style={{ fontSize: "12px" }}>
              {isProjectsOpen ? "▼" : "▶"}
            </span>
          </h3>
          {isProjectsOpen && (
            <ul>
              {projects.map((project) => (
                <li key={project} className="project-item">
                  {project}
                </li>
              ))}
            </ul>
          )}
          <button className="create-project">
            <span className="logo">➕</span> Create project
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="header">
          <div className="header-left">
            ECP - Main e-commerce platform development
          </div>
          <div className="header-right">
            <span className="icon">?</span>
            <span className="icon">🔔</span>

            {/* User Profile */}
            <div
              className="user-section"
              onClick={() => setShowProfile(!showProfile)}
            >
              <img
                src="https://placehold.co/30x30"
                alt="User"
                className="user-icon"
              />
              {showProfile && (
                <div className="profile-dropdown">
                  <p>
                    <strong>Email:</strong> {email}
                  </p>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Page Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;