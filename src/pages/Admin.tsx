import React from "react";
import Dashboard from "./Dashboard";

const Admin: React.FC = () => {
  return (
    <div>
      <div style={{ background: '#d04437', color: 'white', padding: 16, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
        ADMIN MODE: Đây là trang quản trị
      </div>
      <Dashboard />
    </div>
  );
};

export default Admin;
