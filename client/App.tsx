import { BrowserRouter, Routes, Route } from "react-router-dom";

function TestHome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-civic-blue to-civic-green bg-clip-text text-transparent mb-4">
          CivicWatch
        </h1>
        <p className="text-xl text-muted-foreground">
          Smart Civic Issue Reporting System
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestHome />} />
        <Route path="*" element={<TestHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
