import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Map, 
  MapPin, 
  Users, 
  Clock, 
  AlertTriangle,
  Navigation,
  Battery,
  Signal,
  Eye,
  Filter,
  Download,
  RefreshCcw
} from "lucide-react";

interface UserLocation {
  id: number;
  mobileUserId: number;
  latitude: string;
  longitude: string;
  address: string;
  district: string;
  isEmergencyLocation: boolean;
  reportedAt: string;
  accuracy: string;
  batteryLevel?: number;
  status: string;
  userName?: string;
  phoneNumber?: string;
}

export default function LocationTrackingView() {
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  // Mock location data
  const mockLocations: UserLocation[] = [
    {
      id: 1,
      mobileUserId: 1,
      latitude: "41.0428",
      longitude: "29.0044",
      address: "Barbaros Bulvarı No:142, Beşiktaş",
      district: "Beşiktaş",
      isEmergencyLocation: true,
      reportedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      accuracy: "5",
      batteryLevel: 78,
      status: "help_needed",
      userName: "Ahmet Yılmaz",
      phoneNumber: "+90 555 123 4567"
    },
    {
      id: 2,
      mobileUserId: 2,
      latitude: "40.9833",
      longitude: "29.0333",
      address: "Moda Caddesi No:45, Kadıköy",
      district: "Kadıköy",
      isEmergencyLocation: false,
      reportedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      accuracy: "3",
      batteryLevel: 92,
      status: "safe",
      userName: "Fatma Özkan",
      phoneNumber: "+90 555 234 5678"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "help_needed": return "bg-red-500";
      case "safe": return "bg-green-500";
      case "moving": return "bg-blue-500";
      case "offline": return "bg-gray-500";
      default: return "bg-yellow-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "help_needed": return "Yardım Gerekiyor";
      case "safe": return "Güvende";
      case "moving": return "Hareket Halinde";
      case "offline": return "Çevrimdışı";
      default: return "Bilinmiyor";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Az önce";
    if (diffMins < 60) return `${diffMins} dk önce`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} sa önce`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} gün önce`;
  };

  const filteredLocations = mockLocations.filter(location => {
    const matchesDistrict = selectedDistrict === "all" || location.district === selectedDistrict;
    const matchesStatus = statusFilter === "all" || location.status === statusFilter;
    return matchesDistrict && matchesStatus;
  });

  const emergencyLocations = filteredLocations.filter(loc => loc.isEmergencyLocation);

  return (
    <div className="space-y-6">
      <Card className="emergency-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="w-5 h-5 text-teal-600" />
            Gerçek Zamanlı Konum Takibi
          </CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <MapPin className="w-3 h-3" />
                {filteredLocations.length} aktif konum
              </Badge>
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="w-3 h-3" />
                {emergencyLocations.length} acil durum
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="gap-2">
                <RefreshCcw className="w-4 h-4" />
                Yenile
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Dışa Aktar
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filtreler:</span>
            </div>
            
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Bölge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Bölgeler</SelectItem>
                <SelectItem value="Beşiktaş">Beşiktaş</SelectItem>
                <SelectItem value="Kadıköy">Kadıköy</SelectItem>
                <SelectItem value="Bakırköy">Bakırköy</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="help_needed">Yardım Gerekiyor</SelectItem>
                <SelectItem value="safe">Güvende</SelectItem>
                <SelectItem value="moving">Hareket Halinde</SelectItem>
                <SelectItem value="offline">Çevrimdışı</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Zaman" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Zamanlar</SelectItem>
                <SelectItem value="1h">Son 1 Saat</SelectItem>
                <SelectItem value="24h">Son 24 Saat</SelectItem>
                <SelectItem value="7d">Son 7 Gün</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="map">Harita Görünümü</TabsTrigger>
              <TabsTrigger value="list">Liste Görünümü</TabsTrigger>
              <TabsTrigger value="emergency">Acil Durumlar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="map" className="space-y-4 mt-4">
              <div className="h-96 bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg border border-slate-200 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Map className="w-16 h-16 text-teal-500 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">İnteraktif Harita</h3>
                    <p className="text-gray-600">Kullanıcı konumları burada görünecek</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Acil Durum</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Güvende</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Hareket Halinde</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span>Çevrimdışı</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="space-y-4 mt-4">
              <div className="space-y-3">
                {filteredLocations.map((location) => (
                  <div key={location.id} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-teal-600" />
                            <span className="font-medium text-gray-900">{location.userName}</span>
                          </div>
                          <Badge className={`${getStatusColor(location.status)} text-white`}>
                            {getStatusText(location.status)}
                          </Badge>
                          {location.isEmergencyLocation && (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              ACIL
                            </Badge>
                          )}
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          <div>{location.address}</div>
                          <div className="flex items-center gap-4 mt-1">
                            <span>📍 {location.latitude}, {location.longitude}</span>
                            <span>📞 {location.phoneNumber}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(location.reportedAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Navigation className="w-3 h-3" />
                            ±{location.accuracy}m hassasiyet
                          </div>
                          {location.batteryLevel && (
                            <div className="flex items-center gap-1">
                              <Battery className="w-3 h-3" />
                              %{location.batteryLevel}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Signal className="w-3 h-3" />
                            Güçlü sinyal
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Eye className="w-3 h-3" />
                          Detay
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <MapPin className="w-3 h-3" />
                          Haritada Göster
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredLocations.length === 0 && (
                  <div className="text-center py-8 space-y-2">
                    <div className="text-muted-foreground">
                      Seçilen kriterlere uygun konum bulunamadı
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="emergency" className="space-y-4 mt-4">
              <div className="space-y-3">
                {emergencyLocations.map((location) => (
                  <div key={location.id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <span className="font-semibold text-red-900">{location.userName}</span>
                          <Badge variant="destructive">ACIL DURUM</Badge>
                        </div>
                        
                        <div className="text-sm text-red-800 mb-2">
                          <div className="font-medium">{location.address}</div>
                          <div className="flex items-center gap-4 mt-1">
                            <span>📱 {location.phoneNumber}</span>
                            <span>⏰ {formatTimeAgo(location.reportedAt)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 gap-1">
                          <Navigation className="w-3 h-3" />
                          Müdahale Et
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {emergencyLocations.length === 0 && (
                  <div className="text-center py-8 space-y-2">
                    <div className="text-green-600 font-medium">
                      ✅ Aktif acil durum bildirimi yok
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="responsive-grid">
        <Card className="emergency-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-teal-600">{filteredLocations.length}</div>
            <div className="text-sm text-muted-foreground">Aktif Konum</div>
          </CardContent>
        </Card>
        <Card className="emergency-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{emergencyLocations.length}</div>
            <div className="text-sm text-muted-foreground">Acil Durum</div>
          </CardContent>
        </Card>
        <Card className="emergency-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {filteredLocations.filter(l => l.status === "safe").length}
            </div>
            <div className="text-sm text-muted-foreground">Güvende</div>
          </CardContent>
        </Card>
        <Card className="emergency-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(filteredLocations.reduce((acc, loc) => acc + (loc.batteryLevel || 0), 0) / filteredLocations.length) || 0}%
            </div>
            <div className="text-sm text-muted-foreground">Ortalama Batarya</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}