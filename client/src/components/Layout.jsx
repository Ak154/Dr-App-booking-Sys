import { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const userMenu = [
    { name: "Home", path: "/", icon: "ri-home-line" },
    { name: "Appointments", path: "/appointments", icon: "ri-file-list-line" },
    { name: "Apply Doctor", path: "/apply-doctor", icon: "ri-hospital-line" },
  ];

  const doctorMenu = [
    { name: "Home", path: "/", icon: "ri-home-line" },
    { name: "Appointments", path: "/doctors/appointments", icon: "ri-file-list-line" },
    { name: "Profile", path: `/doctors/profile/${user?._id}`, icon: "ri-user-line" },
  ];

  const adminMenu = [
    { name: "Home", path: "/", icon: "ri-home-line" },
    { name: "Users", path: "/admin/userslist", icon: "ri-user-line" },
    { name: "Doctors", path: "/admin/doctorslist", icon: "ri-user-star-line" },
    { name: "Profile", path: "/profile", icon: "ri-user-line" },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

  return (
    <div className="main">
      <div className="layout">
        {/* Sidebar */}
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
          {/* Sidebar Toggle Button Inside Sidebar */}
          <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>

          {/* Only show logo & role when expanded */}
          {!collapsed && (
            <div className="sidebar-header">
              <h1 className="logo">GH</h1>
              <h1 className="role">{role}</h1>
            </div>
          )}

          {/* Menu Items */}
          <div className="menu">
            {menuToBeRendered.map((menu, idx) => {
              const isActive = location.pathname === menu.path;
              return (
                <div key={idx} className={`menu-item ${isActive ? "active-menu-item" : ""}`}>
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}

            {/* Logout */}
            <div className="menu-item" onClick={() => { localStorage.clear(); navigate('/login'); }}>
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="content">
          <div className="header">
            {/* No toggle button in header anymore */}
            <div className="d-flex align-items-center px-4">
              <Badge count={user?.unseenNotifications.length} onClick={() => navigate('/notifications')}>
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>
              <Link className="anchor mx-3" to="/profile">{user?.name}</Link>
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
