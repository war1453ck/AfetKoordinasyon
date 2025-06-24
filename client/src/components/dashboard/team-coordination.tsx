import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, Stethoscope, Heart, Shield, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function TeamCoordination() {
  const { data: teams, isLoading } = useQuery({
    queryKey: ["/api/teams"],
    refetchInterval: 30000,
  });

  const getTeamIcon = (type: string) => {
    switch (type) {
      case "fire":
        return Flame;
      case "medical":
        return Stethoscope;
      case "volunteer":
        return Heart;
      case "security":
        return Shield;
      default:
        return Shield;
    }
  };

  const getTeamIconColor = (type: string) => {
    switch (type) {
      case "fire":
        return "text-emergency-500 bg-emergency-100";
      case "medical":
        return "text-blue-500 bg-blue-100";
      case "volunteer":
        return "text-green-500 bg-green-100";
      case "security":
        return "text-gray-500 bg-gray-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emergency-100 text-emergency-800";
      case "available":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Görevde";
      case "available":
        return "Hazır";
      default:
        return "Müdahale";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Ekip Koordinasyonu</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse p-4 border border-gray-200 rounded-lg">
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
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Ekip Koordinasyonu</h2>
          <Button variant="ghost" className="text-sm text-emergency-600 hover:text-emergency-700 font-medium">
            Yeni Görev
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {teams?.map((team) => {
            const Icon = getTeamIcon(team.type);
            const iconColors = getTeamIconColor(team.type);
            
            return (
              <div key={team.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${iconColors} rounded-full flex items-center justify-center`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{team.name}</h4>
                    <p className="text-sm text-gray-600">{team.currentTask}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className={getStatusBadge(team.status)}>
                    {getStatusLabel(team.status)}
                  </Badge>
                  <Button variant="ghost" size="sm" className="p-1 hover:bg-gray-100 rounded">
                    <MessageCircle className="text-gray-400" size={16} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
