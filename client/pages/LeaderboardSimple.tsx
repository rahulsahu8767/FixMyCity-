export function LeaderboardSimple() {
  const leaderboardData = [
    { rank: 1, name: "Priya Sharma", points: 2847, reports: 47, resolved: 38, level: "Civic Champion" },
    { rank: 2, name: "Rajesh Kumar", points: 2156, reports: 35, resolved: 29, level: "Community Hero" },
    { rank: 3, name: "Anita Desai", points: 1934, reports: 32, resolved: 25, level: "Civic Warrior" },
    { rank: 4, name: "Vikram Singh", points: 1567, reports: 28, resolved: 22, level: "Civic Guardian" },
    { rank: 5, name: "Meera Patel", points: 1342, reports: 24, resolved: 19, level: "Active Citizen" }
  ];

  const getRankDisplay = (rank: number) => {
    if (rank === 1) return "🏆";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-civic-blue to-civic-green bg-clip-text text-transparent mb-4">
          Community Leaderboard
        </h1>
        <p className="text-xl text-muted-foreground">
          Celebrating our top civic contributors who make communities better
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-civic-blue mb-2">1,247</div>
          <div className="text-sm text-muted-foreground">Active Citizens</div>
        </div>
        <div className="bg-card border rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-civic-green mb-2">3,891</div>
          <div className="text-sm text-muted-foreground">Issues Reported</div>
        </div>
        <div className="bg-card border rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-civic-orange mb-2">2,654</div>
          <div className="text-sm text-muted-foreground">Issues Resolved</div>
        </div>
        <div className="bg-card border rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-civic-purple mb-2">68%</div>
          <div className="text-sm text-muted-foreground">Resolution Rate</div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-6">Top Contributors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* 2nd Place */}
          <div className="md:order-1 border-2 border-gray-300 rounded-lg p-6 text-center bg-card">
            <div className="text-4xl mb-3">🥈</div>
            <div className="w-16 h-16 bg-civic-blue/10 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-xl font-bold">{leaderboardData[1].name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <h3 className="font-bold text-lg">{leaderboardData[1].name}</h3>
            <p className="text-2xl font-bold text-gray-400 mb-2">{leaderboardData[1].points} pts</p>
            <div className="bg-civic-blue text-white text-sm px-3 py-1 rounded-full">
              {leaderboardData[1].level}
            </div>
          </div>

          {/* 1st Place */}
          <div className="md:order-2 border-4 border-yellow-400 rounded-lg p-6 text-center bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="text-5xl mb-3">🏆</div>
            <div className="w-20 h-20 bg-civic-blue/10 rounded-full mx-auto mb-3 flex items-center justify-center ring-4 ring-yellow-400">
              <span className="text-xl font-bold">{leaderboardData[0].name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <h3 className="font-bold text-xl">{leaderboardData[0].name}</h3>
            <p className="text-3xl font-bold text-yellow-600 mb-2">{leaderboardData[0].points} pts</p>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm px-3 py-1 rounded-full">
              👑 {leaderboardData[0].level}
            </div>
          </div>

          {/* 3rd Place */}
          <div className="md:order-3 border-2 border-amber-600 rounded-lg p-6 text-center bg-card">
            <div className="text-4xl mb-3">🥉</div>
            <div className="w-16 h-16 bg-civic-green/10 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-xl font-bold">{leaderboardData[2].name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <h3 className="font-bold text-lg">{leaderboardData[2].name}</h3>
            <p className="text-2xl font-bold text-amber-600 mb-2">{leaderboardData[2].points} pts</p>
            <div className="bg-civic-green text-white text-sm px-3 py-1 rounded-full">
              {leaderboardData[2].level}
            </div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-card border rounded-lg">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Complete Rankings</h3>
          <p className="text-muted-foreground">Full leaderboard showing all community contributors</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  user.rank <= 3 ? 'bg-gradient-to-r from-civic-blue/5 to-civic-green/5 border-civic-blue/20' : 'bg-muted/30'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 text-center text-xl">
                    {getRankDisplay(user.rank)}
                  </div>
                  <div className="w-12 h-12 bg-civic-blue/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold">{user.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <div className="text-sm text-civic-blue bg-civic-blue/10 px-2 py-1 rounded">
                      {user.level}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-civic-blue">{user.points}</p>
                  <p className="text-sm text-muted-foreground">points</p>
                </div>

                <div className="hidden md:flex flex-col text-center">
                  <p className="text-lg font-semibold">{user.reports}</p>
                  <p className="text-xs text-muted-foreground">Reports</p>
                </div>

                <div className="hidden md:flex flex-col text-center">
                  <p className="text-lg font-semibold text-civic-green">{user.resolved}</p>
                  <p className="text-xs text-muted-foreground">Resolved</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Point System */}
      <div className="mt-8 bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">⭐ How Points Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold text-civic-blue">+50</p>
            <p className="text-sm">Report Submitted</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold text-civic-green">+100</p>
            <p className="text-sm">Issue Resolved</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold text-civic-orange">+25</p>
            <p className="text-sm">Quality Photos</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <p className="text-2xl font-bold text-civic-purple">+10</p>
            <p className="text-sm">Daily Streak</p>
          </div>
        </div>
      </div>
    </div>
  );
}
