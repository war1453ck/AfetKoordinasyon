import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Map, 
  AlertTriangle, 
  Truck, 
  Users, 
  MessageSquare, 
  BarChart, 
  Settings,
  Package,
  Activity,
  Cloud,
  Container,
  Building
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "#", icon: BarChart3, current: true },
  { name: "Harita Görünümü", href: "#", icon: Map, current: false },
  { name: "Aktif Olaylar", href: "#", icon: AlertTriangle, current: false, badge: 4 },
  { name: "Kaynak Yönetimi", href: "#", icon: Truck, current: false },
  { name: "Ekip Koordinasyonu", href: "#", icon: Users, current: false },
  { name: "Tedarikçi Haritası", href: "#", icon: Package, current: false },
  { name: "Deprem Takip", href: "#", icon: Activity, current: false },
  { name: "Hava Durumu", href: "#", icon: Cloud, current: false },
  { name: "Konteyner Kent", href: "#", icon: Package, current: false },
  { name: "Kent Yönetimi", href: "#", icon: Building, current: false },
  { name: "İletişim Merkezi", href: "#", icon: MessageSquare, current: false, badge: 3 },
  { name: "Raporlar", href: "#", icon: BarChart, current: false },
  { name: "Ayarlar", href: "#", icon: Settings, current: false },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                item.current
                  ? "bg-emergency-50 text-emergency-600"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center space-x-3">
                <Icon size={20} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  item.name === "İletişim Merkezi" 
                    ? "bg-alert-500 text-white"
                    : "bg-emergency-500 text-white"
                )}>
                  {item.badge}
                </span>
              )}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
