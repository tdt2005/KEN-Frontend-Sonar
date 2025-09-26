
import React, { useState, useEffect } from "react";
import { getUserProfile } from "../api/authApi";

const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab !== "Profile") return;
    setLoading(true);
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setUser(null);
          setLoading(false);
          return;
        }
        const res = await getUserProfile(userId);
        setUser(res);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [activeTab]);

  return (
    <div className="p-6 w-full h-full">
      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6 overflow-x-auto">
        {["Profile", "Account", "Notifications", "Appearance", "Privacy", "Advanced"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Profile Tab */}
      {activeTab === "Profile" && (
        <div className="border rounded-md p-4 space-y-4 bg-white shadow">
          <h2 className="text-lg font-semibold">Profile Information</h2>
          <p className="text-sm text-gray-500">
            Update your personal information and profile settings
          </p>

          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <>
              {/* Avatar */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
                  ) : (
                    <span>{user.full_name ? user.full_name.charAt(0) : user.username?.charAt(0)}</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border rounded-md">Change Avatar</button>
                  <button className="px-3 py-1 border rounded-md">Remove</button>
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm">Full Name</label>
                  <input
                    className="w-full border rounded p-2"
                    type="text"
                    value={user.full_name || ""}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm">Username</label>
                  <input
                    className="w-full border rounded p-2"
                    type="text"
                    value={user.username || ""}
                    readOnly
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm">Email Address</label>
                <input
                  className="w-full border rounded p-2"
                  type="email"
                  value={user.email || ""}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm">Status</label>
                <input
                  className="w-full border rounded p-2"
                  type="text"
                  value={user.status || ""}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm">Created At</label>
                <input
                  className="w-full border rounded p-2"
                  type="text"
                  value={user.created_at ? new Date(user.created_at).toLocaleString() : ""}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm">Updated At</label>
                <input
                  className="w-full border rounded p-2"
                  type="text"
                  value={user.updated_at ? new Date(user.updated_at).toLocaleString() : ""}
                  readOnly
                />
              </div>
            </>
          ) : (
            <div>Không tìm thấy thông tin người dùng.</div>
          )}
        </div>
      )}

      {/* Account Tab */}
      {activeTab === "Account" && (
        <div className="border rounded-md p-4 space-y-6 bg-white shadow">
          <h2 className="text-lg font-semibold">Account Security</h2>
          <p className="text-sm text-gray-500">
            Manage your password and security settings
          </p>

          {/* Password */}
          <div className="flex justify-between items-center border p-3 rounded-md">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-gray-500">Log in by entering your password.</p>
            </div>
            <button className="px-4 py-2 border rounded-md">Update Password</button>
          </div>

          {/* Two Factor Auth */}
          <div className="flex justify-between items-center border p-3 rounded-md">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">
                Enter a verification code from authenticator application.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 border rounded-md">Enable 2FA</button>
              <a href="#" className="text-blue-500 text-sm">
                Set up authentication Application
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;