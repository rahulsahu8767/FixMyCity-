import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function SimpleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4">
        <nav className="flex space-x-4">
          <Link to="/" className="text-civic-blue hover:underline">Report Issue</Link>
          <Link to="/leaderboard" className="text-civic-blue hover:underline">Leaderboard</Link>
          <Link to="/social" className="text-civic-blue hover:underline">Social</Link>
          <Link to="/login" className="text-civic-blue hover:underline">Login</Link>
        </nav>
      </header>
      <main className="p-4">
        {children}
      </main>
    </div>
  );
}

function HomePage() {
  return (
    <div className="text-center py-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-civic-blue to-civic-green bg-clip-text text-transparent mb-4">
        CivicWatch
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Report a Civic Issue
      </p>
      <div className="max-w-md mx-auto p-6 border rounded-lg bg-card">
        <p className="text-muted-foreground">
          Issue reporting form will be loaded here. This is a test to ensure the routing and basic components work.
        </p>
      </div>
    </div>
  );
}

function TestPage({ title }: { title: string }) {
  return (
    <div className="text-center py-8">
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
              <HomePage />
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
          element={<TestPage title="Login" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
