import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Megaphone, 
  Send, 
  Users, 
  Truck, 
  Radio,
  Zap,
  Phone,
  Target
} from "lucide-react";
import { useState } from "react";

export default function ModernQuickActions() {
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  const quickActions = [
    {
      id: "general-alarm",
      title: "Genel Alarm",
      description: "Tüm birimlere genel alarm ver",
      icon: AlertTriangle,
      color: "bg-red-600 hover:bg-red-700",
      textColor: "text-white",
      urgent: true
    },
    {
      id: "dispatch-resource",
      title: "Kaynak Sevk",
      description: "En yakın kaynağı sahaya gönder",
      icon: Truck,
      color: "bg-blue-600 hover:bg-blue-700",
      textColor: "text-white",
      urgent: false
    },
    {
      id: "call-volunteers",
      title: "Gönüllüler",
      description: "Gönüllü ekipleri çağır",
      icon: Users,
      color: "bg-green-600 hover:bg-green-700",
      textColor: "text-white",
      urgent: false
    },
    {
      id: "broadcast",
      title: "Duyuru Gönder",
      description: "Halka duyuru yap",
      icon: Megaphone,
      color: "bg-orange-600 hover:bg-orange-700",
      textColor: "text-white",
      urgent: false
    },
    {
      id: "request-support",
      title: "Destek Talep",
      description: "Üst birimlerden destek iste",
      icon: Radio,
      color: "bg-purple-600 hover:bg-purple-700",
      textColor: "text-white",
      urgent: false
    },
    {
      id: "generate-report",
      title: "Rapor Oluştur",
      description: "Anlık durum raporu hazırla",
      icon: Send,
      color: "bg-slate-600 hover:bg-slate-700",
      textColor: "text-white",
      urgent: false
    }
  ];

  const handleQuickAction = (actionId: string, actionTitle: string) => {
    setActionInProgress(actionId);
    console.log(`${actionTitle} tetiklendi`);
    
    // Simulate action completion
    setTimeout(() => {
      setActionInProgress(null);
    }, 2000);
  };

  return (
    <Card className="emergency-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            Hızlı Eylemler
          </CardTitle>
          <Badge variant="outline" className="gap-1">
            <Target className="w-3 h-3" />
            6 eylem
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            const isInProgress = actionInProgress === action.id;
            
            return (
              <Button
                key={action.id}
                onClick={() => handleQuickAction(action.id, action.title)}
                disabled={isInProgress}
                className={`${action.color} ${action.textColor} p-4 h-auto flex flex-col items-start gap-2 relative overflow-hidden group animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {action.urgent && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <div className="absolute inset-0 w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
                
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-sm">
                      {isInProgress ? "İşleniyor..." : action.title}
                    </div>
                    <div className="text-xs opacity-80">
                      {action.description}
                    </div>
                  </div>
                </div>
                
                {isInProgress && (
                  <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              </Button>
            );
          })}
        </div>
        
        {/* Emergency Contact */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Acil İletişim</span>
            </div>
            <Badge variant="outline" className="gap-1 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              7/24 Aktif
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Koordinasyon Merkezi: +90 212 555 0112
          </div>
        </div>
      </CardContent>
    </Card>
  );
}