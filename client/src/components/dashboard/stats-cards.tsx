import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Truck, Users, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function StatsCards() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Aktif Acil Durumlar",
      value: stats?.activeEmergencies || 0,
      change: "+3 son 1 saatte",
      icon: AlertTriangle,
      color: "emergency",
      bgColor: "bg-emergency-100",
      textColor: "text-emergency-500",
      borderColor: "border-emergency-500",
    },
    {
      title: "Aktif Kaynaklar",
      value: stats?.activeResources || 0,
      change: `${stats?.resourceUtilization || 0}% kullanımda`,
      icon: Truck,
      color: "blue",
      bgColor: "bg-blue-100",
      textColor: "text-blue-500",
      borderColor: "border-blue-500",
    },
    {
      title: "Görevli Personel",
      value: stats?.activePersonnel || 0,
      change: "23 gönüllü",
      icon: Users,
      color: "green",
      bgColor: "bg-green-100",
      textColor: "text-green-500",
      borderColor: "border-green-500",
    },
    {
      title: "Ortalama Müdahale",
      value: stats?.averageResponseTime || "8.5dk",
      change: "-2.1dk önceki aya göre",
      icon: Clock,
      color: "alert",
      bgColor: "bg-alert-100",
      textColor: "text-alert-500",
      borderColor: "border-alert-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className={`border-l-4 ${card.borderColor}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className={`text-3xl font-bold ${card.textColor}`}>
                    {card.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`${card.textColor} text-xl`} size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm text-green-600">{card.change}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
