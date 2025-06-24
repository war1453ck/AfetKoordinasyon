import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  MessageSquare, 
  AlertTriangle, 
  Users, 
  Send, 
  Clock, 
  MapPin,
  Plus,
  Edit,
  Trash2,
  Volume2,
  Bell
} from "lucide-react";

interface EmergencyAlert {
  id: number;
  title: string;
  message: string;
  alertType: string;
  targetDistricts: string[];
  severity: string;
  sentBy: number;
  sentAt: string;
  expiresAt?: string;
  isActive: boolean;
}

export default function EmergencyAlertsManagement() {
  const [newAlert, setNewAlert] = useState({
    title: "",
    message: "",
    alertType: "general",
    targetDistricts: [] as string[],
    severity: "medium"
  });
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const districts = [
    "Beşiktaş", "Kadıköy", "Bakırköy", "Şişli", "Üsküdar", "Fatih", "Beyoğlu"
  ];

  // Mock data
  const mockAlerts: EmergencyAlert[] = [
    {
      id: 1,
      title: "Bölgesel Tahliye Uyarısı",
      message: "Beşiktaş bölgesinde yangın nedeniyle acil tahliye gerekiyor. En yakın güvenli alana gidiniz.",
      alertType: "evacuation",
      targetDistricts: ["Beşiktaş", "Ortaköy"],
      severity: "critical",
      sentBy: 1,
      sentAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      isActive: true
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case "evacuation": return AlertTriangle;
      case "weather": return "🌤️";
      case "earthquake": return "🌍";
      case "fire": return "🔥";
      default: return Bell;
    }
  };

  const handleCreateAlert = () => {
    console.log("Creating alert:", newAlert);
    setShowCreateDialog(false);
    setNewAlert({
      title: "",
      message: "",
      alertType: "general",
      targetDistricts: [],
      severity: "medium"
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) return `${diffMins} dakika önce`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} saat önce`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} gün önce`;
  };

  return (
    <div className="space-y-6">
      <Card className="emergency-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-600" />
            Acil Durum Uyarı Sistemi
          </CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <Users className="w-3 h-3" />
                {mockAlerts.length} aktif uyarı
              </Badge>
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="w-3 h-3" />
                {mockAlerts.filter(a => a.severity === "critical").length} kritik
              </Badge>
            </div>
            
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Yeni Uyarı Oluştur
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Acil Durum Uyarısı Oluştur</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Başlık</label>
                    <Input 
                      value={newAlert.title}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Uyarı başlığı..."
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Mesaj</label>
                    <Textarea 
                      value={newAlert.message}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Detaylı uyarı mesajı..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Uyarı Türü</label>
                      <Select value={newAlert.alertType} onValueChange={(value) => setNewAlert(prev => ({ ...prev, alertType: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">Genel</SelectItem>
                          <SelectItem value="evacuation">Tahliye</SelectItem>
                          <SelectItem value="weather">Hava Durumu</SelectItem>
                          <SelectItem value="earthquake">Deprem</SelectItem>
                          <SelectItem value="fire">Yangın</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Önem Derecesi</label>
                      <Select value={newAlert.severity} onValueChange={(value) => setNewAlert(prev => ({ ...prev, severity: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Düşük</SelectItem>
                          <SelectItem value="medium">Orta</SelectItem>
                          <SelectItem value="high">Yüksek</SelectItem>
                          <SelectItem value="critical">Kritik</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Hedef Bölgeler</label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {districts.map(district => (
                        <label key={district} className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            checked={newAlert.targetDistricts.includes(district)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewAlert(prev => ({ 
                                  ...prev, 
                                  targetDistricts: [...prev.targetDistricts, district] 
                                }));
                              } else {
                                setNewAlert(prev => ({ 
                                  ...prev, 
                                  targetDistricts: prev.targetDistricts.filter(d => d !== district) 
                                }));
                              }
                            }}
                          />
                          <span className="text-sm">{district}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleCreateAlert} className="flex-1 gap-2">
                      <Send className="w-4 h-4" />
                      Uyarıyı Gönder
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      İptal
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Aktif Uyarılar</TabsTrigger>
              <TabsTrigger value="history">Geçmiş</TabsTrigger>
              <TabsTrigger value="templates">Şablonlar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-4 mt-4">
              <div className="space-y-3">
                {mockAlerts.filter(alert => alert.isActive).map((alert) => (
                  <div key={alert.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                          <Badge className={`${getSeverityColor(alert.severity)} text-white`}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{alert.message}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {alert.targetDistricts.join(", ")}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTimeAgo(alert.sentAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            ~2,500 kişiye ulaştı
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Edit className="w-3 h-3" />
                          Düzenle
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Volume2 className="w-3 h-3" />
                          Tekrar Gönder
                        </Button>
                        <Button size="sm" variant="destructive" className="gap-1">
                          <Trash2 className="w-3 h-3" />
                          Durdur
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {mockAlerts.filter(alert => alert.isActive).length === 0 && (
                  <div className="text-center py-8 space-y-2">
                    <div className="text-muted-foreground">
                      Aktif uyarı bulunmuyor
                    </div>
                    <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
                      <Plus className="w-4 h-4" />
                      İlk Uyarıyı Oluştur
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4 mt-4">
              <div className="text-center py-8 text-muted-foreground">
                Geçmiş uyarılar burada görünecek
              </div>
            </TabsContent>
            
            <TabsContent value="templates" className="space-y-4 mt-4">
              <div className="text-center py-8 text-muted-foreground">
                Önceden hazırlanmış uyarı şablonları
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="emergency-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">1</div>
            <div className="text-sm text-muted-foreground">Aktif Uyarı</div>
          </CardContent>
        </Card>
        <Card className="emergency-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-muted-foreground">Kritik Durum</div>
          </CardContent>
        </Card>
        <Card className="emergency-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">2,500</div>
            <div className="text-sm text-muted-foreground">Ulaşılan Kişi</div>
          </CardContent>
        </Card>
        <Card className="emergency-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-sm text-muted-foreground">Teslimat Oranı</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}