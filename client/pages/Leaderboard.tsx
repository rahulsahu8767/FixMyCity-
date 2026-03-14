import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Trophy, Medal, Award, Star, TrendingUp, Users, Calendar, Target } from "lucide-react";
import { getLeaderboard } from "../lib/apiClient";

interface LeaderboardUser {
  id: number;
  name: string;
  avatar?: string;
  points: number;
  rank: number;
  reportsSubmitted: number;
  issuesResolved: number;
  streak: number;
  level: string;
  badges: string[];
}

export function Leaderboard() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "all-time">("weekly");

  // Mock data - replace with API call
  const leaderboardData: LeaderboardUser[] = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "/api/placeholder/40/40",
      points: 2847,
      rank: 1,
      reportsSubmitted: 47,
      issuesResolved: 38,
      streak: 15,
      level: "Civic Champion",
      badges: ["Report Master", "Photo Pro", "Speed Demon"]
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      avatar: "/api/placeholder/40/40",
      points: 2156,
      rank: 2,
      reportsSubmitted: 35,
      issuesResolved: 29,
      streak: 8,
      level: "Community Hero",
      badges: ["Detail Expert", "Consistent Reporter"]
    },
    {
      id: 3,
      name: "Anita Desai",
      avatar: "/api/placeholder/40/40",
      points: 1934,
      rank: 3,
      reportsSubmitted: 32,
      issuesResolved: 25,
      streak: 12,
      level: "Civic Warrior",
      badges: ["Issue Hunter", "Quality Reporter"]
    },
    {
      id: 4,
      name: "Vikram Singh",
      points: 1567,
      rank: 4,
      reportsSubmitted: 28,
      issuesResolved: 22,
      streak: 5,
      level: "Civic Guardian",
      badges: ["First Timer", "Local Hero"]
    },
    {
      id: 5,
      name: "Meera Patel",
      points: 1342,
      rank: 5,
      reportsSubmitted: 24,
      issuesResolved: 19,
      streak: 7,
      level: "Active Citizen",
      badges: ["Newcomer", "Rising Star"]
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getLevelColor = (level: string) => {
    const colors = {
      "Civic Champion": "bg-gradient-to-r from-yellow-500 to-orange-500",
      "Community Hero": "bg-gradient-to-r from-civic-blue to-purple-500",
      "Civic Warrior": "bg-gradient-to-r from-civic-green to-teal-500",
      "Civic Guardian": "bg-gradient-to-r from-purple-500 to-pink-500",
      "Active Citizen": "bg-gradient-to-r from-blue-500 to-cyan-500"
    };
    return colors[level as keyof typeof colors] || "bg-gradient-to-r from-gray-500 to-gray-600";
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
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-civic-blue mr-3" />
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-xs text-muted-foreground">Active Citizens</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-civic-green mr-3" />
              <div>
                <p className="text-2xl font-bold">3,891</p>
                <p className="text-xs text-muted-foreground">Issues Reported</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Trophy className="h-8 w-8 text-civic-orange mr-3" />
              <div>
                <p className="text-2xl font-bold">2,654</p>
                <p className="text-xs text-muted-foreground">Issues Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-civic-purple mr-3" />
              <div>
                <p className="text-2xl font-bold">68%</p>
                <p className="text-xs text-muted-foreground">Resolution Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as any)} className="mb-8">
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="all-time">All Time</TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      {/* Top 3 Podium */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-6">Top Contributors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* 2nd Place */}
          <Card className="md:order-1 border-2 border-gray-300">
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-3">
                <Medal className="h-12 w-12 text-gray-400" />
              </div>
              <Avatar className="h-16 w-16 mx-auto mb-3">
                <AvatarImage src={leaderboardData[1]?.avatar} />
                <AvatarFallback>{leaderboardData[1]?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg">{leaderboardData[1]?.name}</h3>
              <p className="text-2xl font-bold text-gray-400 mb-2">{leaderboardData[1]?.points} pts</p>
              <Badge className={`${getLevelColor(leaderboardData[1]?.level)} text-white`}>
                {leaderboardData[1]?.level}
              </Badge>
            </CardContent>
          </Card>

          {/* 1st Place */}
          <Card className="md:order-2 border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-3">
                <Trophy className="h-16 w-16 text-yellow-500" />
              </div>
              <Avatar className="h-20 w-20 mx-auto mb-3 ring-4 ring-yellow-400">
                <AvatarImage src={leaderboardData[0]?.avatar} />
                <AvatarFallback>{leaderboardData[0]?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-xl">{leaderboardData[0]?.name}</h3>
              <p className="text-3xl font-bold text-yellow-600 mb-2">{leaderboardData[0]?.points} pts</p>
              <Badge className={`${getLevelColor(leaderboardData[0]?.level)} text-white text-sm`}>
                👑 {leaderboardData[0]?.level}
              </Badge>
            </CardContent>
          </Card>

          {/* 3rd Place */}
          <Card className="md:order-3 border-2 border-amber-600">
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-3">
                <Award className="h-12 w-12 text-amber-600" />
              </div>
              <Avatar className="h-16 w-16 mx-auto mb-3">
                <AvatarImage src={leaderboardData[2]?.avatar} />
                <AvatarFallback>{leaderboardData[2]?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg">{leaderboardData[2]?.name}</h3>
              <p className="text-2xl font-bold text-amber-600 mb-2">{leaderboardData[2]?.points} pts</p>
              <Badge className={`${getLevelColor(leaderboardData[2]?.level)} text-white`}>
                {leaderboardData[2]?.level}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Rankings</CardTitle>
          <CardDescription>
            Full leaderboard showing all community contributors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <div
                key={user.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  user.rank <= 3 ? 'bg-gradient-civic-card border-civic-blue/20' : 'bg-muted/30'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(user.rank)}
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getLevelColor(user.level)} text-white text-xs`}>
                        {user.level}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {user.streak} day streak
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-civic-blue">{user.points}</p>
                  <p className="text-sm text-muted-foreground">points</p>
                </div>

                <div className="hidden md:flex flex-col text-center">
                  <p className="text-lg font-semibold">{user.reportsSubmitted}</p>
                  <p className="text-xs text-muted-foreground">Reports</p>
                </div>

                <div className="hidden md:flex flex-col text-center">
                  <p className="text-lg font-semibold text-civic-green">{user.issuesResolved}</p>
                  <p className="text-xs text-muted-foreground">Resolved</p>
                </div>

                <div className="hidden lg:flex flex-wrap gap-1 max-w-32">
                  {user.badges.slice(0, 2).map((badge, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                  {user.badges.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{user.badges.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Point System Explanation */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-civic-orange" />
            How Points Work
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
