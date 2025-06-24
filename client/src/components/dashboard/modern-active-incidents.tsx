import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Clock, MapPin, Phone, ChevronRight, Filter } from "lucide-react";
import { Incident } from "@shared/schema";

export default function ModernActiveIncidents() {
  const { data: incidents, isLoading } = useQuery<Incident[]>({
    queryKey: ["/api/incidents/active"],
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "status-critical";
      case "high": return "status-high";
      case "medium": return "status-medium";
      case "low": return "status-low";
      default: return "status-monitoring";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical": return "🔴";
      case "high": return "🟠";
      case "medium": return "🟡";
      case "low": return "🟢";
      default: return "🔵";
    }
  };

  const getTimeAgo = (createdAt: string) => {
    const diff = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000 / 60);
    if (diff < 1) return "Az önce";
    if (diff < 60) return `${diff} dk önce`;
    const hours = Math.floor(diff / 60);
    return `${hours} saat önce`;
  };

  if (isLoading) {
    return (
      <Card className="emergency-card h-fit">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
            <div className="h-8 bg-muted rounded w-20 animate-pulse"></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="emergency-card h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Aktif Vakalar
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtrele
            </Button>
            <Badge variant="destructive" className="animate-pulse-slow">
              {incidents?.length || 0}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {incidents?.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <div className="text-muted-foreground text-sm">
              Aktif acil durum bulunmuyor
            </div>
            <div className="text-2xl">🎉</div>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {incidents?.map((incident, index) => (
              <div key={incident.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="group p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getPriorityIcon(incident.priority)}</span>
                        <Badge className={`${getPriorityColor(incident.priority)} text-xs px-2 py-1`}>
                          {incident.priority.toUpperCase()}
                        </Badge>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Clock className="w-3 h-3" />
                          {getTimeAgo(incident.createdAt)}
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {incident.title}
                      </h4>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {incident.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate max-w-32">{incident.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{incident.contactPhone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                  </div>
                </div>
                
                {index < (incidents?.length || 0) - 1 && (
                  <Separator className="my-3" />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}