import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Bell, Construction } from "lucide-react";

export function Notifications() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center">
        <Card className="border-2 border-dashed border-muted-foreground/25">
          <CardHeader className="pb-6">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <Construction className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl">Notifications Coming Soon</CardTitle>
            <CardDescription className="text-lg">
              We're working on building a comprehensive notification system to keep you updated on your reports and community activities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• Get notified when your reports are reviewed</p>
                <p>• Receive updates when issues in your area are resolved</p>
                <p>• Stay informed about community achievements</p>
                <p>• Get alerts for urgent civic matters</p>
              </div>
              <Button 
                onClick={() => window.history.back()} 
                className="bg-civic-blue hover:bg-civic-blue/90"
              >
                <Bell className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
