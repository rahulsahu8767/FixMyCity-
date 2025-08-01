export function SocialSimple() {
  const reports = [
    {
      id: "CR-001234",
      title: "Pothole on Main Street causing traffic issues",
      description: "Large pothole near the intersection of Main Street and Park Avenue. Cars are swerving to avoid it, creating potential safety hazards.",
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
      description: "The garbage bin near Building A has been overflowing for several days. Waste is scattered around creating unsanitary conditions.",
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
      description: "Street light pole #47 has been non-functional for over a week. The area becomes very dark at night, posing safety risks for pedestrians.",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-civic-green text-white";
      case "in-progress":
        return "bg-civic-orange text-white";
      case "reported":
        return "bg-civic-blue text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return "✅";
      case "in-progress":
        return "⏳";
      case "reported":
        return "🔔";
      default:
        return "⏰";
    }
  };

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

      {/* Filter Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-muted p-1 rounded-lg flex">
          <button className="px-4 py-2 rounded-md bg-background text-foreground font-medium">All Reports</button>
          <button className="px-4 py-2 rounded-md text-muted-foreground hover:text-foreground">In Progress</button>
          <button className="px-4 py-2 rounded-md text-muted-foreground hover:text-foreground">Resolved</button>
        </div>
      </div>

      {/* Reports Feed */}
      <div className="space-y-6">
        {reports.map((report) => (
          <div key={report.id} className="border-2 rounded-lg bg-card hover:shadow-lg transition-shadow">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-civic-blue/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold">{report.reportedBy.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{report.reportedBy}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>📅 {report.reportedAt}</span>
                      <span>📍 {report.location}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                  {getStatusIcon(report.status)} {report.status.replace('-', ' ').toUpperCase()}
                </div>
              </div>

              {/* Issue Details */}
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                <p className="text-muted-foreground mb-3">{report.description}</p>
                <div className="text-xs px-2 py-1 bg-muted rounded">
                  {report.category}
                </div>
              </div>

              {/* Before/After Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium mb-2 text-destructive">Before</p>
                  <div className="w-full h-48 bg-muted rounded-lg border flex items-center justify-center text-4xl">
                    {report.beforeImage}
                  </div>
                </div>
                {report.afterImage ? (
                  <div>
                    <p className="text-sm font-medium mb-2 text-civic-green">After</p>
                    <div className="w-full h-48 bg-civic-green/10 rounded-lg border flex items-center justify-center text-4xl">
                      {report.afterImage}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl mb-2">👀</div>
                      <p className="text-sm text-muted-foreground">
                        Awaiting resolution
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Resolution Notes */}
              {report.resolution && (
                <div className="bg-civic-green/10 border border-civic-green/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-civic-green">✅ Resolved</span>
                    <span className="text-sm text-muted-foreground">
                      by Municipal Corporation
                    </span>
                  </div>
                  <p className="text-sm">{report.resolution}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-red-500">
                    <span>❤️</span>
                    <span>{report.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-civic-blue">
                    <span>💬</span>
                    <span>{report.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-civic-green">
                    <span>📤</span>
                    <span>Share</span>
                  </button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Report ID: {report.id}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="px-6 py-2 border border-civic-blue text-civic-blue rounded-lg hover:bg-civic-blue hover:text-white transition-colors">
          Load More Reports
        </button>
      </div>
    </div>
  );
}
