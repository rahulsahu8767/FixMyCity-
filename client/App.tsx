import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ReportIssueSimple } from "./pages/ReportIssueSimple";
import { LeaderboardSimple } from "./pages/LeaderboardSimple";
import { SocialSimple } from "./pages/SocialSimple";
import { LoginSimple } from "./pages/LoginSimple";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-civic-blue to-civic-green flex items-center justify-center text-white">
                📍
              </div>
              <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-civic-blue to-civic-green bg-clip-text text-transparent">
                CivicWatch
              </span>
            </Link>
          </div>
          
          <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className="flex items-center space-x-2 transition-colors hover:text-foreground/80 text-civic-blue"
            >
              <span>📍</span>
              <span className="hidden sm:inline">Report Issue</span>
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center space-x-2 transition-colors hover:text-foreground/80 text-foreground/60 hover:text-civic-blue"
            >
              <span>🏆</span>
              <span className="hidden sm:inline">Leaderboard</span>
            </Link>
            <Link
              to="/social"
              className="flex items-center space-x-2 transition-colors hover:text-foreground/80 text-foreground/60 hover:text-civic-blue"
            >
              <span>👥</span>
              <span className="hidden sm:inline">Community</span>
            </Link>
            <Link
              to="/notifications"
              className="flex items-center space-x-2 transition-colors hover:text-foreground/80 text-foreground/60 hover:text-civic-blue"
            >
              <span>🔔</span>
              <span className="hidden sm:inline">Updates</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              to="/login"
              className="flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors"
            >
              <span>👤</span>
              <span className="hidden sm:inline">Login</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-muted/50">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 px-4 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-civic-blue to-civic-green flex items-center justify-center text-white text-sm">
              📍
            </div>
            <p className="text-center text-sm leading-loose md:text-left">
              Built for responsible citizens, by the community.
            </p>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © 2024 CivicWatch. Making communities better, one report at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}

function NotificationsPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center">
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
          <div className="text-6xl mb-4">🔔</div>
          <h2 className="text-2xl font-bold mb-4">Notifications Coming Soon</h2>
          <p className="text-lg text-muted-foreground mb-6">
            We're working on building a comprehensive notification system to keep you updated on your reports and community activities.
          </p>
          <div className="text-sm text-muted-foreground space-y-2 mb-6">
            <p>• Get notified when your reports are reviewed</p>
            <p>• Receive updates when issues in your area are resolved</p>
            <p>• Stay informed about community achievements</p>
            <p>• Get alerts for urgent civic matters</p>
          </div>
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 bg-civic-blue hover:bg-civic-blue/90 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <span>🔔</span>
            <span>Go Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page without layout */}
        <Route path="/login" element={<LoginSimple />} />
        
        {/* All other pages with layout */}
        <Route 
          path="/" 
          element={
            <Layout>
              <ReportIssueSimple />
            </Layout>
          } 
        />
        <Route 
          path="/leaderboard" 
          element={
            <Layout>
              <LeaderboardSimple />
            </Layout>
          } 
        />
        <Route 
          path="/social" 
          element={
            <Layout>
              <SocialSimple />
            </Layout>
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <Layout>
              <NotificationsPage />
            </Layout>
          } 
        />
        <Route 
          path="*" 
          element={
            <Layout>
              <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-3xl font-bold text-civic-blue mb-4">Page Not Found</h1>
                <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
                <Link 
                  to="/"
                  className="bg-civic-blue hover:bg-civic-blue/90 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Go Home
                </Link>
              </div>
            </Layout>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
