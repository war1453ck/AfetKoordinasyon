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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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
          badge: "3", 
          badgeColor: "bg-purple-500",
          description: "Kayıtlı vatandaş takibi",
          isNew: true
        },
        { 
          id: "emergency-alerts", 
          label: "Acil Uyarılar", 
          icon: MessageSquare, 
          badge: "1", 
          badgeColor: "bg-orange-500",
          description: "Toplu bildirim sistemi"
        },
        { 
          id: "location-tracking", 
          label: "Konum Takibi", 
          icon: Map, 
          badge: "2", 
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
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      <aside className={`fixed left-0 top-0 bottom-0 z-50 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-72'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
      flex flex-col shadow-2xl modern-sidebar`}>
        
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-red-200/20 bg-gradient-to-r from-red-600 to-orange-600">
          <div className={`flex items-center gap-4 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Shield className="w-7 h-7 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-white">AFET YÖNETİM</h1>
                <p className="text-sm text-red-100">Koordinasyon Merkezi</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsMobileOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/20 lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-white/80 hover:text-white hover:bg-white/20 hidden lg:flex"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Menü ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-400 focus:ring-red-400 rounded-xl"
              />
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="px-6 pb-4">
          {isCollapsed ? (
            <div className="space-y-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                <span className="text-sm font-bold text-white">3</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                <span className="text-sm font-bold text-white">6</span>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-900">Sistem Durumu</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-600">Çevrimiçi</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-xl bg-white shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <div className="text-xs text-gray-600 font-medium">Aktif Vaka</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-white shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-green-600">6</div>
                  <div className="text-xs text-gray-600 font-medium">Hazır Kaynak</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto sidebar-nav px-4 py-2 space-y-2">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={category.category} className="space-y-1">
              {!isCollapsed && (
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2 mb-2">
                  {category.category}
                </h4>
              )}
              
              <div className="space-y-0.5">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <div key={item.id} className="relative group">
                      <Button
                        variant="ghost"
                        className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start px-4'} 
                          ${isActive 
                            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:from-red-600 hover:to-orange-600' 
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                          } 
                          ${item.urgent ? 'animate-pulse' : ''} 
                          transition-all duration-200 h-12 rounded-xl font-medium`}
                        onClick={() => handleNavigation(item.id)}
                      >
                        <div className="relative flex items-center">
                          <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-200'} transition-colors duration-200`}>
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                          </div>
                          {item.urgent && !isActive && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                          )}
                        </div>
                        
                        {!isCollapsed && (
                          <>
                            <div className="flex-1 ml-4 text-left">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-sm">{item.label}</span>
                                  {item.isNew && (
                                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                                      YENİ
                                    </Badge>
                                  )}
                                </div>
                                {item.badge && (
                                  <Badge className={`${item.badgeColor || 'bg-gray-500'} text-white text-xs px-2 py-1 rounded-full`}>
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 mt-1 font-medium">
                                {item.description}
                              </div>
                            </div>
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
                <div className="my-4 mx-3 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
          <Button
            variant="ghost"
            className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start px-4'} text-gray-600 hover:text-gray-900 hover:bg-white/60 h-12 rounded-xl font-medium`}
          >
            <div className="p-2 bg-gray-200 rounded-lg">
              <Settings className="w-4 h-4" />
            </div>
            {!isCollapsed && <span className="ml-4">Ayarlar</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start px-4'} text-gray-600 hover:text-red-600 hover:bg-red-50 h-12 rounded-xl font-medium`}
          >
            <div className="p-2 bg-gray-200 rounded-lg">
              <LogOut className="w-4 h-4" />
            </div>
            {!isCollapsed && <span className="ml-4">Çıkış Yap</span>}
          </Button>
          
          {!isCollapsed && (
            <div className="text-xs text-gray-500 text-center pt-2 space-y-1">
              <div className="font-semibold">v2.1.0 - AFET Yönetim Sistemi</div>
              <div>Son güncellenme: {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}