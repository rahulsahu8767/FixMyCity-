import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Timer,
  Eye,
  ThumbsUp,
  MoreHorizontal
} from "lucide-react";

interface CivicReport {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  reportedBy: {
    name: string;
    avatar?: string;
  };
  reportedAt: string;
  status: "reported" | "in-progress" | "resolved" | "rejected";
  beforeImage: string;
  afterImage?: string;
  likes: number;
  comments: number;
  shares: number;
  resolution?: {
    resolvedAt: string;
    resolvedBy: string;
    notes: string;
  };
}

export function Social() {
  const [activeTab, setActiveTab] = useState<"all" | "resolved" | "in-progress">("all");
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  // Mock data - replace with API call
  const reports: CivicReport[] = [
    {
      id: "CR-001234",
      title: "Pothole on Main Street causing traffic issues",
      description: "Large pothole near the intersection of Main Street and Park Avenue. Cars are swerving to avoid it, creating potential safety hazards.",
      category: "Road & Infrastructure",
      location: "Main Street & Park Avenue",
      reportedBy: {
        name: "Priya Sharma",
        avatar: "/api/placeholder/40/40"
      },
      reportedAt: "2024-01-15T10:30:00Z",
      status: "resolved",
      beforeImage: "/api/placeholder/400/300",
      afterImage: "/api/placeholder/400/300",
      likes: 24,
      comments: 8,
      shares: 3,
      resolution: {
        resolvedAt: "2024-01-18T14:20:00Z",
        resolvedBy: "Municipal Corporation",
        notes: "Road surface repaired and resurfaced. Thank you for reporting!"
      }
    },
    {
      id: "CR-001235",
      title: "Overflowing garbage bin in residential area",
      description: "The garbage bin near Building A has been overflowing for several days. Waste is scattered around creating unsanitary conditions.",
      category: "Waste Management", 
      location: "Residential Complex, Block A",
      reportedBy: {
        name: "Rajesh Kumar",
        avatar: "/api/placeholder/40/40"
      },
      reportedAt: "2024-01-16T08:15:00Z",
      status: "in-progress",
      beforeImage: "/api/placeholder/400/300",
      likes: 15,
      comments: 5,
      shares: 2
    },
    {
      id: "CR-001236",
      title: "Street light not working - safety concern",
      description: "Street light pole #47 has been non-functional for over a week. The area becomes very dark at night, posing safety risks for pedestrians.",
      category: "Street Lighting",
      location: "Elm Street, Pole #47",
      reportedBy: {
        name: "Anita Desai"
      },
      reportedAt: "2024-01-17T19:45:00Z",
      status: "reported",
      beforeImage: "/api/placeholder/400/300",
      likes: 18,
      comments: 12,
      shares: 6
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-civic-green text-white";
      case "in-progress":
        return "bg-civic-orange text-white";
      case "reported":
        return "bg-civic-blue text-white";
      case "rejected":
        return "bg-destructive text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      case "in-progress":
        return <Timer className="h-4 w-4" />;
      case "reported":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleLike = (reportId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reportId)) {
        newSet.delete(reportId);
      } else {
        newSet.add(reportId);
      }
      return newSet;
    });
  };

  const filteredReports = reports.filter(report => {
    if (activeTab === "all") return true;
    if (activeTab === "resolved") return report.status === "resolved";
    if (activeTab === "in-progress") return report.status === "in-progress";
    return true;
  });

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-civic-blue to-civic-green bg-clip-text text-transparent mb-4">
          Community Feed
        </h1>
        <p className="text-xl text-muted-foreground">
          See the impact of civic reporting in your community
        </p>
      </div>

      {/* Filters */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="mb-8">
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      {/* Reports Feed */}
      <div className="space-y-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={report.reportedBy.avatar} />
                    <AvatarFallback>
                      {report.reportedBy.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{report.reportedBy.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(report.reportedAt)}</span>
                      <MapPin className="h-3 w-3" />
                      <span>{report.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(report.status)}>
                    {getStatusIcon(report.status)}
                    <span className="ml-1 capitalize">{report.status.replace('-', ' ')}</span>
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Issue Details */}
              <div>
                <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                <p className="text-muted-foreground mb-3">{report.description}</p>
                <Badge variant="outline" className="text-xs">
                  {report.category}
                </Badge>
              </div>

              {/* Before/After Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2 text-destructive">Before</p>
                  <img
                    src={report.beforeImage}
                    alt="Before image"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                </div>
                {report.afterImage && (
                  <div>
                    <p className="text-sm font-medium mb-2 text-civic-green">After</p>
                    <img
                      src={report.afterImage}
                      alt="After image"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                )}
                {!report.afterImage && report.status !== "resolved" && (
                  <div className="flex items-center justify-center h-48 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                    <div className="text-center">
                      <Eye className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Awaiting resolution
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Resolution Notes */}
              {report.resolution && (
                <div className="bg-civic-green/10 border border-civic-green/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-civic-green" />
                    <span className="font-medium text-civic-green">Resolved</span>
                    <span className="text-sm text-muted-foreground">
                      on {formatDate(report.resolution.resolvedAt)} by {report.resolution.resolvedBy}
                    </span>
                  </div>
                  <p className="text-sm">{report.resolution.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(report.id)}
                    className={`space-x-2 ${likedPosts.has(report.id) ? 'text-red-500' : ''}`}
                  >
                    <Heart
                      className={`h-4 w-4 ${likedPosts.has(report.id) ? 'fill-current' : ''}`}
                    />
                    <span>{report.likes + (likedPosts.has(report.id) ? 1 : 0)}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>{report.comments}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="space-x-2">
                    <Share2 className="h-4 w-4" />
                    <span>{report.shares}</span>
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Report ID: {report.id}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Load More Reports
        </Button>
      </div>
    </div>
  );
}
