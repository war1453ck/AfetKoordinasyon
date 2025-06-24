import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Truck, MapPin, Clock, Filter, Plus, AlertCircle } from "lucide-react";
import { Resource } from "@shared/schema";

interface ResourceStats {
  fire: { total: number; active: number; };
  ambulance: { total: number; active: number; };
  police: { total: number; active: number; };
  helicopter: { total: number; active: number; };
}

export default function ModernResourceManagement() {
  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  const { data: stats } = useQuery<ResourceStats>({
    queryKey: ["/api/resources/stats"],
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "fire_truck": return "🚒";
      case "ambulance": return "🚑";
      case "police_car": return "🚓";
      case "helicopter": return "🚁";
      default: return "🚛";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "status-low";
      case "busy": return "status-high";
      case "maintenance": return "status-medium";
      default: return "status-monitoring";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Hazır";
      case "busy": return "Görevde";
      case "maintenance": return "Bakımda";
      default: return "Beklemede";
    }
  };

  if (isLoading) {
    return (
      <Card className="emergency-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="h-6 bg-muted rounded w-40 animate-pulse"></div>
            <div className="h-8 bg-muted rounded w-24 animate-pulse"></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded animate-pulse"></div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="emergency-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            Kaynak Yönetimi
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtrele
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Ekle
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Resource Type Overview */}
        <div className="grid grid-cols-2 gap-3">
          {stats && Object.entries(stats).map(([type, data]) => {
            const usage = (data.active / data.total) * 100;
            return (
              <div key={type} className="p-3 rounded-lg bg-muted/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">
                    {type === "fire" ? "İtfaiye" : 
                     type === "ambulance" ? "Ambulans" :
                     type === "police" ? "Polis" : "Helikopter"}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {data.active}/{data.total}
                  </Badge>
                </div>
                <Progress value={usage} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  %{Math.round(usage)} kullanımda
                </div>
              </div>
            );
          })}
        </div>

        {/* Resource List */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {resources?.map((resource, index) => (
            <div 
              key={resource.id} 
              className="group p-3 rounded-lg border bg-card hover:shadow-md transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm text-foreground">
                      {resource.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{resource.currentLocation}</span>
                      {resource.assignedIncident && (
                        <>
                          <span>•</span>
                          <AlertCircle className="w-3 h-3 text-orange-500" />
                          <span>Görevde</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(resource.status)} text-xs px-2 py-1`}>
                    {getStatusText(resource.status)}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {resource.capacity} kişi
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button size="sm" variant="outline" className="text-xs h-7">
                  Konum
                </Button>
                {resource.status === "active" && (
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    Sevk Et
                  </Button>
                )}
                <Button size="sm" variant="outline" className="text-xs h-7">
                  İletişim
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="pt-3 border-t bg-muted/30 rounded-lg p-3">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">
                {resources?.filter(r => r.status === "active").length || 0}
              </div>
              <div className="text-xs text-muted-foreground">Hazır</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">
                {resources?.filter(r => r.assignedIncident).length || 0}
              </div>
              <div className="text-xs text-muted-foreground">Görevde</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">
                {resources?.length || 0}
              </div>
              <div className="text-xs text-muted-foreground">Toplam</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}