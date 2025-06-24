import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Flame, Truck, Shield, Plane } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ResourceManagement() {
  const { data: resourceStats, isLoading } = useQuery({
    queryKey: ["/api/resources/stats"],
    refetchInterval: 30000,
  });

  const resources = [
    {
      name: "İtfaiye Araçları",
      icon: Flame,
      color: "red",
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
      barColor: "bg-red-500",
      stats: resourceStats?.fire || { active: 0, total: 0 },
    },
    {
      name: "Ambulanslar",
      icon: Truck,
      color: "blue",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      barColor: "bg-blue-500",
      stats: resourceStats?.ambulance || { active: 0, total: 0 },
    },
    {
      name: "Polis Araçları",
      icon: Shield,
      color: "indigo",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-500",
      barColor: "bg-indigo-500",
      stats: resourceStats?.police || { active: 0, total: 0 },
    },
    {
      name: "Hava Araçları",
      icon: Plane,
      color: "green",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      barColor: "bg-green-500",
      stats: resourceStats?.air || { active: 0, total: 0 },
    },
  ];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Kaynak Durumu</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse p-4 bg-gray-100 rounded-lg">
                <div className="h-16 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Kaynak Durumu</h2>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            const percentage = resource.stats.total > 0 
              ? Math.round((resource.stats.active / resource.stats.total) * 100) 
              : 0;
            
            return (
              <div key={index} className={`flex items-center justify-between p-4 ${resource.bgColor} rounded-lg`}>
                <div className="flex items-center space-x-3">
                  <Icon className={`${resource.iconColor} text-xl`} size={24} />
                  <div>
                    <h4 className="font-medium text-gray-900">{resource.name}</h4>
                    <p className="text-sm text-gray-600">
                      {resource.stats.active}/{resource.stats.total} Aktif
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${resource.iconColor}`}>
                    {percentage}%
                  </span>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`${resource.barColor} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
