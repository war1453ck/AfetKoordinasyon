import { Bell, Plus, Search, Settings, Shield, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface ModernHeaderProps {
  onOpenEmergencyReport: () => void;
}

export default function ModernHeader({ onOpenEmergencyReport }: ModernHeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-64 lg:left-64 sm:left-16 z-40 professional-header">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {/* Mobile menu toggle will be handled via prop */}}
            className="lg:hidden text-slate-600 hover:text-slate-900"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="bg-gradient-emergency p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AFET KOORDİNASYON</h1>
              <p className="text-xs text-muted-foreground">Acil Durum Yönetim Sistemi</p>
            </div>
          </div>
        </div>

        {/* Center Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Vaka, ekip veya kaynak arayın..." 
              className="pl-10 bg-muted/50 border-border/50 focus:bg-background"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Emergency Button */}
          <Button 
            onClick={onOpenEmergencyReport}
            className="btn-emergency gap-2 animate-pulse-slow"
          >
            <Plus className="w-4 h-4" />
            ACİL RAPOR
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-600 text-white text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Bildirimler</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Yeni yangın vakası</p>
                  <p className="text-xs text-muted-foreground">Beşiktaş'ta yeni vaka bildirimi - 2 dk önce</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Kaynak atama</p>
                  <p className="text-xs text-muted-foreground">İtfaiye-02 sahaya sevk edildi - 5 dk önce</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Sistem güncellemesi</p>
                  <p className="text-xs text-muted-foreground">Harita verileri güncellendi - 10 dk önce</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mehmet Yılmaz</DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Koordinatör
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Ayarlar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Çıkış Yap</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}