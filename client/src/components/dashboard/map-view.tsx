import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function MapView() {
  const { data: incidents } = useQuery({
    queryKey: ["/api/incidents/active"],
    refetchInterval: 30000,
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-emergency-500 pulse-red";
      case "high":
        return "bg-alert-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-400";
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

  const getIncidentTypeLabel = (type: string) => {
    switch (type) {
      case "fire":
        return "Yangın";
      case "accident":
        return "Trafik Kazası";
      case "flood":
        return "Su Baskını";
      case "power_outage":
        return "Güç Kesintisi";
      default:
        return "Bilinmiyor";
    }
  };

  return (
    <Card>
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Olay Haritası</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">Tümü</Button>
            <Button variant="outline" size="sm" className="bg-emergency-100 text-emergency-600">
              Kritik
            </Button>
            <Button variant="outline" size="sm">Orta</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-96 bg-gray-100">
          {/* Map background - simulating aerial view */}
          <div 
            className="w-full h-full bg-cover bg-center rounded-b-xl"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400')`
            }}
          />
          
          {/* Incident markers */}
          <div className="absolute inset-0">
            {incidents?.map((incident, index) => (
              <div
                key={incident.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  index === 0 ? "top-1/4 left-1/3" :
                  index === 1 ? "top-2/3 left-1/2" :
                  index === 2 ? "top-1/2 left-3/4" :
                  "top-1/3 left-1/4"
                }`}
              >
                <div className="relative group">
                  <div className={`w-4 h-4 rounded-full ${getPriorityColor(incident.priority)}`}></div>
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {getIncidentTypeLabel(incident.type)} - {getPriorityLabel(incident.priority)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Map controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button size="sm" variant="outline" className="w-8 h-8 p-0">
              <Plus size={16} />
            </Button>
            <Button size="sm" variant="outline" className="w-8 h-8 p-0">
              <Minus size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
