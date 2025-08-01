export function ReportIssueSimple() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-civic-blue to-civic-green bg-clip-text text-transparent mb-4">
          Report a Civic Issue
        </h1>
        <p className="text-xl text-muted-foreground">
          Help make your community better by reporting issues that need attention
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="border-2 rounded-lg p-6 bg-card">
          <h3 className="text-lg font-semibold mb-4">Issue Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Issue Title</label>
              <input 
                type="text" 
                placeholder="Brief title for the issue"
                className="w-full p-3 border border-input rounded-md bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select className="w-full p-3 border border-input rounded-md bg-background">
                <option>Select issue category</option>
                <option>Road & Infrastructure</option>
                <option>Waste Management</option>
                <option>Water Supply</option>
                <option>Street Lighting</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">DIGIPIN *</label>
              <input 
                type="text" 
                placeholder="Enter your DIGIPIN"
                className="w-full p-3 border border-civic-blue/50 rounded-md bg-background focus:border-civic-blue"
              />
              <p className="text-xs text-muted-foreground mt-1">
                DIGIPIN is mandatory for verification
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea 
                placeholder="Describe the issue in detail..."
                rows={4}
                className="w-full p-3 border border-input rounded-md bg-background resize-none"
              />
            </div>
            
            <button className="w-full bg-gradient-to-r from-civic-blue to-civic-green hover:from-civic-blue/90 hover:to-civic-green/90 text-white font-semibold py-3 px-6 rounded-md">
              Submit Issue Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
