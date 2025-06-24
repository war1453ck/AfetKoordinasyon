import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function SuppliersMap() {
  const { data: suppliers, isLoading } = useQuery({
    queryKey: ["/api/suppliers"],
    refetchInterval: 60000,
  });

  const getSupplierTypeLabel = (type: string) => {
    switch (type) {
      case "food":
        return "Gıda";
      case "medical":
        return "Tıbbi Malzeme";
      case "shelter":
        return "Barınak";
      case "fuel":
        return "Yakıt";
      default:
        return "Diğer";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "food":
        return "bg-green-100 text-green-800";
      case "medical":
        return "bg-blue-100 text-blue-800";
      case "shelter":
        return "bg-purple-100 text-purple-800";
      case "fuel":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Tedarikçi Haritası</h2>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Tedarikçi Haritası</h2>
          <Button variant="outline" size="sm">
            Harita Görünümü
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {suppliers?.map((supplier) => (
            <div
              key={supplier.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Package className="text-gray-400" size={16} />
                    <h4 className="font-medium text-gray-900">{supplier.name}</h4>
                    <Badge className={getTypeColor(supplier.type)}>
                      {getSupplierTypeLabel(supplier.type)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin size={12} />
                      <span>{supplier.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={12} />
                      <span>{supplier.phone}</span>
                    </div>
                    {supplier.email && (
                      <div className="flex items-center space-x-2">
                        <Mail size={12} />
                        <span>{supplier.email}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Kapasite: {supplier.capacity.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">
                      İletişim: {supplier.contactPerson}
                    </span>
                  </div>
                </div>
                
                <div className="ml-4">
                  <Button variant="ghost" size="sm" className="text-emergency-600 hover:text-emergency-700">
                    İletişim
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full text-sm text-emergency-600 hover:text-emergency-700 font-medium">
            Yeni Tedarikçi Ekle
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}