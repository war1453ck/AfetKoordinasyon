import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, MapPin, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

export default function EarthquakeMonitor() {
  const { data: earthquakes, isLoading } = useQuery({
    queryKey: ["/api/earthquakes/recent/24"],
    refetchInterval: 60000, // Refresh every minute for real-time earthquake data
  });

  const getMagnitudeColor = (magnitude: string) => {
    const mag = parseFloat(magnitude);
    if (mag >= 5.0) return "bg-emergency-100 text-emergency-800 border-emergency-500";
    if (mag >= 4.0) return "bg-orange-100 text-orange-800 border-orange-500";
    if (mag >= 3.0) return "bg-yellow-100 text-yellow-800 border-yellow-500";
    return "bg-blue-100 text-blue-800 border-blue-500";
  };

  const getMagnitudeRisk = (magnitude: string) => {
    const mag = parseFloat(magnitude);
    if (mag >= 5.0) return "Yüksek Risk";
    if (mag >= 4.0) return "Orta Risk";
    if (mag >= 3.0) return "Düşük Risk";
    return "Minimal";
  };

  const getRiskIcon = (magnitude: string) => {
    const mag = parseFloat(magnitude);
    if (mag >= 4.0) {
      return <AlertTriangle className="text-emergency-500 pulse-red" size={16} />;
    }
    return <AlertTriangle className="text-gray-400" size={16} />;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Deprem Takip Sistemi</h2>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Deprem Takip Sistemi</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">AFAD Canlı</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {earthquakes?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <AlertTriangle size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Son 24 saatte deprem kaydı bulunmuyor</p>
            </div>
          ) : (
            earthquakes?.map((earthquake) => (
              <div
                key={earthquake.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getRiskIcon(earthquake.magnitude)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-900">
                          Büyüklük {earthquake.magnitude}
                        </h4>
                        <Badge className={getMagnitudeColor(earthquake.magnitude)}>
                          {getMagnitudeRisk(earthquake.magnitude)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <MapPin size={12} />
                          <span>{earthquake.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock size={12} />
                          <span>
                            {formatDistanceToNow(new Date(earthquake.timestamp), { 
                              addSuffix: true, 
                              locale: tr 
                            })}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                        <span>Derinlik: {earthquake.depth} km</span>
                        <span>Kaynak: {earthquake.source}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {earthquake.magnitude}
                    </div>
                    <div className="text-xs text-gray-500">Richter</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Son güncelleme: {new Date().toLocaleTimeString('tr-TR')}</span>
            <span>Veri kaynağı: AFAD</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}