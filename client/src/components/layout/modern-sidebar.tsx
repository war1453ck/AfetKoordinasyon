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
  Users 
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ModernSidebar() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const navigationSections = [
    {
      title: "Ana Panel",
      items: [
        { id: "dashboard", label: "Dashboard", icon: Home, badge: null },
        { id: "incidents", label: "Aktif Vakalar", icon: AlertTriangle, badge: "3" },
        { id: "map", label: "Harita Görünüm", icon: Map, badge: null },
      ]
    },
    {
      title: "Operasyonlar",
      items: [
        { id: "resources", label: "Kaynak Yönetimi", icon: Truck, badge: "6" },
        { id: "teams", label: "Ekip Koordinasyonu", icon: Users, badge: "4" },
        { id: "suppliers", label: "Tedarikçi Ağı", icon: Package, badge: null },
      ]
    },
    {
      title: "İzleme Sistemleri",
      items: [
        { id: "earthquake", label: "Deprem İzleme", icon: Zap, badge: null },
        { id: "weather", label: "Hava Durumu", icon: Cloud, badge: null },
        { id: "monitoring", label: "Sistem İzleme", icon: Activity, badge: null },
      ]
    },
    {
      title: "Yönetim",
      items: [
        { id: "containers", label: "Konteyner Yönetimi", icon: Container, badge: "4" },
        { id: "city", label: "Şehir Yönetimi", icon: Building, badge: null },
        { id: "analytics", label: "Analitik & Raporlar", icon: BarChart3, badge: null },
      ]
    }
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 sidebar-nav animate-slide-up">
      <div className="flex flex-col h-full p-4 space-y-6">
        {/* Quick Stats */}
        <div className="glass-card p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Sistem Durumu</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">3</div>
              <div className="text-xs text-muted-foreground">Aktif Vaka</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">6</div>
              <div className="text-xs text-muted-foreground">Hazır Kaynak</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">4</div>
              <div className="text-xs text-muted-foreground">Aktif Ekip</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">12</div>
              <div className="text-xs text-muted-foreground">Barınak</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6 overflow-y-auto">
          {navigationSections.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                {section.title}
              </h4>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={`sidebar-item w-full justify-start ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-2 bg-red-600 text-white">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </div>
              {sectionIndex < navigationSections.length - 1 && (
                <Separator className="my-4 bg-border/50" />
              )}
            </div>
          ))}
        </nav>

        {/* Emergency Status */}
        <div className="glass-card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">Sistem Aktif</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Son güncellenme: 11:31
          </div>
        </div>
      </div>
    </aside>
  );
}