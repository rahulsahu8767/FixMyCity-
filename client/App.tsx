import { useState } from "react";

// Simple Navigation Component
function Navigation({ currentPage, setCurrentPage }: { currentPage: string; setCurrentPage: (page: string) => void }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-6 flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-sm">
            📍
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            CivicWatch
          </span>
        </div>
        
        <nav className="flex space-x-6">
          <button
            onClick={() => setCurrentPage("report")}
            className={`px-3 py-2 rounded-md transition-colors ${
              currentPage === "report" 
                ? "bg-blue-500 text-white" 
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            📍 Report Issue
          </button>
          <button
            onClick={() => setCurrentPage("leaderboard")}
            className={`px-3 py-2 rounded-md transition-colors ${
              currentPage === "leaderboard" 
                ? "bg-blue-500 text-white" 
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            🏆 Leaderboard
          </button>
          <button
            onClick={() => setCurrentPage("social")}
            className={`px-3 py-2 rounded-md transition-colors ${
              currentPage === "social" 
                ? "bg-blue-500 text-white" 
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            👥 Community
          </button>
          <button
            onClick={() => setCurrentPage("login")}
            className={`px-3 py-2 rounded-md transition-colors ${
              currentPage === "login" 
                ? "bg-blue-500 text-white" 
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            👤 Login
          </button>
        </nav>
      </div>
    </header>
  );
}

// Report Issue Page
function ReportIssuePage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    digiPin: "",
    location: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.digiPin) {
      alert("DIGIPIN is mandatory!");
      return;
    }
    
    setIsSubmitting(true);
    console.log("Submitting report:", formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  const generateDescription = () => {
    const descriptions = {
      "Road & Infrastructure": "Pothole observed on main road causing traffic disruption. The damaged asphalt surface poses safety risks for vehicles and pedestrians.",
      "Waste Management": "Overflowing garbage bin in residential area creating unsanitary conditions. Waste spillage attracting pests and causing foul odor.",
      "Street Lighting": "Non-functional street light creating safety hazard during nighttime. Poor visibility affecting pedestrian and vehicle safety.",
      "Water Supply": "Water leakage detected in the pipeline causing wastage and potential structural damage.",
      "default": "Issue requiring civic attention and proper resolution from relevant municipal authorities."
    };
    
    const generated = descriptions[formData.category as keyof typeof descriptions] || descriptions.default;
    setFormData(prev => ({ ...prev, description: generated }));
  };

  if (submitted) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="border-2 border-green-200 bg-green-50 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">Issue Reported Successfully!</h2>
          <p className="text-gray-600 mb-4">Your civic issue has been submitted and will be reviewed by the authorities.</p>
          <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded">
            Report ID: CR-{Date.now().toString().slice(-6)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
          Report a Civic Issue
        </h1>
        <p className="text-xl text-gray-600">
          Help make your community better by reporting issues that need attention
        </p>
      </div>

      <div className="max-w-2xl mx-auto border rounded-lg p-6 bg-white shadow-sm">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <span className="mr-2">📋</span>
          Issue Details
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Issue Title *</label>
              <input
                type="text"
                placeholder="Brief title for the issue"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select category</option>
                <option value="Road & Infrastructure">Road & Infrastructure</option>
                <option value="Waste Management">Waste Management</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Street Lighting">Street Lighting</option>
                <option value="Public Safety">Public Safety</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                placeholder="Street address or landmark"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">DIGIPIN * (Mandatory)</label>
              <input
                type="text"
                placeholder="Enter your DIGIPIN"
                value={formData.digiPin}
                onChange={(e) => setFormData(prev => ({ ...prev, digiPin: e.target.value }))}
                className="w-full p-3 border-2 border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p className="text-xs text-blue-600 mt-1">DIGIPIN is mandatory for verification</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Description *</label>
              <button
                type="button"
                onClick={generateDescription}
                disabled={!formData.category}
                className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 disabled:opacity-50"
              >
                ✨ AI Generate
              </button>
            </div>
            <textarea
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              required
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="mr-2">📍</span>
              <span className="font-medium text-blue-800">Important:</span>
              <span className="text-blue-700 ml-1">DIGIPIN is mandatory for all submissions to verify authenticity.</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-md transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Submitting Report..." : "Submit Issue Report"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Leaderboard Page
function LeaderboardPage() {
  const leaderboard = [
    { rank: 1, name: "Priya Sharma", points: 2847, reports: 47, resolved: 38, level: "Civic Champion" },
    { rank: 2, name: "Rajesh Kumar", points: 2156, reports: 35, resolved: 29, level: "Community Hero" },
    { rank: 3, name: "Anita Desai", points: 1934, reports: 32, resolved: 25, level: "Civic Warrior" },
    { rank: 4, name: "Vikram Singh", points: 1567, reports: 28, resolved: 22, level: "Civic Guardian" },
    { rank: 5, name: "Meera Patel", points: 1342, reports: 24, resolved: 19, level: "Active Citizen" }
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
          Community Leaderboard
        </h1>
        <p className="text-xl text-gray-600">Celebrating our top civic contributors</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border rounded-lg p-6 text-center shadow-sm">
          <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
          <div className="text-sm text-gray-600">Active Citizens</div>
        </div>
        <div className="bg-white border rounded-lg p-6 text-center shadow-sm">
          <div className="text-3xl font-bold text-green-600 mb-2">3,891</div>
          <div className="text-sm text-gray-600">Issues Reported</div>
        </div>
        <div className="bg-white border rounded-lg p-6 text-center shadow-sm">
          <div className="text-3xl font-bold text-orange-500 mb-2">2,654</div>
          <div className="text-sm text-gray-600">Issues Resolved</div>
        </div>
        <div className="bg-white border rounded-lg p-6 text-center shadow-sm">
          <div className="text-3xl font-bold text-purple-600 mb-2">68%</div>
          <div className="text-sm text-gray-600">Resolution Rate</div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-6">🏆 Top Contributors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* 2nd Place */}
          <div className="md:order-1 border-2 border-gray-300 rounded-lg p-6 text-center bg-white">
            <div className="text-5xl mb-3">🥈</div>
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-lg font-bold text-blue-600">RK</span>
            </div>
            <h3 className="font-bold text-lg">{leaderboard[1].name}</h3>
            <p className="text-2xl font-bold text-gray-500 mb-2">{leaderboard[1].points} pts</p>
            <div className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
              {leaderboard[1].level}
            </div>
          </div>

          {/* 1st Place */}
          <div className="md:order-2 border-4 border-yellow-400 rounded-lg p-6 text-center bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="text-6xl mb-3">🏆</div>
            <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center ring-4 ring-yellow-400">
              <span className="text-xl font-bold text-blue-600">PS</span>
            </div>
            <h3 className="font-bold text-xl">{leaderboard[0].name}</h3>
            <p className="text-3xl font-bold text-yellow-600 mb-2">{leaderboard[0].points} pts</p>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm px-3 py-1 rounded-full">
              👑 {leaderboard[0].level}
            </div>
          </div>

          {/* 3rd Place */}
          <div className="md:order-3 border-2 border-orange-400 rounded-lg p-6 text-center bg-white">
            <div className="text-5xl mb-3">🥉</div>
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-lg font-bold text-green-600">AD</span>
            </div>
            <h3 className="font-bold text-lg">{leaderboard[2].name}</h3>
            <p className="text-2xl font-bold text-orange-500 mb-2">{leaderboard[2].points} pts</p>
            <div className="bg-green-500 text-white text-sm px-3 py-1 rounded-full">
              {leaderboard[2].level}
            </div>
          </div>
        </div>
      </div>

      {/* Full Rankings */}
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Complete Rankings</h3>
        </div>
        <div className="p-6">
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center justify-between p-4 rounded-lg mb-4 ${
                user.rank <= 3 ? 'bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 text-center text-2xl">
                  {user.rank === 1 ? "🏆" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : `#${user.rank}`}
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-blue-600">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold">{user.name}</h4>
                  <div className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {user.level}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{user.points}</p>
                <p className="text-sm text-gray-500">points</p>
              </div>

              <div className="hidden md:flex flex-col text-center">
                <p className="text-lg font-semibold">{user.reports}</p>
                <p className="text-xs text-gray-500">Reports</p>
              </div>

              <div className="hidden md:flex flex-col text-center">
                <p className="text-lg font-semibold text-green-600">{user.resolved}</p>
                <p className="text-xs text-gray-500">Resolved</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Points System */}
      <div className="mt-8 bg-white border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">⭐ How Points Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold text-blue-600">+50</p>
            <p className="text-sm">Report Submitted</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold text-green-600">+100</p>
            <p className="text-sm">Issue Resolved</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold text-orange-500">+25</p>
            <p className="text-sm">Quality Photos</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold text-purple-600">+10</p>
            <p className="text-sm">Daily Streak</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Social/Community Page
function SocialPage() {
  const reports = [
    {
      id: "CR-001234",
      title: "Pothole on Main Street causing traffic issues",
      description: "Large pothole near intersection creating safety hazards.",
      category: "Road & Infrastructure",
      location: "Main Street & Park Avenue",
      reportedBy: "Priya Sharma",
      reportedAt: "2024-01-15",
      status: "resolved",
      beforeImage: "🕳️ Large pothole visible",
      afterImage: "✅ Road repaired and resurfaced",
      likes: 24,
      comments: 8,
      resolution: "Road surface repaired and resurfaced. Thank you for reporting!"
    },
    {
      id: "CR-001235",
      title: "Overflowing garbage bin in residential area",
      description: "Waste scattered around creating unsanitary conditions.",
      category: "Waste Management", 
      location: "Residential Complex, Block A",
      reportedBy: "Rajesh Kumar",
      reportedAt: "2024-01-16",
      status: "in-progress",
      beforeImage: "🗑️ Overflowing waste bin",
      likes: 15,
      comments: 5
    },
    {
      id: "CR-001236",
      title: "Street light not working - safety concern",
      description: "Dark area at night posing safety risks for pedestrians.",
      category: "Street Lighting",
      location: "Elm Street, Pole #47",
      reportedBy: "Anita Desai",
      reportedAt: "2024-01-17",
      status: "reported",
      beforeImage: "💡 Dark street at night",
      likes: 18,
      comments: 12
    }
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
          Community Feed
        </h1>
        <p className="text-xl text-gray-600">See the impact of civic reporting in your community</p>
      </div>

      <div className="space-y-6">
        {reports.map((report) => (
          <div key={report.id} className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-blue-600">
                      {report.reportedBy.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{report.reportedBy}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>📅 {report.reportedAt}</span>
                      <span>📍 {report.location}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  report.status === "resolved" ? "bg-green-100 text-green-800" :
                  report.status === "in-progress" ? "bg-orange-100 text-orange-800" :
                  "bg-blue-100 text-blue-800"
                }`}>
                  {report.status === "resolved" ? "✅ RESOLVED" :
                   report.status === "in-progress" ? "⏳ IN PROGRESS" :
                   "🔔 REPORTED"}
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                <p className="text-gray-600 mb-3">{report.description}</p>
                <div className="text-xs px-2 py-1 bg-gray-100 rounded inline-block">
                  {report.category}
                </div>
              </div>

              {/* Before/After */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium mb-2 text-red-600">Before</p>
                  <div className="w-full h-32 bg-gray-100 rounded-lg border flex items-center justify-center text-2xl">
                    {report.beforeImage}
                  </div>
                </div>
                {report.afterImage ? (
                  <div>
                    <p className="text-sm font-medium mb-2 text-green-600">After</p>
                    <div className="w-full h-32 bg-green-50 rounded-lg border flex items-center justify-center text-2xl">
                      {report.afterImage}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl mb-1">👀</div>
                      <p className="text-sm text-gray-500">Awaiting resolution</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Resolution */}
              {report.resolution && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-green-700 font-medium">✅ Resolved by Municipal Corporation</span>
                  </div>
                  <p className="text-sm text-green-700">{report.resolution}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                    <span>❤️</span>
                    <span>{report.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                    <span>💬</span>
                    <span>{report.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
                    <span>📤</span>
                    <span>Share</span>
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  ID: {report.id}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Login Page
function LoginPage() {
  const [loginType, setLoginType] = useState<"user" | "admin">("user");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    adminCode: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${loginType} login:`, formData);
    alert(`${loginType} login functionality will be connected to your backend API`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-2xl">
              📍
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            CivicWatch
          </h1>
          <p className="text-gray-600 mt-2">Join the community making cities better</p>
        </div>

        <div className="border rounded-lg bg-white shadow-sm">
          <div className="p-6 text-center border-b">
            <h2 className="text-xl font-semibold">Welcome Back</h2>
            <p className="text-gray-600">Choose your login type to continue</p>
          </div>
          
          <div className="p-6">
            {/* Login Type Selector */}
            <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setLoginType("user")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors ${
                  loginType === "user" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span>👤</span>
                Citizen
              </button>
              <button
                onClick={() => setLoginType("admin")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors ${
                  loginType === "admin" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span>🛡️</span>
                Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {loginType === "admin" ? "Admin Email" : "Email"}
                </label>
                <input
                  type="email"
                  placeholder={loginType === "admin" ? "admin@civic.gov" : "your@email.com"}
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  placeholder={loginType === "admin" ? "Enter admin password" : "Enter your password"}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {loginType === "admin" && (
                <div>
                  <label className="block text-sm font-medium mb-2">Admin Access Code</label>
                  <input
                    type="text"
                    placeholder="Enter admin access code"
                    value={formData.adminCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, adminCode: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              )}

              <button 
                type="submit" 
                className={`w-full text-white font-semibold py-3 px-6 rounded-md transition-colors ${
                  loginType === "admin" 
                    ? "bg-green-500 hover:bg-green-600" 
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Sign In as {loginType === "admin" ? "Admin" : "Citizen"}
              </button>
            </form>

            {loginType === "user" && (
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button className="text-blue-600 hover:underline">Sign up</button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState("report");

  const renderPage = () => {
    switch (currentPage) {
      case "report":
        return <ReportIssuePage />;
      case "leaderboard":
        return <LeaderboardPage />;
      case "social":
        return <SocialPage />;
      case "login":
        return <LoginPage />;
      default:
        return <ReportIssuePage />;
    }
  };

  if (currentPage === "login") {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>{renderPage()}</main>
      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-sm mr-2">
              📍
            </div>
            <span className="font-medium">Built for responsible citizens, by the community.</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2024 CivicWatch. Making communities better, one report at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
