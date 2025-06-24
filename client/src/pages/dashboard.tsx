import ModernHeader from "@/components/layout/modern-header";
import EnhancedSidebar from "@/components/layout/enhanced-sidebar";
import ModernStatsCards from "@/components/dashboard/modern-stats-cards";
import ModernMapView from "@/components/dashboard/modern-map-view";
import ModernActiveIncidents from "@/components/dashboard/modern-active-incidents";
import ModernResourceManagement from "@/components/dashboard/modern-resource-management";
import TeamCoordination from "@/components/dashboard/team-coordination";
import ModernQuickActions from "@/components/dashboard/modern-quick-actions";
import EmergencyReportModal from "@/components/dashboard/emergency-report-modal";
import SuppliersMap from "@/components/dashboard/suppliers-map";
import EarthquakeMonitor from "@/components/dashboard/earthquake-monitor";
import WeatherMonitor from "@/components/dashboard/weather-monitor";
import ContainerManagement from "@/components/dashboard/container-management";
import CityManagement from "@/components/dashboard/city-management";
import MobileUsersManagement from "@/components/dashboard/mobile-users-management";
import { useState } from "react";

export default function Dashboard() {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");

  const renderMainContent = () => {
    switch(activeView) {
      case "mobile-users":
        return <MobileUsersManagement />;
      default:
        return (
          <>
            {/* Hero Stats Section */}
            <div className="animate-fade-in">
              <ModernStatsCards />
            </div>
            
            {/* Primary Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-slide-up">
              {/* Main Map & Incidents */}
              <div className="xl:col-span-8 space-y-6">
                <ModernMapView />
                
                {/* Secondary Operations Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ModernResourceManagement />
                  <TeamCoordination />
                </div>
              </div>
              
              {/* Side Panel */}
              <div className="xl:col-span-4 space-y-6">
                <ModernActiveIncidents />
                <ModernQuickActions />
              </div>
            </div>

            {/* Monitoring Systems Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              <EarthquakeMonitor />
              <WeatherMonitor />
              <SuppliersMap />
            </div>

            {/* Management Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
              <ContainerManagement />
              <CityManagement />
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <ModernHeader onOpenEmergencyReport={() => setShowEmergencyModal(true)} />
      
      <div className="flex pt-16">
        <EnhancedSidebar onNavigate={setActiveView} />
        
        <main className="flex-1 ml-72 overflow-y-auto p-6 space-y-6">
          {renderMainContent()}
        </main>
      </div>

      <EmergencyReportModal 
        open={showEmergencyModal} 
        onOpenChange={setShowEmergencyModal} 
      />
    </div>
  );
}
