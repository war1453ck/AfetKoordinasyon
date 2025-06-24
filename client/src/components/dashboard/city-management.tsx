import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Home, AlertTriangle, Shield } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function CityManagement() {
  const { data: cityData, isLoading } = useQuery({
    queryKey: ["/api/city-management"],
    refetchInterval: 60000,
  });

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
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

  const getRiskLabel = (riskLevel: string) => {
    switch (riskLevel) {
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

  const getShelterUtilization = (city: any) => {
    if (city.shelterCapacity === 0) return 0;
    return Math.round((city.currentSheltered / city.shelterCapacity) * 100);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Kent Yönetimi</h2>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Kent Yönetimi</h2>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {cityData?.map((city) => {
            const shelterUtilization = getShelterUtilization(city);
            
            return (
              <div
                key={city.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{city.district}</h4>
                    <p className="text-sm text-gray-600">
                      Nüfus: {city.population?.toLocaleString()} kişi
                    </p>
                  </div>
                  <Badge className={getRiskColor(city.riskLevel)}>
                    {getRiskLabel(city.riskLevel)} Risk
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="text-blue-500" size={16} />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {city.emergencyPersonnel}
                      </div>
                      <div className="text-xs text-gray-600">Personel</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Home className="text-green-500" size={16} />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {city.shelterCapacity}
                      </div>
                      <div className="text-xs text-gray-600">Barınak</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="text-purple-500" size={16} />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {city.currentSheltered}
                      </div>
                      <div className="text-xs text-gray-600">Barınıyor</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="text-orange-500" size={16} />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {city.availableResources?.length || 0}
                      </div>
                      <div className="text-xs text-gray-600">Kaynak</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Barınak Kullanımı</span>
                      <span className="font-medium">{shelterUtilization}%</span>
                    </div>
                    <Progress value={shelterUtilization} className="h-2" />
                  </div>

                  {city.availableResources && city.availableResources.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Mevcut Kaynaklar:</div>
                      <div className="flex flex-wrap gap-1">
                        {city.availableResources.map((resource, index) => (
                          <span
                            key={index}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                          >
                            {resource === "fire_truck" ? "İtfaiye" :
                             resource === "ambulance" ? "Ambulans" :
                             resource === "police_car" ? "Polis" :
                             resource === "helicopter" ? "Helikopter" : resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    Son güncelleme: {new Date(city.lastUpdate).toLocaleString('tr-TR')}
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