import { Link, useLocation } from "react-router-dom";
import { Bell, Users, MapPin, Trophy, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/", icon: MapPin, label: "Report Issue" },
    { path: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    { path: "/social", icon: Users, label: "Community" },
    { path: "/notifications", icon: Bell, label: "Updates" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-civic-blue to-civic-green flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-civic-blue to-civic-green bg-clip-text text-transparent">
                CivicWatch
              </span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 transition-colors hover:text-foreground/80 ${
                  isActive(item.path) 
                    ? "text-civic-blue" 
                    : "text-foreground/60"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-foreground/60 hover:text-foreground">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-civic-blue to-civic-green flex items-center justify-center">
              <MapPin className="h-4 w-4 text-white" />
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
