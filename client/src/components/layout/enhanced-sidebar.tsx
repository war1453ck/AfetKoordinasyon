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
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface EnhancedSidebarProps {
  onNavigate?: (sectionId: string) => void;
}

export default function EnhancedSidebar({ onNavigate }: EnhancedSidebarProps) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigationSections = [
    {
      title: "Ana Panel",
      items: [
        { id: "dashboard", label: "Dashboard", icon: Home, badge: null, shortcut: "⌘D" },
        { id: "incidents", label: "Aktif Vakalar", icon: AlertTriangle, badge: "3", shortcut: "⌘I", urgent: true },
        { id: "map", label: "Harita Görünüm", icon: Map, badge: null, shortcut: "⌘M" },
      ]
    },
    {
      title: "Operasyon Yönetimi",
      items: [
        { id: "resources", label: "Kaynak Yönetimi", icon: Truck, badge: "6", shortcut: "⌘R" },
        { id: "teams", label: "Ekip Koordinasyonu", icon: Users, badge: "4", shortcut: "⌘T" },
        { id: "suppliers", label: "Tedarikçi Ağı", icon: Package, badge: null, shortcut: "⌘S" },
      ]
    },
    {
      title: "Vatandaş İletişimi",
      items: [
        { id: "mobile-users", label: "Mobil Kullanıcılar", icon: Smartphone, badge: "127", shortcut: "⌘U", new: true },
        { id: "emergency-alerts", label: "Acil Uyarılar", icon: MessageSquare, badge: "2", shortcut: "⌘A" },
        { id: "location-tracking", label: "Konum Takibi", icon: Map, badge: "45", shortcut: "⌘L" },
      ]
    },
    {
      title: "İzleme Sistemleri",
      items: [
        { id: "earthquake", label: "Deprem İzleme", icon: Zap, badge: null, shortcut: "⌘E" },
        { id: "weather", label: "Hava Durumu", icon: Cloud, badge: null, shortcut: "⌘W" },
        { id: "monitoring", label: "Sistem İzleme", icon: Activity, badge: null, shortcut: "⌘Y" },
      ]
    },
    {
      title: "Yönetim",
      items: [
        { id: "containers", label: "Konteyner Yönetimi", icon: Container, badge: "4", shortcut: "⌘C" },
        { id: "city", label: "Şehir Yönetimi", icon: Building, badge: null, shortcut: "⌘B" },
        { id: "analytics", label: "Analitik & Raporlar", icon: BarChart3, badge: null, shortcut: "⌘P" },
      ]
    }
  ];

  const bottomItems = [
    { id: "settings", label: "Ayarlar", icon: Settings, shortcut: "⌘," },
    { id: "help", label: "Yardım", icon: HelpCircle, shortcut: "⌘?" },
  ];

  // Filter items based on search
  const filteredSections = navigationSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      searchTerm === "" || item.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <aside className={`fixed left-0 top-16 bottom-0 sidebar-nav transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-72'
    } animate-slide-up z-40`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="Menü ara..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-slate-400 hover:text-white ml-2"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Quick Stats - Collapsed view */}
        {isCollapsed && (
          <div className="p-2 space-y-2">
            <div className="text-center">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xs font-bold text-white">3</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xs font-bold text-white">6</span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats - Expanded view */}
        {!isCollapsed && (
          <div className="p-4">
            <div className="glass-card p-4 space-y-3">
              <h3 className="text-sm font-semibold text-white">Sistem Durumu</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-red-400">3</div>
                  <div className="text-xs text-slate-400">Aktif Vaka</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">6</div>
                  <div className="text-xs text-slate-400">Hazır Kaynak</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">127</div>
                  <div className="text-xs text-slate-400">Mobil Kullanıcı</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-400">45</div>
                  <div className="text-xs text-slate-400">Aktif Konum</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {filteredSections.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-2">
              {!isCollapsed && (
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
                  {section.title}
                </h4>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <div key={item.id} className="relative group">
                      <Button
                        variant="ghost"
                        className={`sidebar-item w-full ${isActive ? 'active' : ''} ${
                          isCollapsed ? 'justify-center px-2' : 'justify-start'
                        } ${item.urgent ? 'animate-pulse-slow' : ''}`}
                        onClick={() => {
                          setActiveSection(item.id);
                          onNavigate?.(item.id);
                        }}
                      >
                        <div className="relative">
                          <Icon className="w-4 h-4" />
                          {item.urgent && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                          )}
                        </div>
                        {!isCollapsed && (
                          <>
                            <span className="flex-1 text-left">{item.label}</span>
                            <div className="flex items-center gap-2">
                              {item.new && (
                                <Badge variant="secondary" className="text-xs bg-blue-600 text-white">
                                  YENİ
                                </Badge>
                              )}
                              {item.badge && (
                                <Badge 
                                  variant="secondary" 
                                  className={`text-xs ${
                                    item.urgent ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-600 text-white'
                                  }`}
                                >
                                  {item.badge}
                                </Badge>
                              )}
                              {item.shortcut && (
                                <span className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {item.shortcut}
                                </span>
                              )}
                            </div>
                          </>
                        )}
                      </Button>
                      
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                          {item.label}
                          {item.badge && (
                            <span className="ml-2 bg-slate-600 px-1 rounded text-xs">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {sectionIndex < filteredSections.length - 1 && !isCollapsed && (
                <Separator className="my-4 bg-slate-700" />
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-700 space-y-2">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="relative group">
                <Button
                  variant="ghost"
                  className={`sidebar-item w-full ${
                    isCollapsed ? 'justify-center px-2' : 'justify-start'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      <span className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.shortcut}
                      </span>
                    </>
                  )}
                </Button>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Emergency Status */}
          <div className={`glass-card p-3 space-y-2 ${isCollapsed ? 'hidden' : ''}`}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white">Sistem Aktif</span>
            </div>
            <div className="text-xs text-slate-400">
              Son güncellenme: 11:41
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}