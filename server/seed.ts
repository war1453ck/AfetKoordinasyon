import { db } from "./db";
import { 
  users, incidents, resources, teams, suppliers, earthquakes, weatherData, containers, cityManagement 
} from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(cityManagement);
  await db.delete(containers);
  await db.delete(weatherData);
  await db.delete(earthquakes);
  await db.delete(suppliers);
  await db.delete(teams);
  await db.delete(resources);
  await db.delete(incidents);
  await db.delete(users);

  // Insert sample user
  await db.insert(users).values({
    username: "admin",
    password: "admin123",
    name: "Mehmet Yılmaz",
    role: "coordinator"
  });

  // Insert sample incidents
  await db.insert(incidents).values([
    {
      title: "Beşiktaş'ta Yangın",
      description: "Çok katlı binada yangın çıktı",
      type: "fire",
      priority: "critical",
      status: "active",
      location: "Barbaros Bulvarı No:142, Beşiktaş",
      latitude: "41.0428",
      longitude: "29.0044",
      contactPhone: "+90 555 123 4567",
      reportedBy: 1,
    },
    {
      title: "Trafik Kazası",
      description: "E-5 karayolunda zincirleme kaza",
      type: "accident",
      priority: "high",
      status: "active",
      location: "E-5 Karayolu, Bakırköy",
      latitude: "40.9833",
      longitude: "28.8667",
      contactPhone: "+90 555 987 6543",
      reportedBy: 1,
    },
    {
      title: "Su Baskını",
      description: "Yoğun yağış nedeniyle su baskını",
      type: "flood",
      priority: "medium",
      status: "active",
      location: "Fatih, Eminönü Meydanı",
      latitude: "41.0167",
      longitude: "28.9667",
      contactPhone: "+90 555 246 8135",
      reportedBy: 1,
    },
    {
      title: "Güç Kesintisi",
      description: "Bölgesel elektrik kesintisi",
      type: "power_outage",
      priority: "low",
      status: "monitoring",
      location: "Kadıköy, Moda Mahallesi",
      latitude: "40.9833",
      longitude: "29.0333",
      contactPhone: "+90 555 369 2580",
      reportedBy: 1,
    }
  ]);

  // Insert sample resources
  await db.insert(resources).values([
    { name: "İtfaiye-01", type: "fire_truck", status: "active", currentLocation: "Beşiktaş", assignedIncident: 1, capacity: 6 },
    { name: "İtfaiye-02", type: "fire_truck", status: "active", currentLocation: "Merkez", assignedIncident: null, capacity: 6 },
    { name: "Ambulans-01", type: "ambulance", status: "active", currentLocation: "Bakırköy", assignedIncident: 2, capacity: 2 },
    { name: "Ambulans-02", type: "ambulance", status: "active", currentLocation: "Kadıköy", assignedIncident: null, capacity: 2 },
    { name: "Polis-01", type: "police_car", status: "active", currentLocation: "Fatih", assignedIncident: 3, capacity: 4 },
    { name: "Helikopter-01", type: "helicopter", status: "active", currentLocation: "Hava Üssü", assignedIncident: null, capacity: 8 },
  ]);

  // Insert sample teams
  await db.insert(teams).values([
    { name: "İtfaiye Ekibi-1", type: "fire", status: "active", currentTask: "Beşiktaş Yangın Müdahalesi", assignedIncident: 1, memberCount: 6 },
    { name: "Sağlık Ekibi-3", type: "medical", status: "active", currentTask: "Bakırköy Trafik Kazası", assignedIncident: 2, memberCount: 4 },
    { name: "Gönüllü Ekibi-7", type: "volunteer", status: "active", currentTask: "Fatih Su Baskını Desteği", assignedIncident: 3, memberCount: 12 },
    { name: "Güvenlik Ekibi-2", type: "security", status: "available", currentTask: "Beklemede", assignedIncident: null, memberCount: 8 },
  ]);

  // Insert sample suppliers
  await db.insert(suppliers).values([
    { name: "Metro Gıda Tedarik", type: "food", contactPerson: "Ahmet Kaya", phone: "+90 212 555 1001", email: "ahmet@metrogida.com", address: "Maslak Mah. Büyükdere Cad. No:123", latitude: "41.1086", longitude: "29.0119", capacity: 5000, status: "active" },
    { name: "Sağlık Malzeme AŞ", type: "medical", contactPerson: "Dr. Fatma Özkan", phone: "+90 212 555 2002", email: "fatma@saglikmalzeme.com", address: "Şişli İş Merkezi A Blok", latitude: "41.0609", longitude: "28.9837", capacity: 2000, status: "active" },
    { name: "Acil Barınak Sistemleri", type: "shelter", contactPerson: "Mehmet Demir", phone: "+90 212 555 3003", email: "mehmet@acilbarinak.com", address: "Zeytinburnu Sanayi Sitesi", latitude: "40.9897", longitude: "28.9037", capacity: 1000, status: "active" },
    { name: "Türkiye Petrolleri", type: "fuel", contactPerson: "Selim Yılmaz", phone: "+90 212 555 4004", email: "selim@tpetrol.com", address: "4.Levent Plaza", latitude: "41.0851", longitude: "29.0069", capacity: 10000, status: "active" },
  ]);

  // Insert sample earthquakes
  await db.insert(earthquakes).values([
    { magnitude: "4.2", depth: "8.5", location: "Marmara Denizi", latitude: "40.7614", longitude: "28.9744", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), source: "AFAD" },
    { magnitude: "3.8", depth: "12.3", location: "Çanakkale - Ayvacık", latitude: "39.6043", longitude: "26.3978", timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), source: "AFAD" },
    { magnitude: "2.9", depth: "6.1", location: "Bursa - Mudanya", latitude: "40.3765", longitude: "28.8826", timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), source: "AFAD" },
  ]);

  // Insert sample weather data
  await db.insert(weatherData).values([
    { location: "İstanbul Merkez", latitude: "41.0082", longitude: "28.9784", temperature: "15.2", humidity: 78, windSpeed: "12.5", windDirection: 245, pressure: "1013.25", condition: "cloudy", visibility: "8.5", timestamp: new Date() },
    { location: "Ankara", latitude: "39.9334", longitude: "32.8597", temperature: "8.7", humidity: 65, windSpeed: "8.2", windDirection: 180, pressure: "1015.80", condition: "sunny", visibility: "12.0", timestamp: new Date() },
    { location: "İzmir", latitude: "38.4237", longitude: "27.1428", temperature: "18.9", humidity: 82, windSpeed: "15.3", windDirection: 290, pressure: "1011.45", condition: "rainy", visibility: "6.2", timestamp: new Date() },
  ]);

  // Insert sample containers
  await db.insert(containers).values([
    { containerNumber: "HSG-001", type: "housing", capacity: 4, currentOccupancy: 0, location: "Zeytinburnu Geçici Yerleşim", latitude: "40.9897", longitude: "28.9037", status: "available", assignedIncident: null, facilities: ["electricity", "water", "heating"] },
    { containerNumber: "MED-001", type: "medical", capacity: 1, currentOccupancy: 0, location: "Bakırköy Sağlık Kampüsü", latitude: "40.9833", longitude: "28.8667", status: "available", assignedIncident: null, facilities: ["electricity", "water", "medical_equipment"] },
    { containerNumber: "STG-001", type: "storage", capacity: 100, currentOccupancy: 45, location: "Hadımköy Lojistik Merkezi", latitude: "41.1970", longitude: "28.6558", status: "occupied", assignedIncident: null, facilities: ["electricity", "security"] },
    { containerNumber: "OFF-001", type: "office", capacity: 8, currentOccupancy: 0, location: "Maslak Koordinasyon Merkezi", latitude: "41.1086", longitude: "29.0119", status: "available", assignedIncident: null, facilities: ["electricity", "water", "internet"] },
  ]);

  // Insert sample city management data
  await db.insert(cityManagement).values([
    { district: "Beşiktaş", population: 190000, emergencyPersonnel: 85, shelterCapacity: 2500, currentSheltered: 0, availableResources: ["fire_truck", "ambulance", "police_car"], riskLevel: "high" },
    { district: "Bakırköy", population: 220000, emergencyPersonnel: 92, shelterCapacity: 3200, currentSheltered: 12, availableResources: ["ambulance", "police_car"], riskLevel: "medium" },
    { district: "Fatih", population: 430000, emergencyPersonnel: 156, shelterCapacity: 4800, currentSheltered: 8, availableResources: ["fire_truck", "police_car"], riskLevel: "medium" },
    { district: "Kadıköy", population: 467000, emergencyPersonnel: 178, shelterCapacity: 5100, currentSheltered: 0, availableResources: ["ambulance", "helicopter"], riskLevel: "low" },
  ]);

  console.log("Database seeded successfully!");
}

seed().catch(console.error);