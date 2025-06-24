import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  MapPin,
  AlertTriangle,
  CheckCircle,
  Download,
  Calendar,
  Eye,
  Activity
} from "lucide-react";

export default function AnalyticsReports() {
  const [timeRange, setTimeRange] = useState("7d");
  const [reportType, setReportType] = useState("overview");

  // Mock analytics data
  const analyticsData = {
    incidents: {
      total: 47,
      resolved: 39,
      active: 3,
      avgResponseTime: "8.5 dk",
      trend: "+12%"
    },
    resources: {
      utilization: 76,
      available: 24,
      maintenance: 4,
      deployed: 18
    },
    personnel: {
      active: 156,
      onDuty: 89,
      available: 67,
      training: 12
    },
    alerts: {
      sent: 23,
      delivered: 22,
      deliveryRate: 95.7,
      avgReachTime: "2.3 dk"
    }
  };

  const recentIncidents = [
    { id: 1, type: "Yangın", location: "Beşiktaş", time: "14:30", status: "Çözüldü", responseTime: "6 dk" },
    { id: 2, type: "Trafik", location: "Kadıköy", time: "13:15", status: "Aktif", responseTime: "12 dk" },
    { id: 3, type: "Medikal", location: "Şişli", time: "12:45", status: "Çözüldü", responseTime: "4 dk" },
  ];

  const districtStats = [
    { district: "Beşiktaş", incidents: 12, resolved: 10, active: 2, avgTime: "7.2 dk" },
    { district: "Kadıköy", incidents: 8, resolved: 7, active: 1, avgTime: "9.1 dk" },
    { district: "Bakırköy", incidents: 15, resolved: 15, active: 0, avgTime: "6.8 dk" },
    { district: "Şişli", incidents: 12, resolved: 7, active: 0, avgTime: "11.3 dk" }
  ];

  return (
    <div className="space-y-6">
      <Card className="emergency-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Analitik & Raporlar
          </CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Son 24 Saat</SelectItem>
                  <SelectItem value="7d">Son 7 Gün</SelectItem>
                  <SelectItem value="30d">Son 30 Gün</SelectItem>
                  <SelectItem value="3m">Son 3 Ay</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Genel Bakış</SelectItem>
                  <SelectItem value="incidents">Vaka Analizi</SelectItem>
                  <SelectItem value="resources">Kaynak Analizi</SelectItem>
                  <SelectItem value="performance">Performans</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="gap-2">
                <Eye className="w-4 h-4" />
                Canlı Görünüm
              </Button>
              <Button size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Rapor İndir
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="responsive-grid">
        <Card className="emergency-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{analyticsData.incidents.total}</div>
                <div className="text-sm text-muted-foreground">Toplam Vaka</div>
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                {analyticsData.incidents.trend}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="emergency-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{analyticsData.incidents.resolved}</div>
                <div className="text-sm text-muted-foreground">Çözülen Vaka</div>
              </div>
              <div className="text-xs text-gray-500">
                %{Math.round((analyticsData.incidents.resolved / analyticsData.incidents.total) * 100)}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="emergency-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{analyticsData.incidents.avgResponseTime}</div>
                <div className="text-sm text-muted-foreground">Ort. Müdahale</div>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="emergency-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{analyticsData.resources.utilization}%</div>
                <div className="text-sm text-muted-foreground">Kaynak Kullanımı</div>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="incidents">Vaka Analizi</TabsTrigger>
          <TabsTrigger value="districts">Bölge Bazlı</TabsTrigger>
          <TabsTrigger value="trends">Trendler</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="emergency-card">
              <CardHeader>
                <CardTitle className="text-lg">Son Aktiviteler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentIncidents.map((incident) => (
                    <div key={incident.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          incident.status === "Çözüldü" ? "bg-green-500" : "bg-orange-500"
                        }`}></div>
                        <div>
                          <div className="font-medium text-sm">{incident.type} - {incident.location}</div>
                          <div className="text-xs text-gray-500">{incident.time} - {incident.responseTime}</div>
                        </div>
                      </div>
                      <Badge variant={incident.status === "Çözüldü" ? "default" : "destructive"}>
                        {incident.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resource Status */}
            <Card className="emergency-card">
              <CardHeader>
                <CardTitle className="text-lg">Kaynak Durumu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Aktif Kaynaklar</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">{analyticsData.resources.deployed}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Kullanılabilir</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-1/2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">{analyticsData.resources.available}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bakımda</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div className="w-1/6 h-2 bg-orange-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">{analyticsData.resources.maintenance}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart Placeholder */}
          <Card className="emergency-card">
            <CardHeader>
              <CardTitle className="text-lg">Performans Trendi (Son 7 Gün)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-slate-200 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <BarChart3 className="w-12 h-12 text-blue-500 mx-auto" />
                  <p className="text-gray-600">Performans grafikleri burada görünecek</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="incidents" className="space-y-6 mt-6">
          <Card className="emergency-card">
            <CardHeader>
              <CardTitle className="text-lg">Vaka Türü Dağılımı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">18</div>
                    <div className="text-sm text-red-800">Yangın</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-blue-800">Medikal</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">9</div>
                    <div className="text-sm text-yellow-800">Trafik</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">8</div>
                    <div className="text-sm text-purple-800">Diğer</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="districts" className="space-y-6 mt-6">
          <Card className="emergency-card">
            <CardHeader>
              <CardTitle className="text-lg">Bölge Bazlı İstatistikler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {districtStats.map((district, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">{district.district}</div>
                        <div className="text-sm text-gray-500">Ort. müdahale: {district.avgTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{district.incidents}</div>
                        <div className="text-xs text-gray-500">Toplam</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{district.resolved}</div>
                        <div className="text-xs text-gray-500">Çözülen</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{district.active}</div>
                        <div className="text-xs text-gray-500">Aktif</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="emergency-card">
              <CardHeader>
                <CardTitle className="text-lg">Haftalık Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-slate-200 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <TrendingUp className="w-12 h-12 text-green-500 mx-auto" />
                    <p className="text-gray-600">Haftalık trend grafiği</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="emergency-card">
              <CardHeader>
                <CardTitle className="text-lg">Müdahale Süreleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-slate-200 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Clock className="w-12 h-12 text-orange-500 mx-auto" />
                    <p className="text-gray-600">Müdahale süresi analizi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}