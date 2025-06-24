import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map, MapPin, Layers, Maximize2, Zap, Navigation } from "lucide-react";
import { Incident } from "@shared/schema";

export default function ModernMapView() {
  const { data: incidents } = useQuery<Incident[]>({
    queryKey: ["/api/incidents/active"],
  });

  const mapRegions = [
    { name: "Beşiktaş", incidents: 1, status: "critical", color: "bg-red-500" },
    { name: "Bakırköy", incidents: 1, status: "high", color: "bg-orange-500" },
    { name: "Fatih", incidents: 1, status: "medium", color: "bg-yellow-500" },
    { name: "Kadıköy", incidents: 0, status: "safe", color: "bg-green-500" },
    { name: "Şişli", incidents: 0, status: "safe", color: "bg-green-500" },
    { name: "Üsküdar", incidents: 0, status: "safe", color: "bg-green-500" },
  ];

  return (
    <Card className="emergency-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Map className="w-5 h-5 text-blue-600" />
            İstanbul Acil Durum Haritası
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Layers className="w-4 h-4" />
              Katmanlar
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Navigation className="w-4 h-4" />
              Navigasyon
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Canvas */}
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 min-h-[400px] overflow-hidden">
          {/* Map Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Istanbul Districts */}
          <div className="relative z-10 grid grid-cols-3 gap-4 h-full">
            {mapRegions.map((region, index) => (
              <div 
                key={region.name}
                className="group relative flex flex-col items-center justify-center p-4 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary transition-all duration-300 cursor-pointer"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Region Indicator */}
                <div className={`w-4 h-4 ${region.color} rounded-full mb-2 animate-pulse-slow`}></div>
                
                {/* Region Name */}
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {region.name}
                </h4>
                
                {/* Incident Count */}
                {region.incidents > 0 ? (
                  <Badge variant="destructive" className="text-xs">
                    {region.incidents} vaka
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs border-green-300 text-green-600">
                    Güvenli
                  </Badge>
                )}

                {/* Active Incident Indicators */}
                {region.incidents > 0 && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-red-600 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 glass-card p-3 space-y-2">
            <h5 className="text-xs font-semibold text-foreground">Durum Göstergeleri</h5>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-muted-foreground">Kritik</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-muted-foreground">Yüksek</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-muted-foreground">Orta</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">Güvenli</span>
              </div>
            </div>
          </div>

          {/* Live Updates Indicator */}
          <div className="absolute top-4 right-4 glass-card p-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-foreground">Canlı</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="text-lg font-bold text-red-600">3</div>
            <div className="text-xs text-muted-foreground">Aktif Vaka</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="text-lg font-bold text-blue-600">6</div>
            <div className="text-xs text-muted-foreground">Sahada Kaynak</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="text-lg font-bold text-green-600">8</div>
            <div className="text-xs text-muted-foreground">Güvenli Bölge</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}