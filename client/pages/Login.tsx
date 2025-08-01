import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { MapPin, Shield, User } from "lucide-react";

export function Login() {
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  
  const [adminLoginData, setAdminLoginData] = useState({
    email: "",
    password: "",
    adminCode: "",
  });

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User login:", userLoginData);
    // TODO: Implement user login API call
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Admin login:", adminLoginData);
    // TODO: Implement admin login API call
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-civic-blue/5 via-background to-civic-green/5 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-civic-blue to-civic-green flex items-center justify-center">
              <MapPin className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-civic-blue to-civic-green bg-clip-text text-transparent">
            CivicWatch
          </h1>
          <p className="text-muted-foreground mt-2">
            Join the community making cities better
          </p>
        </div>

        <Card className="border-2">
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Choose your login type to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="user" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Citizen
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user">
                <form onSubmit={handleUserLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="your@email.com"
                      value={userLoginData.email}
                      onChange={(e) => setUserLoginData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-password">Password</Label>
                    <Input
                      id="user-password"
                      type="password"
                      placeholder="Enter your password"
                      value={userLoginData.password}
                      onChange={(e) => setUserLoginData(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-civic-blue hover:bg-civic-blue/90">
                    Sign In as Citizen
                  </Button>
                </form>
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-civic-blue hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@civic.gov"
                      value={adminLoginData.email}
                      onChange={(e) => setAdminLoginData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Enter admin password"
                      value={adminLoginData.password}
                      onChange={(e) => setAdminLoginData(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-code">Admin Access Code</Label>
                    <Input
                      id="admin-code"
                      type="text"
                      placeholder="Enter admin access code"
                      value={adminLoginData.adminCode}
                      onChange={(e) => setAdminLoginData(prev => ({ ...prev, adminCode: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-civic-green hover:bg-civic-green/90">
                    Sign In as Admin
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
