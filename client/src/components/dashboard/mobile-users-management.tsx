import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Smartphone, 
  MapPin, 
  Phone, 
  Clock, 
  Filter, 
  Search,
  MessageCircle,
  AlertTriangle,
  Users,
  Signal,
  Battery,
  Navigation
} from "lucide-react";
import { useState } from "react";

interface MobileUser {
  id: number;
  phoneNumber: string;
  name: string;
  district: string;
  latitude?: string;
  longitude?: string;
  lastLocationUpdate?: string;
  emergencyContact?: string;
  medicalInfo?: string;
  isActive: boolean;
  registeredAt: string;
}

interface UserLocation {
  id: number;
  mobileUserId: number;
  latitude: string;
  longitude: string;
  address?: string;
  district: string;
  isEmergencyLocation: boolean;
  reportedAt: string;
  accuracy?: string;
  batteryLevel?: number;
  status: string;
}

export default function MobileUsersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [activeTab, setActiveTab] = useState("users");

  // Fetch mobile users from API
  const { data: mobileUsers, isLoading: usersLoading } = useQuery<MobileUser[]>({
    queryKey: ["/api/mobile-users"],
  });

  // Fetch user locations from API
  const { data: userLocations, isLoading: locationsLoading } = useQuery<UserLocation[]>({
    queryKey: ["/api/user-locations"],
  });

  // Fetch emergency locations
  const { data: emergencyLocations, isLoading: emergencyLoading } = useQuery<UserLocation[]>({
    queryKey: ["/api/user-locations/emergency"],
  });

  // Mock data fallback for development
  const mockMobileUsers: MobileUser[] = [
  {
    id: 1,
    phoneNumber: "+90 555 123 4567",
    name: "Ahmet Yılmaz",
    district: "Beşiktaş",
    latitude: "41.0428",
    longitude: "29.0044",
    lastLocationUpdate: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    emergencyContact: "+90 555 987 6543",
    medicalInfo: "Diyabet",
    isActive: true,
    registeredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    phoneNumber: "+90 555 234 5678",
    name: "Fatma Özkan",
    district: "Kadıköy",
    latitude: "40.9833",
    longitude: "29.0333",
    lastLocationUpdate: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    emergencyContact: "+90 555 876 5432",
    isActive: true,
    registeredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    phoneNumber: "+90 555 345 6789",
    name: "Mehmet Demir",
    district: "Bakırköy",
    latitude: "40.9833",
    longitude: "28.8667",
    lastLocationUpdate: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    emergencyContact: "+90 555 765 4321",
    medicalInfo: "Kalp hastası",
    isActive: true,
    registeredAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const mockUserLocations: UserLocation[] = [
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
    status: "help_needed"
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
    status: "safe"
  }
  ];

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
      status: "help_needed"
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
      status: "safe"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "help_needed": return "status-critical";
      case "injured": return "status-high";
      case "trapped": return "status-high";
      case "safe": return "status-low";
      default: return "status-monitoring";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "help_needed": return "Yardım İstiyor";
      case "injured": return "Yaralı";
      case "trapped": return "Mahsur";
      case "safe": return "Güvenli";
      default: return "Bilinmiyor";
    }
  };

  const getLastSeenText = (lastUpdate?: string) => {
    if (!lastUpdate) return "Hiç görülmedi";
    const diff = Math.floor((Date.now() - new Date(lastUpdate).getTime()) / 1000 / 60);
    if (diff < 1) return "Az önce";
    if (diff < 60) return `${diff} dk önce`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} saat önce`;
    const days = Math.floor(hours / 24);
    return `${days} gün önce`;
  };

  const allUsers = mobileUsers || mockMobileUsers;
  const allLocations = userLocations || mockLocations;
  const allEmergencyLocations = emergencyLocations || mockLocations.filter(loc => loc.isEmergencyLocation);

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phoneNumber.includes(searchTerm);
    const matchesDistrict = selectedDistrict === "all" || user.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });



  return (
    <div className="space-y-6">
      <Card className="emergency-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-blue-600" />
              Mobil Kullanıcı Yönetimi
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Users className="w-3 h-3" />
                {allUsers.length} kayıtlı
              </Badge>
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="w-3 h-3" />
                {allEmergencyLocations.length} acil durum
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">Kullanıcılar</TabsTrigger>
              <TabsTrigger value="locations">Konumlar</TabsTrigger>
              <TabsTrigger value="emergency">Acil Durumlar</TabsTrigger>
            </TabsList>

            {/* Search and Filter */}
            <div className="flex gap-4 mt-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Kullanıcı ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filtrele
              </Button>
            </div>

            <TabsContent value="users" className="space-y-4 mt-4">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredUsers.map((user, index) => (
                  <div 
                    key={user.id} 
                    className="group p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                          <Smartphone className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-foreground">{user.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            <span>{user.phoneNumber}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{user.district}</span>
                          </div>
                          {user.medicalInfo && (
                            <div className="flex items-center gap-2 text-sm text-orange-600">
                              <AlertTriangle className="w-3 h-3" />
                              <span>{user.medicalInfo}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {getLastSeenText(user.lastLocationUpdate)}
                          </div>
                          {user.isActive ? (
                            <Badge className="status-low text-xs mt-1">Aktif</Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs mt-1">Pasif</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
                        <MessageCircle className="w-3 h-3" />
                        Mesaj Gönder
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
                        <Navigation className="w-3 h-3" />
                        Konumu Gör
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
                        <Phone className="w-3 h-3" />
                        Ara
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="locations" className="space-y-4 mt-4">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {allLocations.map((location, index) => {
                  const user = allUsers.find(u => u.id === location.mobileUserId);
                  return (
                    <div 
                      key={location.id} 
                      className="group p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200 animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-50 dark:bg-green-950 rounded-lg">
                            <MapPin className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-semibold text-foreground">{user?.name}</h4>
                            <div className="text-sm text-muted-foreground">
                              {location.address || `${location.latitude}, ${location.longitude}`}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Signal className="w-3 h-3" />
                                ±{location.accuracy}m
                              </div>
                              {location.batteryLevel && (
                                <div className="flex items-center gap-1">
                                  <Battery className="w-3 h-3" />
                                  %{location.batteryLevel}
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {getLastSeenText(location.reportedAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(location.status)} text-xs`}>
                            {getStatusText(location.status)}
                          </Badge>
                          {location.isEmergencyLocation && (
                            <Badge variant="destructive" className="text-xs animate-pulse">
                              ACİL
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-4 mt-4">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {allEmergencyLocations.map((location, index) => {
                  const user = allUsers.find(u => u.id === location.mobileUserId);
                  return (
                    <div 
                      key={location.id} 
                      className="group p-4 rounded-lg border-2 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800 hover:shadow-md transition-all duration-200 animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-semibold text-foreground">{user?.name}</h4>
                            <div className="text-sm text-muted-foreground">
                              {location.address || `${location.latitude}, ${location.longitude}`}
                            </div>
                            <div className="text-sm font-medium text-red-600">
                              {getStatusText(location.status)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {getLastSeenText(location.reportedAt)} bildirdi
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button size="sm" className="btn-emergency text-xs h-7">
                            Müdahale Et
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs h-7">
                            Arama Yap
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {allEmergencyLocations.length === 0 && (
                  <div className="text-center py-8 space-y-2">
                    <div className="text-muted-foreground text-sm">
                      Aktif acil durum bildirimi yok
                    </div>
                    <div className="text-2xl">✅</div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="emergency-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{allUsers.length}</div>
            <div className="text-sm text-muted-foreground">Toplam Kullanıcı</div>
          </CardContent>
        </Card>
        <Card className="emergency-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {allUsers.filter(u => u.isActive).length}
            </div>
            <div className="text-sm text-muted-foreground">Aktif Kullanıcı</div>
          </CardContent>
        </Card>
        <Card className="emergency-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{allLocations.length}</div>
            <div className="text-sm text-muted-foreground">Konum Bildirimi</div>
          </CardContent>
        </Card>
        <Card className="emergency-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{allEmergencyLocations.length}</div>
            <div className="text-sm text-muted-foreground">Acil Durum</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}