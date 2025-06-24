import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Truck, Users, Activity, TrendingUp } from "lucide-react";

interface DashboardStats {
  activeEmergencies: number;
  activeResources: number;
  totalTeams: number;
  resolvedToday: number;
}

export default function ModernStatsCards() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  const statsCards = [
    {
      title: "Aktif Acil Durumlar",
      value: stats?.activeEmergencies || 0,
      change: "+2 son saatte",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
      trend: "up"
    },
    {
      title: "Hazır Kaynaklar", 
      value: stats?.activeResources || 0,
      change: "6 sahada",
      icon: Truck,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950", 
      trend: "stable"
    },
    {
      title: "Aktif Ekipler",
      value: stats?.totalTeams || 0,
      change: "4 konumda",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      trend: "up"
    },
    {
      title: "Bugün Çözülen",
      value: stats?.resolvedToday || 0,
      change: "+1 son saatte",
      icon: Shield,
      color: "text-emerald-600", 
      bgColor: "bg-emerald-50 dark:bg-emerald-950",
      trend: "up"
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="emergency-card hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    {stat.trend === "up" && (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}