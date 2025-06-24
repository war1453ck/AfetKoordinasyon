import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Home, Building, Archive, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ContainerManagement() {
  const { data: containers, isLoading } = useQuery({
    queryKey: ["/api/containers"],
    refetchInterval: 30000,
  });

  const getContainerIcon = (type: string) => {
    switch (type) {
      case "housing":
        return Home;
      case "medical":
        return Package;
      case "storage":
        return Archive;
      case "office":
        return Building;
      default:
        return Package;
    }
  };

  const getContainerTypeLabel = (type: string) => {
    switch (type) {
      case "housing":
        return "Konut";
      case "medical":
        return "Sağlık";
      case "storage":
        return "Depo";
      case "office":
        return "Ofis";
      default:
        return "Diğer";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "occupied":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Müsait";
      case "occupied":
        return "Dolu";
      case "maintenance":
        return "Bakım";
      default:
        return "Bilinmiyor";
    }
  };

  const getOccupancyRate = (container: any) => {
    if (container.capacity === 0) return 0;
    return Math.round((container.currentOccupancy / container.capacity) * 100);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Konteyner Yönetimi</h2>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const availableContainers = containers?.filter(c => c.status === "available").length || 0;
  const totalContainers = containers?.length || 0;

  return (
    <Card>
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Konteyner Yönetimi</h2>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800">
              {availableContainers}/{totalContainers} Müsait
            </Badge>
            <Button variant="outline" size="sm">
              Yeni Ekle
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {containers?.map((container) => {
            const Icon = getContainerIcon(container.type);
            const occupancyRate = getOccupancyRate(container);
            
            return (
              <div
                key={container.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="text-blue-500" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-900">
                          {container.containerNumber}
                        </h4>
                        <Badge className={getStatusColor(container.status)}>
                          {getStatusLabel(container.status)}
                        </Badge>
                        <Badge variant="outline">
                          {getContainerTypeLabel(container.type)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <MapPin size={12} />
                          <span>{container.location}</span>
                        </div>
                        <div>
                          Kapasite: {container.currentOccupancy}/{container.capacity}
                          {container.type === "housing" ? " kişi" : " birim"}
                        </div>
                      </div>
                      
                      {container.facilities && container.facilities.length > 0 && (
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {container.facilities.map((facility, index) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                              >
                                {facility === "electricity" ? "Elektrik" :
                                 facility === "water" ? "Su" :
                                 facility === "heating" ? "Isıtma" :
                                 facility === "internet" ? "İnternet" :
                                 facility === "medical_equipment" ? "Tıbbi Ekipman" :
                                 facility === "security" ? "Güvenlik" : facility}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {container.status === "occupied" && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${occupancyRate}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">
                            %{occupancyRate} dolu
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                      Detay
                    </Button>
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