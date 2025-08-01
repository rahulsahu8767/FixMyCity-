import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ReportIssueSimple } from "./pages/ReportIssueSimple";
import { Login } from "./pages/Login";

function SimpleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4">
        <div className="container mx-auto">
          <nav className="flex space-x-4">
            <Link to="/" className="text-civic-blue hover:underline font-medium">Report Issue</Link>
            <Link to="/leaderboard" className="text-civic-blue hover:underline font-medium">Leaderboard</Link>
            <Link to="/social" className="text-civic-blue hover:underline font-medium">Social</Link>
            <Link to="/login" className="text-civic-blue hover:underline font-medium">Login</Link>
          </nav>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}

function TestPage({ title }: { title: string }) {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold text-civic-blue mb-4">{title}</h1>
      <p className="text-muted-foreground">This page is under construction.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <SimpleLayout>
              <ReportIssueSimple />
            </SimpleLayout>
          } 
        />
        <Route 
          path="/leaderboard" 
          element={
            <SimpleLayout>
              <TestPage title="Leaderboard" />
            </SimpleLayout>
          } 
        />
        <Route 
          path="/social" 
          element={
            <SimpleLayout>
              <TestPage title="Community Feed" />
            </SimpleLayout>
          } 
        />
        <Route 
          path="/login" 
          element={<Login />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
