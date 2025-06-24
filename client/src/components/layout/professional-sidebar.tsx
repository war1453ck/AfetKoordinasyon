import { 
  Activity, 
  AlertTriangle, 
  BarChart3, 
  Building, 
  Cloud, 
  Container, 
  Home, 
  Map, 
  Package, 
  Zap, 
  Truck, 
  Users,
  Smartphone,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Shield,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface ProfessionalSidebarProps {
  onNavigate?: (sectionId: string) => void;
}

export default function ProfessionalSidebar({ onNavigate }: ProfessionalSidebarProps) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigationItems = [
    {
      category: "Ana Kontrol",
      items: [
        { 
          id: "dashboard", 
          label: "Ana Panel", 
          icon: Home, 
          badge: null, 
          description: "Genel durum ve istatistikler"
        },
        { 
          id: "incidents", 
          label: "Aktif Vakalar", 
          icon: AlertTriangle, 
          badge: "3", 
          badgeColor: "bg-red-500",
          description: "Müdahale gerektiren acil durumlar",
          urgent: true
        },
        { 
          id: "map", 
          label: "Harita Görünüm", 
          icon: Map, 
          badge: null,
          description: "Coğrafi durum analizi"
        },
      ]
    },
    {
      category: "Operasyon Yönetimi",
      items: [
        { 
          id: "resources", 
          label: "Kaynak Yönetimi", 
          icon: Truck, 
          badge: "6", 
          badgeColor: "bg-blue-500",
          description: "Araç ve ekipman takibi"
        },
        { 
          id: "teams", 
          label: "Ekip Koordinasyonu", 
          icon: Users, 
          badge: "4", 
          badgeColor: "bg-green-500",
          description: "Personel ve ekip yönetimi"
        },
        { 
          id: "suppliers", 
          label: "Tedarikçi Ağı", 
          icon: Package, 
          badge: null,
          description: "Lojistik ve tedarik zinciri"
        },
      ]
    },
    {
      category: "Vatandaş Hizmetleri",
      items: [
        { 
          id: "mobile-users", 
          label: "Mobil Kullanıcılar", 
          icon: Smartphone, 
          badge: "127", 
          badgeColor: "bg-purple-500",
          description: "Kayıtlı vatandaş takibi",
          isNew: true
        },
        { 
          id: "emergency-alerts", 
          label: "Acil Uyarılar", 
          icon: MessageSquare, 
          badge: "2", 
          badgeColor: "bg-orange-500",
          description: "Toplu bildirim sistemi"
        },
        { 
          id: "location-tracking", 
          label: "Konum Takibi", 
          icon: Map, 
          badge: "45", 
          badgeColor: "bg-teal-500",
          description: "Gerçek zamanlı lokasyon"
        },
      ]
    },
    {
      category: "İzleme Sistemleri",
      items: [
        { 
          id: "earthquake", 
          label: "Deprem İzleme", 
          icon: Zap, 
          badge: null,
          description: "Sismik aktivite takibi"
        },
        { 
          id: "weather", 
          label: "Hava Durumu", 
          icon: Cloud, 
          badge: null,
          description: "Meteorolojik veriler"
        },
        { 
          id: "monitoring", 
          label: "Sistem İzleme", 
          icon: Activity, 
          badge: null,
          description: "Altyapı durumu"
        },
      ]
    },
    {
      category: "Yönetim",
      items: [
        { 
          id: "containers", 
          label: "Konteyner Yönetimi", 
          icon: Container, 
          badge: "4", 
          badgeColor: "bg-indigo-500",
          description: "Geçici barınma birimleri"
        },
        { 
          id: "city", 
          label: "Şehir Yönetimi", 
          icon: Building, 
          badge: null,
          description: "Bölgesel koordinasyon"
        },
        { 
          id: "analytics", 
          label: "Analitik & Raporlar", 
          icon: BarChart3, 
          badge: null,
          description: "Veri analizi ve raporlama"
        },
      ]
    }
  ];

  // Filter items based on search
  const filteredCategories = navigationItems.map(category => ({
    ...category,
    items: category.items.filter(item => 
      searchTerm === "" || 
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const handleNavigation = (itemId: string) => {
    setActiveSection(itemId);
    onNavigate?.(itemId);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" />
      )}
      
      <aside className={`fixed left-0 top-0 bottom-0 z-50 bg-slate-900 border-r border-slate-700 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-80'
      } flex flex-col shadow-2xl`}>
        
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700 bg-slate-800">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="bg-gradient-to-br from-red-500 to-orange-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-white">AFET YÖNETİM</h1>
                <p className="text-xs text-slate-400">Koordinasyon Merkezi</p>
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="p-4 border-b border-slate-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Menü ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400"
              />
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="p-4 border-b border-slate-700">
          {isCollapsed ? (
            <div className="space-y-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xs font-bold text-white">3</span>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xs font-bold text-white">6</span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-white">Sistem Durumu</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 rounded-lg bg-slate-700">
                  <div className="text-xl font-bold text-red-400">3</div>
                  <div className="text-xs text-slate-300">Aktif Vaka</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-slate-700">
                  <div className="text-xl font-bold text-green-400">6</div>
                  <div className="text-xs text-slate-300">Hazır Kaynak</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={category.category} className="space-y-2">
              {!isCollapsed && (
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-3">
                  {category.category}
                </h4>
              )}
              
              <div className="space-y-1">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <div key={item.id} className="relative group">
                      <Button
                        variant="ghost"
                        className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start'} 
                          ${isActive 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'text-slate-300 hover:text-white hover:bg-slate-700'
                          } 
                          ${item.urgent ? 'animate-pulse' : ''} 
                          transition-all duration-200 h-12`}
                        onClick={() => handleNavigation(item.id)}
                      >
                        <div className="relative flex items-center">
                          <Icon className="w-5 h-5" />
                          {item.urgent && !isActive && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                          )}
                        </div>
                        
                        {!isCollapsed && (
                          <>
                            <div className="flex-1 ml-3 text-left">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{item.label}</span>
                                {item.isNew && (
                                  <Badge className="bg-blue-500 text-white text-xs px-1.5 py-0.5">
                                    YENİ
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                {item.description}
                              </div>
                            </div>
                            
                            {item.badge && (
                              <Badge className={`${item.badgeColor || 'bg-slate-600'} text-white ml-2`}>
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Button>
                      
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-slate-600">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-slate-400">{item.description}</div>
                          {item.badge && (
                            <div className="text-xs mt-1">
                              <span className={`${item.badgeColor || 'bg-slate-600'} px-2 py-0.5 rounded text-white`}>
                                {item.badge}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {categoryIndex < filteredCategories.length - 1 && !isCollapsed && (
                <Separator className="my-4 bg-slate-700" />
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 space-y-2">
          <Button
            variant="ghost"
            className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start'} text-slate-300 hover:text-white hover:bg-slate-700 h-10`}
          >
            <Settings className="w-4 h-4" />
            {!isCollapsed && <span className="ml-3">Ayarlar</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start'} text-slate-300 hover:text-red-400 hover:bg-red-900/20 h-10`}
          >
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span className="ml-3">Çıkış Yap</span>}
          </Button>
          
          {!isCollapsed && (
            <div className="text-xs text-slate-500 text-center pt-2">
              <div>v2.1.0 - AFET Yönetim Sistemi</div>
              <div>Son güncellenme: 11:54</div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}