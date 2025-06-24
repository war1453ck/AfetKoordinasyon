import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import StatsCards from "@/components/dashboard/stats-cards";
import MapView from "@/components/dashboard/map-view";
import ActiveIncidents from "@/components/dashboard/active-incidents";
import ResourceManagement from "@/components/dashboard/resource-management";
import TeamCoordination from "@/components/dashboard/team-coordination";
import QuickActions from "@/components/dashboard/quick-actions";
import EmergencyReportModal from "@/components/dashboard/emergency-report-modal";
import SuppliersMap from "@/components/dashboard/suppliers-map";
import EarthquakeMonitor from "@/components/dashboard/earthquake-monitor";
import WeatherMonitor from "@/components/dashboard/weather-monitor";
import ContainerManagement from "@/components/dashboard/container-management";
import CityManagement from "@/components/dashboard/city-management";
import { useState } from "react";

export default function Dashboard() {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header onOpenEmergencyReport={() => setShowEmergencyModal(true)} />
      
      <div className="flex pt-16">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <StatsCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <MapView />
            </div>
            <div>
              <ActiveIncidents />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ResourceManagement />
            <TeamCoordination />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <EarthquakeMonitor />
            <WeatherMonitor />
            <SuppliersMap />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ContainerManagement />
            <CityManagement />
          </div>

          <QuickActions />
        </main>
      </div>

      <EmergencyReportModal 
        open={showEmergencyModal} 
        onOpenChange={setShowEmergencyModal} 
      />
    </div>
  );
}
