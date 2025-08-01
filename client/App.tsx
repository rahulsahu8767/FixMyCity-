import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ReportIssue } from "./pages/ReportIssue";
import { Leaderboard } from "./pages/Leaderboard";
import { Social } from "./pages/Social";
import { Login } from "./pages/Login";
import { Notifications } from "./pages/Notifications";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page without layout */}
        <Route path="/login" element={<Login />} />
        
        {/* All other pages with layout */}
        <Route 
          path="/" 
          element={
            <Layout>
              <ReportIssue />
            </Layout>
          } 
        />
        <Route 
          path="/leaderboard" 
          element={
            <Layout>
              <Leaderboard />
            </Layout>
          } 
        />
        <Route 
          path="/social" 
          element={
            <Layout>
              <Social />
            </Layout>
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <Layout>
              <Notifications />
            </Layout>
          } 
        />
        <Route 
          path="*" 
          element={
            <Layout>
              <NotFound />
            </Layout>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
