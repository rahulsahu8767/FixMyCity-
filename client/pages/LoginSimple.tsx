import { useState } from "react";

export function LoginSimple() {
  const [activeTab, setActiveTab] = useState<"user" | "admin">("user");
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [adminData, setAdminData] = useState({ email: "", password: "", adminCode: "" });

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User login:", userData);
    alert("User login functionality will be connected to your backend API");
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Admin login:", adminData);
    alert("Admin login functionality will be connected to your backend API");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-civic-blue/5 via-background to-civic-green/5 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-civic-blue to-civic-green flex items-center justify-center text-white text-2xl">
              📍
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-civic-blue to-civic-green bg-clip-text text-transparent">
            CivicWatch
          </h1>
          <p className="text-muted-foreground mt-2">
            Join the community making cities better
          </p>
        </div>

        <div className="border-2 rounded-lg bg-card">
          <div className="p-6 text-center border-b">
            <h2 className="text-xl font-semibold">Welcome Back</h2>
            <p className="text-muted-foreground">
              Choose your login type to continue
            </p>
          </div>
          
          <div className="p-6">
            {/* Tab Selector */}
            <div className="flex mb-6 bg-muted p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("user")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors ${
                  activeTab === "user" 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>👤</span>
                Citizen
              </button>
              <button
                onClick={() => setActiveTab("admin")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors ${
                  activeTab === "admin" 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>🛡️</span>
                Admin
              </button>
            </div>

            {activeTab === "user" ? (
              <form onSubmit={handleUserLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={userData.email}
                    onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border border-input rounded-md bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={userData.password}
                    onChange={(e) => setUserData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full p-3 border border-input rounded-md bg-background"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-civic-blue hover:bg-civic-blue/90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                >
                  Sign In as Citizen
                </button>
              </form>
            ) : (
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Admin Email</label>
                  <input
                    type="email"
                    placeholder="admin@civic.gov"
                    value={adminData.email}
                    onChange={(e) => setAdminData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border border-input rounded-md bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="Enter admin password"
                    value={adminData.password}
                    onChange={(e) => setAdminData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full p-3 border border-input rounded-md bg-background"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Admin Access Code</label>
                  <input
                    type="text"
                    placeholder="Enter admin access code"
                    value={adminData.adminCode}
                    onChange={(e) => setAdminData(prev => ({ ...prev, adminCode: e.target.value }))}
                    className="w-full p-3 border border-input rounded-md bg-background"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-civic-green hover:bg-civic-green/90 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                >
                  Sign In as Admin
                </button>
              </form>
            )}

            {activeTab === "user" && (
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <button className="text-civic-blue hover:underline">
                    Sign up
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
