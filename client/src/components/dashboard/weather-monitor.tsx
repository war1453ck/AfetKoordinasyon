import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, Eye, Wind, Thermometer } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function WeatherMonitor() {
  const { data: weatherData, isLoading } = useQuery({
    queryKey: ["/api/weather"],
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="text-yellow-500" size={20} />;
      case "cloudy":
        return <Cloud className="text-gray-500" size={20} />;
      case "rainy":
        return <CloudRain className="text-blue-500" size={20} />;
      default:
        return <Cloud className="text-gray-400" size={20} />;
    }
  };

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case "sunny":
        return "Güneşli";
      case "cloudy":
        return "Bulutlu";
      case "rainy":
        return "Yağmurlu";
      default:
        return "Bilinmiyor";
    }
  };

  const getWeatherAlert = (condition: string, windSpeed: string) => {
    const wind = parseFloat(windSpeed);
    if (condition === "rainy" || wind > 20) {
      return { level: "warning", message: "Hava koşulları dikkat gerektiriyor" };
    }
    if (wind > 15) {
      return { level: "info", message: "Rüzgar hızı yüksek" };
    }
    return null;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Hava Durumu</h2>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
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
          <h2 className="text-lg font-semibold text-gray-900">Hava Durumu</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Anlık</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {weatherData?.map((weather) => {
            const alert = getWeatherAlert(weather.condition, weather.windSpeed);
            
            return (
              <div
                key={weather.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getWeatherIcon(weather.condition)}
                    <div>
                      <h4 className="font-medium text-gray-900">{weather.location}</h4>
                      <span className="text-sm text-gray-600">
                        {getConditionLabel(weather.condition)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {weather.temperature}°C
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Wind size={14} />
                    <span>Rüzgar: {weather.windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Thermometer size={14} />
                    <span>Nem: {weather.humidity}%</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Eye size={14} />
                    <span>Görüş: {weather.visibility} km</span>
                  </div>
                  <div className="text-gray-600">
                    Basınç: {weather.pressure} hPa
                  </div>
                </div>

                {alert && (
                  <div className="mt-3">
                    <Badge 
                      className={
                        alert.level === "warning" 
                          ? "bg-orange-100 text-orange-800" 
                          : "bg-blue-100 text-blue-800"
                      }
                    >
                      {alert.message}
                    </Badge>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            Son güncelleme: {new Date().toLocaleTimeString('tr-TR')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}