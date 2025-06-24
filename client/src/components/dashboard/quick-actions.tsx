import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Truck, 
  Users, 
  Radio, 
  PlusCircle, 
  FileText 
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      name: "Genel Alarm",
      icon: Bell,
      color: "bg-emergency-50 hover:bg-emergency-100 text-emergency-500",
      action: () => console.log("Genel alarm tetiklendi"),
    },
    {
      name: "Kaynak Sevk",
      icon: Truck,
      color: "bg-blue-50 hover:bg-blue-100 text-blue-500",
      action: () => console.log("Kaynak sevk edildi"),
    },
    {
      name: "Gönüllü Çağrı",
      icon: Users,
      color: "bg-green-50 hover:bg-green-100 text-green-500",
      action: () => console.log("Gönüllüler çağrıldı"),
    },
    {
      name: "Duyuru",
      icon: Radio,
      color: "bg-purple-50 hover:bg-purple-100 text-purple-500",
      action: () => console.log("Duyuru gönderildi"),
    },
    {
      name: "Destek Talep",
      icon: PlusCircle,
      color: "bg-yellow-50 hover:bg-yellow-100 text-yellow-500",
      action: () => console.log("Destek talep edildi"),
    },
    {
      name: "Rapor Oluştur",
      icon: FileText,
      color: "bg-indigo-50 hover:bg-indigo-100 text-indigo-500",
      action: () => console.log("Rapor oluşturuldu"),
    },
  ];

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900">Hızlı İşlemler</h2>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className={`flex flex-col items-center p-4 h-auto ${action.color} transition-colors`}
                onClick={action.action}
              >
                <Icon size={24} className="mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  {action.name}
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
