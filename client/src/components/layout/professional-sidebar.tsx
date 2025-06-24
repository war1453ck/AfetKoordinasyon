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

  // Show all navigation items (no search filtering)
  const filteredCategories = navigationItems;

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
        isCollapsed ? 'w-16' : 'w-64'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
      flex flex-col shadow-lg modern-sidebar`}>
        
        {/* Simple Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="bg-red-500 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsMobileOpen(false)}
              className="text-gray-500 hover:text-gray-700 lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-gray-500 hover:text-gray-700 hidden lg:flex"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>





        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto sidebar-nav px-3 py-4 space-y-1">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={category.category} className="space-y-1">
              
              <div className="space-y-0.5">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <div key={item.id} className="relative group">
                      <Button
                        variant="ghost"
                        className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start px-3'} 
                          ${isActive 
                            ? 'bg-red-500 text-white hover:bg-red-600' 
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                          } 
                          ${item.urgent ? 'animate-pulse' : ''} 
                          transition-all duration-200 h-10 rounded-lg font-medium`}
                        onClick={() => handleNavigation(item.id)}
                      >
                        <div className="relative flex items-center">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                          {item.urgent && !isActive && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                          )}
                        </div>
                        
                        {!isCollapsed && (
                          <div className="flex-1 ml-3 text-left">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{item.label}</span>
                              {item.badge && (
                                <Badge className={`${item.badgeColor || 'bg-gray-400'} text-white text-xs px-1.5 py-0.5 rounded-full`}>
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                          </div>
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
              

            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 space-y-2">
          <Button
            variant="ghost"
            className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start px-3'} text-gray-600 hover:text-gray-800 hover:bg-gray-100 h-10 rounded-lg font-medium`}
          >
            <Settings className="w-4 h-4" />
            {!isCollapsed && <span className="ml-3">Ayarlar</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start px-3'} text-gray-600 hover:text-red-600 hover:bg-red-50 h-10 rounded-lg font-medium`}
          >
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span className="ml-3">Çıkış Yap</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}