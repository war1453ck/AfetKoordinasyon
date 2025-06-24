import { Button } from "@/components/ui/button";
import { Shield, Plus, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface HeaderProps {
  onOpenEmergencyReport: () => void;
}

export default function Header({ onOpenEmergencyReport }: HeaderProps) {
  const { data: stats } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return (
    <header className="bg-white shadow-sm border-b-2 border-emergency-500 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="text-emergency-500 text-2xl" size={28} />
              <h1 className="text-xl font-bold text-gray-900">AFET KOORDİNASYON PANELİ</h1>
            </div>
            <div className="flex items-center space-x-2 bg-emergency-50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-emergency-500 rounded-full pulse-red"></div>
              <span className="text-sm font-medium text-emergency-600">
                {stats?.activeEmergencies || 0} Aktif Olay
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              onClick={onOpenEmergencyReport}
              className="bg-emergency-500 hover:bg-emergency-600 text-white font-medium"
            >
              <Plus className="mr-2" size={16} />
              Acil Durum Bildir
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="text-gray-600" size={16} />
              </div>
              <span className="text-sm font-medium text-gray-700">Mehmet Yılmaz</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
