import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

export default function ActiveIncidents() {
  const { data: incidents, isLoading } = useQuery({
    queryKey: ["/api/incidents/active"],
    refetchInterval: 10000, // Refresh every 10 seconds for real-time feel
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-emergency-100 text-emergency-800 border-emergency-500";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-500";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-500";
      case "low":
        return "bg-green-100 text-green-800 border-green-500";
      default:
        return "bg-gray-100 text-gray-800 border-gray-500";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "critical":
        return "Kritik";
      case "high":
        return "Yüksek";
      case "medium":
        return "Orta";
      case "low":
        return "Düşük";
      default:
        return "Bilinmiyor";
    }
  };

  const getIncidentBgColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-emergency-50 border-l-emergency-500";
      case "high":
        return "bg-orange-50 border-l-orange-500";
      case "medium":
        return "bg-yellow-50 border-l-yellow-500";
      case "low":
        return "bg-blue-50 border-l-blue-500";
      default:
        return "bg-gray-50 border-l-gray-300";
    }
  };

  const getDotColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-emergency-500 pulse-red";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-400";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Aktif Olaylar</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse p-3 bg-gray-100 rounded-lg">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
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
        <h2 className="text-lg font-semibold text-gray-900">Aktif Olaylar</h2>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {incidents?.map((incident) => (
            <div
              key={incident.id}
              className={`flex items-start space-x-3 p-3 rounded-lg border-l-4 ${getIncidentBgColor(incident.priority)}`}
            >
              <div className={`w-2 h-2 rounded-full mt-2 ${getDotColor(incident.priority)}`}></div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900">{incident.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{incident.location}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getPriorityColor(incident.priority)}`}
                  >
                    {getPriorityLabel(incident.priority)}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(incident.createdAt), { 
                      addSuffix: true, 
                      locale: tr 
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full text-sm text-emergency-600 hover:text-emergency-700 font-medium">
            Tüm Olayları Görüntüle
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
