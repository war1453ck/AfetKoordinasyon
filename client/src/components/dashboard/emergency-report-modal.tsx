import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertIncidentSchema } from "@shared/schema";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = insertIncidentSchema.extend({
  type: z.enum(["fire", "accident", "flood", "medical", "security", "power_outage", "other"]),
  priority: z.enum(["critical", "high", "medium", "low"]),
});

type FormData = z.infer<typeof formSchema>;

interface EmergencyReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EmergencyReportModal({ 
  open, 
  onOpenChange 
}: EmergencyReportModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "active",
      reportedBy: 1, // Would come from auth context in real app
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await apiRequest("POST", "/api/incidents", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/incidents"] });
      queryClient.invalidateQueries({ queryKey: ["/api/incidents/active"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      toast({
        title: "Başarılı",
        description: "Acil durum raporu başarıyla oluşturuldu.",
      });
      reset();
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Rapor oluşturulurken bir hata oluştu.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const incidentTypes = [
    { value: "fire", label: "Yangın" },
    { value: "accident", label: "Trafik Kazası" },
    { value: "flood", label: "Doğal Afet" },
    { value: "medical", label: "Sağlık Acili" },
    { value: "security", label: "Güvenlik Sorunu" },
    { value: "power_outage", label: "Güç Kesintisi" },
    { value: "other", label: "Diğer" },
  ];

  const priorityLevels = [
    { value: "critical", label: "Kritik", color: "text-red-600" },
    { value: "high", label: "Yüksek" },
    { value: "medium", label: "Orta" },
    { value: "low", label: "Düşük" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Acil Durum Bildir</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="type">Olay Türü</Label>
            <Select onValueChange={(value) => setValue("type", value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Olay türünü seçin" />
              </SelectTrigger>
              <SelectContent>
                {incidentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-red-600 mt-1">{errors.type.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="priority">Öncelik Seviyesi</Label>
            <Select onValueChange={(value) => setValue("priority", value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Öncelik seviyesini seçin" />
              </SelectTrigger>
              <SelectContent>
                {priorityLevels.map((priority) => (
                  <SelectItem 
                    key={priority.value} 
                    value={priority.value}
                    className={priority.color}
                  >
                    {priority.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-sm text-red-600 mt-1">{errors.priority.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="title">Olay Başlığı</Label>
            <Input
              id="title"
              placeholder="Kısa bir başlık girin"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="location">Konum</Label>
            <Input
              id="location"
              placeholder="Adres veya koordinat girin"
              {...register("location")}
            />
            {errors.location && (
              <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Açıklama</Label>
            <Textarea
              id="description"
              rows={3}
              placeholder="Olay detaylarını açıklayın..."
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contactPhone">İletişim</Label>
            <Input
              id="contactPhone"
              type="tel"
              placeholder="Telefon numarası"
              {...register("contactPhone")}
            />
            {errors.contactPhone && (
              <p className="text-sm text-red-600 mt-1">{errors.contactPhone.message}</p>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              İptal
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-emergency-500 hover:bg-emergency-600"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Gönderiliyor..." : "Rapor Et"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
