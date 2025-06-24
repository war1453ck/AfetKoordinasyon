import { 
  users, incidents, resources, teams, suppliers, earthquakes, weatherData, containers, cityManagement,
  mobileUsers, emergencyAlerts, userLocations,
  type User, type InsertUser, type Incident, type InsertIncident, type Resource, type InsertResource, 
  type Team, type InsertTeam, type Supplier, type InsertSupplier, type Earthquake, type InsertEarthquake,
  type WeatherData, type InsertWeatherData, type Container, type InsertContainer, 
  type CityManagement, type InsertCityManagement, type MobileUser, type InsertMobileUser,
  type EmergencyAlert, type InsertEmergencyAlert, type UserLocation, type InsertUserLocation
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Incidents
  getAllIncidents(): Promise<Incident[]>;
  getIncident(id: number): Promise<Incident | undefined>;
  createIncident(incident: InsertIncident): Promise<Incident>;
  updateIncident(id: number, incident: Partial<Incident>): Promise<Incident | undefined>;
  getActiveIncidents(): Promise<Incident[]>;

  // Resources
  getAllResources(): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  updateResource(id: number, resource: Partial<Resource>): Promise<Resource | undefined>;
  getResourcesByType(type: string): Promise<Resource[]>;

  // Teams
  getAllTeams(): Promise<Team[]>;
  getTeam(id: number): Promise<Team | undefined>;
  createTeam(team: InsertTeam): Promise<Team>;
  updateTeam(id: number, team: Partial<Team>): Promise<Team | undefined>;
  getActiveTeams(): Promise<Team[]>;

  // Suppliers
  getAllSuppliers(): Promise<Supplier[]>;
  getSupplier(id: number): Promise<Supplier | undefined>;
  createSupplier(supplier: InsertSupplier): Promise<Supplier>;
  updateSupplier(id: number, supplier: Partial<Supplier>): Promise<Supplier | undefined>;
  getSuppliersByType(type: string): Promise<Supplier[]>;

  // Earthquakes
  getAllEarthquakes(): Promise<Earthquake[]>;
  getEarthquake(id: number): Promise<Earthquake | undefined>;
  createEarthquake(earthquake: InsertEarthquake): Promise<Earthquake>;
  getRecentEarthquakes(hours: number): Promise<Earthquake[]>;

  // Weather Data
  getAllWeatherData(): Promise<WeatherData[]>;
  getWeatherData(id: number): Promise<WeatherData | undefined>;
  createWeatherData(weather: InsertWeatherData): Promise<WeatherData>;
  getCurrentWeather(location: string): Promise<WeatherData | undefined>;

  // Containers
  getAllContainers(): Promise<Container[]>;
  getContainer(id: number): Promise<Container | undefined>;
  createContainer(container: InsertContainer): Promise<Container>;
  updateContainer(id: number, container: Partial<Container>): Promise<Container | undefined>;
  getContainersByType(type: string): Promise<Container[]>;
  getAvailableContainers(): Promise<Container[]>;

  // City Management
  getAllCityManagement(): Promise<CityManagement[]>;
  getCityManagement(id: number): Promise<CityManagement | undefined>;
  createCityManagement(city: InsertCityManagement): Promise<CityManagement>;
  updateCityManagement(id: number, city: Partial<CityManagement>): Promise<CityManagement | undefined>;
  getCityByDistrict(district: string): Promise<CityManagement | undefined>;

  // Mobile Users
  getAllMobileUsers(): Promise<MobileUser[]>;
  getMobileUser(id: number): Promise<MobileUser | undefined>;
  getMobileUserByPhone(phoneNumber: string): Promise<MobileUser | undefined>;
  createMobileUser(user: InsertMobileUser): Promise<MobileUser>;
  updateMobileUser(id: number, user: Partial<MobileUser>): Promise<MobileUser | undefined>;
  getMobileUsersByDistrict(district: string): Promise<MobileUser[]>;
  getActiveMobileUsers(): Promise<MobileUser[]>;

  // Emergency Alerts
  getAllEmergencyAlerts(): Promise<EmergencyAlert[]>;
  getEmergencyAlert(id: number): Promise<EmergencyAlert | undefined>;
  createEmergencyAlert(alert: InsertEmergencyAlert): Promise<EmergencyAlert>;
  updateEmergencyAlert(id: number, alert: Partial<EmergencyAlert>): Promise<EmergencyAlert | undefined>;
  getActiveAlerts(): Promise<EmergencyAlert[]>;
  getAlertsByDistrict(district: string): Promise<EmergencyAlert[]>;

  // User Locations
  getAllUserLocations(): Promise<UserLocation[]>;
  getUserLocation(id: number): Promise<UserLocation | undefined>;
  createUserLocation(location: InsertUserLocation): Promise<UserLocation>;
  getLocationsByUser(mobileUserId: number): Promise<UserLocation[]>;
  getEmergencyLocations(): Promise<UserLocation[]>;
  getLocationsByDistrict(district: string): Promise<UserLocation[]>;
  getRecentLocations(hours: number): Promise<UserLocation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private incidents: Map<number, Incident>;
  private resources: Map<number, Resource>;
  private teams: Map<number, Team>;
  private suppliers: Map<number, Supplier>;
  private earthquakes: Map<number, Earthquake>;
  private weatherData: Map<number, WeatherData>;
  private containers: Map<number, Container>;
  private cityManagement: Map<number, CityManagement>;
  private currentUserId: number;
  private currentIncidentId: number;
  private currentResourceId: number;
  private currentTeamId: number;
  private currentSupplierId: number;
  private currentEarthquakeId: number;
  private currentWeatherId: number;
  private currentContainerId: number;
  private currentCityId: number;
  private mobileUsers: Map<number, MobileUser>;
  private emergencyAlerts: Map<number, EmergencyAlert>;
  private userLocations: Map<number, UserLocation>;
  private currentMobileUserId: number;
  private currentAlertId: number;
  private currentLocationId: number;

  constructor() {
    this.users = new Map();
    this.incidents = new Map();
    this.resources = new Map();
    this.teams = new Map();
    this.suppliers = new Map();
    this.earthquakes = new Map();
    this.weatherData = new Map();
    this.containers = new Map();
    this.cityManagement = new Map();
    this.currentUserId = 1;
    this.currentIncidentId = 1;
    this.currentResourceId = 1;
    this.currentTeamId = 1;
    this.currentSupplierId = 1;
    this.currentEarthquakeId = 1;
    this.currentWeatherId = 1;
    this.currentContainerId = 1;
    this.currentCityId = 1;
    this.mobileUsers = new Map();
    this.emergencyAlerts = new Map();
    this.userLocations = new Map();
    this.currentMobileUserId = 1;
    this.currentAlertId = 1;
    this.currentLocationId = 1;

    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample data
    const sampleUser: User = {
      id: 1,
      username: "admin",
      password: "admin123",
      name: "Mehmet Yılmaz",
      role: "coordinator"
    };
    this.users.set(1, sampleUser);
    this.currentUserId = 2;

    // Sample incidents
    const sampleIncidents: Incident[] = [
      {
        id: 1,
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
        createdAt: new Date(Date.now() - 8 * 60 * 1000),
        updatedAt: new Date(Date.now() - 8 * 60 * 1000),
      },
      {
        id: 2,
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
        createdAt: new Date(Date.now() - 15 * 60 * 1000),
        updatedAt: new Date(Date.now() - 15 * 60 * 1000),
      },
      {
        id: 3,
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
        createdAt: new Date(Date.now() - 32 * 60 * 1000),
        updatedAt: new Date(Date.now() - 32 * 60 * 1000),
      },
      {
        id: 4,
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
        createdAt: new Date(Date.now() - 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 60 * 60 * 1000),
      }
    ];

    sampleIncidents.forEach(incident => {
      this.incidents.set(incident.id, incident);
    });
    this.currentIncidentId = 5;

    // Sample resources
    const sampleResources: Resource[] = [
      { id: 1, name: "İtfaiye-01", type: "fire_truck", status: "active", currentLocation: "Beşiktaş", assignedIncident: 1, capacity: 6, createdAt: new Date() },
      { id: 2, name: "İtfaiye-02", type: "fire_truck", status: "active", currentLocation: "Merkez", assignedIncident: null, capacity: 6, createdAt: new Date() },
      { id: 3, name: "Ambulans-01", type: "ambulance", status: "active", currentLocation: "Bakırköy", assignedIncident: 2, capacity: 2, createdAt: new Date() },
      { id: 4, name: "Ambulans-02", type: "ambulance", status: "active", currentLocation: "Kadıköy", assignedIncident: null, capacity: 2, createdAt: new Date() },
      { id: 5, name: "Polis-01", type: "police_car", status: "active", currentLocation: "Fatih", assignedIncident: 3, capacity: 4, createdAt: new Date() },
      { id: 6, name: "Helikopter-01", type: "helicopter", status: "active", currentLocation: "Hava Üssü", assignedIncident: null, capacity: 8, createdAt: new Date() },
    ];

    sampleResources.forEach(resource => {
      this.resources.set(resource.id, resource);
    });
    this.currentResourceId = 7;

    // Sample teams
    const sampleTeams: Team[] = [
      { id: 1, name: "İtfaiye Ekibi-1", type: "fire", status: "active", currentTask: "Beşiktaş Yangın Müdahalesi", assignedIncident: 1, memberCount: 6, createdAt: new Date() },
      { id: 2, name: "Sağlık Ekibi-3", type: "medical", status: "active", currentTask: "Bakırköy Trafik Kazası", assignedIncident: 2, memberCount: 4, createdAt: new Date() },
      { id: 3, name: "Gönüllü Ekibi-7", type: "volunteer", status: "active", currentTask: "Fatih Su Baskını Desteği", assignedIncident: 3, memberCount: 12, createdAt: new Date() },
      { id: 4, name: "Güvenlik Ekibi-2", type: "security", status: "available", currentTask: "Beklemede", assignedIncident: null, memberCount: 8, createdAt: new Date() },
    ];

    sampleTeams.forEach(team => {
      this.teams.set(team.id, team);
    });
    this.currentTeamId = 5;

    // Sample suppliers
    const sampleSuppliers: Supplier[] = [
      { id: 1, name: "Metro Gıda Tedarik", type: "food", contactPerson: "Ahmet Kaya", phone: "+90 212 555 1001", email: "ahmet@metrogida.com", address: "Maslak Mah. Büyükdere Cad. No:123", latitude: "41.1086", longitude: "29.0119", capacity: 5000, status: "active", createdAt: new Date() },
      { id: 2, name: "Sağlık Malzeme AŞ", type: "medical", contactPerson: "Dr. Fatma Özkan", phone: "+90 212 555 2002", email: "fatma@saglikmalzeme.com", address: "Şişli İş Merkezi A Blok", latitude: "41.0609", longitude: "28.9837", capacity: 2000, status: "active", createdAt: new Date() },
      { id: 3, name: "Acil Barınak Sistemleri", type: "shelter", contactPerson: "Mehmet Demir", phone: "+90 212 555 3003", email: "mehmet@acilbarinak.com", address: "Zeytinburnu Sanayi Sitesi", latitude: "40.9897", longitude: "28.9037", capacity: 1000, status: "active", createdAt: new Date() },
      { id: 4, name: "Türkiye Petrolleri", type: "fuel", contactPerson: "Selim Yılmaz", phone: "+90 212 555 4004", email: "selim@tpetrol.com", address: "4.Levent Plaza", latitude: "41.0851", longitude: "29.0069", capacity: 10000, status: "active", createdAt: new Date() },
    ];

    sampleSuppliers.forEach(supplier => {
      this.suppliers.set(supplier.id, supplier);
    });
    this.currentSupplierId = 5;

    // Sample earthquakes (recent AFAD data simulation)
    const sampleEarthquakes: Earthquake[] = [
      { id: 1, magnitude: "4.2", depth: "8.5", location: "Marmara Denizi", latitude: "40.7614", longitude: "28.9744", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), source: "AFAD", createdAt: new Date() },
      { id: 2, magnitude: "3.8", depth: "12.3", location: "Çanakkale - Ayvacık", latitude: "39.6043", longitude: "26.3978", timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), source: "AFAD", createdAt: new Date() },
      { id: 3, magnitude: "2.9", depth: "6.1", location: "Bursa - Mudanya", latitude: "40.3765", longitude: "28.8826", timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), source: "AFAD", createdAt: new Date() },
    ];

    sampleEarthquakes.forEach(earthquake => {
      this.earthquakes.set(earthquake.id, earthquake);
    });
    this.currentEarthquakeId = 4;

    // Sample weather data
    const sampleWeatherData: WeatherData[] = [
      { id: 1, location: "İstanbul Merkez", latitude: "41.0082", longitude: "28.9784", temperature: "15.2", humidity: 78, windSpeed: "12.5", windDirection: 245, pressure: "1013.25", condition: "cloudy", visibility: "8.5", timestamp: new Date(), createdAt: new Date() },
      { id: 2, location: "Ankara", latitude: "39.9334", longitude: "32.8597", temperature: "8.7", humidity: 65, windSpeed: "8.2", windDirection: 180, pressure: "1015.80", condition: "sunny", visibility: "12.0", timestamp: new Date(), createdAt: new Date() },
      { id: 3, location: "İzmir", latitude: "38.4237", longitude: "27.1428", temperature: "18.9", humidity: 82, windSpeed: "15.3", windDirection: 290, pressure: "1011.45", condition: "rainy", visibility: "6.2", timestamp: new Date(), createdAt: new Date() },
    ];

    sampleWeatherData.forEach(weather => {
      this.weatherData.set(weather.id, weather);
    });
    this.currentWeatherId = 4;

    // Sample containers
    const sampleContainers: Container[] = [
      { id: 1, containerNumber: "HSG-001", type: "housing", capacity: 4, currentOccupancy: 0, location: "Zeytinburnu Geçici Yerleşim", latitude: "40.9897", longitude: "28.9037", status: "available", assignedIncident: null, facilities: ["electricity", "water", "heating"], createdAt: new Date() },
      { id: 2, containerNumber: "MED-001", type: "medical", capacity: 1, currentOccupancy: 0, location: "Bakırköy Sağlık Kampüsü", latitude: "40.9833", longitude: "28.8667", status: "available", assignedIncident: null, facilities: ["electricity", "water", "medical_equipment"], createdAt: new Date() },
      { id: 3, containerNumber: "STG-001", type: "storage", capacity: 100, currentOccupancy: 45, location: "Hadımköy Lojistik Merkezi", latitude: "41.1970", longitude: "28.6558", status: "occupied", assignedIncident: null, facilities: ["electricity", "security"], createdAt: new Date() },
      { id: 4, containerNumber: "OFF-001", type: "office", capacity: 8, currentOccupancy: 0, location: "Maslak Koordinasyon Merkezi", latitude: "41.1086", longitude: "29.0119", status: "available", assignedIncident: null, facilities: ["electricity", "water", "internet"], createdAt: new Date() },
    ];

    sampleContainers.forEach(container => {
      this.containers.set(container.id, container);
    });
    this.currentContainerId = 5;

    // Sample city management data
    const sampleCityManagement: CityManagement[] = [
      { id: 1, district: "Beşiktaş", population: 190000, emergencyPersonnel: 85, shelterCapacity: 2500, currentSheltered: 0, availableResources: ["fire_truck", "ambulance", "police_car"], riskLevel: "high", lastUpdate: new Date(), createdAt: new Date() },
      { id: 2, district: "Bakırköy", population: 220000, emergencyPersonnel: 92, shelterCapacity: 3200, currentSheltered: 12, availableResources: ["ambulance", "police_car"], riskLevel: "medium", lastUpdate: new Date(), createdAt: new Date() },
      { id: 3, district: "Fatih", population: 430000, emergencyPersonnel: 156, shelterCapacity: 4800, currentSheltered: 8, availableResources: ["fire_truck", "police_car"], riskLevel: "medium", lastUpdate: new Date(), createdAt: new Date() },
      { id: 4, district: "Kadıköy", population: 467000, emergencyPersonnel: 178, shelterCapacity: 5100, currentSheltered: 0, availableResources: ["ambulance", "helicopter"], riskLevel: "low", lastUpdate: new Date(), createdAt: new Date() },
    ];

    sampleCityManagement.forEach(city => {
      this.cityManagement.set(city.id, city);
    });
    this.currentCityId = 5;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Incident methods
  async getAllIncidents(): Promise<Incident[]> {
    return Array.from(this.incidents.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getIncident(id: number): Promise<Incident | undefined> {
    return this.incidents.get(id);
  }

  async createIncident(insertIncident: InsertIncident): Promise<Incident> {
    const id = this.currentIncidentId++;
    const now = new Date();
    const incident: Incident = {
      ...insertIncident,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.incidents.set(id, incident);
    return incident;
  }

  async updateIncident(id: number, updates: Partial<Incident>): Promise<Incident | undefined> {
    const incident = this.incidents.get(id);
    if (!incident) return undefined;

    const updatedIncident = { ...incident, ...updates, updatedAt: new Date() };
    this.incidents.set(id, updatedIncident);
    return updatedIncident;
  }

  async getActiveIncidents(): Promise<Incident[]> {
    return Array.from(this.incidents.values())
      .filter(incident => incident.status === "active")
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Resource methods
  async getAllResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getResource(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.currentResourceId++;
    const resource: Resource = {
      ...insertResource,
      id,
      createdAt: new Date(),
    };
    this.resources.set(id, resource);
    return resource;
  }

  async updateResource(id: number, updates: Partial<Resource>): Promise<Resource | undefined> {
    const resource = this.resources.get(id);
    if (!resource) return undefined;

    const updatedResource = { ...resource, ...updates };
    this.resources.set(id, updatedResource);
    return updatedResource;
  }

  async getResourcesByType(type: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(resource => resource.type === type);
  }

  // Team methods
  async getAllTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }

  async getTeam(id: number): Promise<Team | undefined> {
    return this.teams.get(id);
  }

  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const id = this.currentTeamId++;
    const team: Team = {
      ...insertTeam,
      id,
      createdAt: new Date(),
    };
    this.teams.set(id, team);
    return team;
  }

  async updateTeam(id: number, updates: Partial<Team>): Promise<Team | undefined> {
    const team = this.teams.get(id);
    if (!team) return undefined;

    const updatedTeam = { ...team, ...updates };
    this.teams.set(id, updatedTeam);
    return updatedTeam;
  }

  async getActiveTeams(): Promise<Team[]> {
    return Array.from(this.teams.values()).filter(team => team.status === "active");
  }

  // Supplier methods
  async getAllSuppliers(): Promise<Supplier[]> {
    return Array.from(this.suppliers.values());
  }

  async getSupplier(id: number): Promise<Supplier | undefined> {
    return this.suppliers.get(id);
  }

  async createSupplier(insertSupplier: InsertSupplier): Promise<Supplier> {
    const id = this.currentSupplierId++;
    const supplier: Supplier = {
      ...insertSupplier,
      id,
      createdAt: new Date(),
    };
    this.suppliers.set(id, supplier);
    return supplier;
  }

  async updateSupplier(id: number, updates: Partial<Supplier>): Promise<Supplier | undefined> {
    const supplier = this.suppliers.get(id);
    if (!supplier) return undefined;

    const updatedSupplier = { ...supplier, ...updates };
    this.suppliers.set(id, updatedSupplier);
    return updatedSupplier;
  }

  async getSuppliersByType(type: string): Promise<Supplier[]> {
    return Array.from(this.suppliers.values()).filter(supplier => supplier.type === type);
  }

  // Earthquake methods
  async getAllEarthquakes(): Promise<Earthquake[]> {
    return Array.from(this.earthquakes.values()).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getEarthquake(id: number): Promise<Earthquake | undefined> {
    return this.earthquakes.get(id);
  }

  async createEarthquake(insertEarthquake: InsertEarthquake): Promise<Earthquake> {
    const id = this.currentEarthquakeId++;
    const earthquake: Earthquake = {
      ...insertEarthquake,
      id,
      createdAt: new Date(),
    };
    this.earthquakes.set(id, earthquake);
    return earthquake;
  }

  async getRecentEarthquakes(hours: number): Promise<Earthquake[]> {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    return Array.from(this.earthquakes.values())
      .filter(earthquake => earthquake.timestamp >= cutoffTime)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // Weather data methods
  async getAllWeatherData(): Promise<WeatherData[]> {
    return Array.from(this.weatherData.values()).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getWeatherData(id: number): Promise<WeatherData | undefined> {
    return this.weatherData.get(id);
  }

  async createWeatherData(insertWeatherData: InsertWeatherData): Promise<WeatherData> {
    const id = this.currentWeatherId++;
    const weather: WeatherData = {
      ...insertWeatherData,
      id,
      createdAt: new Date(),
    };
    this.weatherData.set(id, weather);
    return weather;
  }

  async getCurrentWeather(location: string): Promise<WeatherData | undefined> {
    return Array.from(this.weatherData.values())
      .filter(weather => weather.location.toLowerCase().includes(location.toLowerCase()))
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
  }

  // Container methods
  async getAllContainers(): Promise<Container[]> {
    return Array.from(this.containers.values());
  }

  async getContainer(id: number): Promise<Container | undefined> {
    return this.containers.get(id);
  }

  async createContainer(insertContainer: InsertContainer): Promise<Container> {
    const id = this.currentContainerId++;
    const container: Container = {
      ...insertContainer,
      id,
      createdAt: new Date(),
    };
    this.containers.set(id, container);
    return container;
  }

  async updateContainer(id: number, updates: Partial<Container>): Promise<Container | undefined> {
    const container = this.containers.get(id);
    if (!container) return undefined;

    const updatedContainer = { ...container, ...updates };
    this.containers.set(id, updatedContainer);
    return updatedContainer;
  }

  async getContainersByType(type: string): Promise<Container[]> {
    return Array.from(this.containers.values()).filter(container => container.type === type);
  }

  async getAvailableContainers(): Promise<Container[]> {
    return Array.from(this.containers.values()).filter(container => container.status === "available");
  }

  // City management methods
  async getAllCityManagement(): Promise<CityManagement[]> {
    return Array.from(this.cityManagement.values());
  }

  async getCityManagement(id: number): Promise<CityManagement | undefined> {
    return this.cityManagement.get(id);
  }

  async createCityManagement(insertCityManagement: InsertCityManagement): Promise<CityManagement> {
    const id = this.currentCityId++;
    const city: CityManagement = {
      ...insertCityManagement,
      id,
      lastUpdate: new Date(),
      createdAt: new Date(),
    };
    this.cityManagement.set(id, city);
    return city;
  }

  async updateCityManagement(id: number, updates: Partial<CityManagement>): Promise<CityManagement | undefined> {
    const city = this.cityManagement.get(id);
    if (!city) return undefined;

    const updatedCity = { ...city, ...updates, lastUpdate: new Date() };
    this.cityManagement.set(id, updatedCity);
    return updatedCity;
  }

  async getCityByDistrict(district: string): Promise<CityManagement | undefined> {
    return Array.from(this.cityManagement.values()).find(city => 
      city.district.toLowerCase() === district.toLowerCase()
    );
  }
}

// Database Storage implementation
export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Incidents
  async getAllIncidents(): Promise<Incident[]> {
    return await db.select().from(incidents).orderBy(incidents.createdAt);
  }

  async getIncident(id: number): Promise<Incident | undefined> {
    const [incident] = await db.select().from(incidents).where(eq(incidents.id, id));
    return incident || undefined;
  }

  async createIncident(insertIncident: InsertIncident): Promise<Incident> {
    const [incident] = await db
      .insert(incidents)
      .values(insertIncident)
      .returning();
    return incident;
  }

  async updateIncident(id: number, updates: Partial<Incident>): Promise<Incident | undefined> {
    const [incident] = await db
      .update(incidents)
      .set(updates)
      .where(eq(incidents.id, id))
      .returning();
    return incident || undefined;
  }

  async getActiveIncidents(): Promise<Incident[]> {
    return await db.select().from(incidents).where(eq(incidents.status, "active"));
  }

  // Resources
  async getAllResources(): Promise<Resource[]> {
    return await db.select().from(resources);
  }

  async getResource(id: number): Promise<Resource | undefined> {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id));
    return resource || undefined;
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const [resource] = await db
      .insert(resources)
      .values(insertResource)
      .returning();
    return resource;
  }

  async updateResource(id: number, updates: Partial<Resource>): Promise<Resource | undefined> {
    const [resource] = await db
      .update(resources)
      .set(updates)
      .where(eq(resources.id, id))
      .returning();
    return resource || undefined;
  }

  async getResourcesByType(type: string): Promise<Resource[]> {
    return await db.select().from(resources).where(eq(resources.type, type));
  }

  // Teams
  async getAllTeams(): Promise<Team[]> {
    return await db.select().from(teams);
  }

  async getTeam(id: number): Promise<Team | undefined> {
    const [team] = await db.select().from(teams).where(eq(teams.id, id));
    return team || undefined;
  }

  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const [team] = await db
      .insert(teams)
      .values(insertTeam)
      .returning();
    return team;
  }

  async updateTeam(id: number, updates: Partial<Team>): Promise<Team | undefined> {
    const [team] = await db
      .update(teams)
      .set(updates)
      .where(eq(teams.id, id))
      .returning();
    return team || undefined;
  }

  async getActiveTeams(): Promise<Team[]> {
    return await db.select().from(teams).where(eq(teams.status, "active"));
  }

  // Suppliers
  async getAllSuppliers(): Promise<Supplier[]> {
    return await db.select().from(suppliers);
  }

  async getSupplier(id: number): Promise<Supplier | undefined> {
    const [supplier] = await db.select().from(suppliers).where(eq(suppliers.id, id));
    return supplier || undefined;
  }

  async createSupplier(insertSupplier: InsertSupplier): Promise<Supplier> {
    const [supplier] = await db
      .insert(suppliers)
      .values(insertSupplier)
      .returning();
    return supplier;
  }

  async updateSupplier(id: number, updates: Partial<Supplier>): Promise<Supplier | undefined> {
    const [supplier] = await db
      .update(suppliers)
      .set(updates)
      .where(eq(suppliers.id, id))
      .returning();
    return supplier || undefined;
  }

  async getSuppliersByType(type: string): Promise<Supplier[]> {
    return await db.select().from(suppliers).where(eq(suppliers.type, type));
  }

  // Earthquakes
  async getAllEarthquakes(): Promise<Earthquake[]> {
    return await db.select().from(earthquakes).orderBy(earthquakes.timestamp);
  }

  async getEarthquake(id: number): Promise<Earthquake | undefined> {
    const [earthquake] = await db.select().from(earthquakes).where(eq(earthquakes.id, id));
    return earthquake || undefined;
  }

  async createEarthquake(insertEarthquake: InsertEarthquake): Promise<Earthquake> {
    const [earthquake] = await db
      .insert(earthquakes)
      .values(insertEarthquake)
      .returning();
    return earthquake;
  }

  async getRecentEarthquakes(hours: number): Promise<Earthquake[]> {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    return await db.select().from(earthquakes).where(eq(earthquakes.timestamp, cutoffTime));
  }

  // Weather Data
  async getAllWeatherData(): Promise<WeatherData[]> {
    return await db.select().from(weatherData).orderBy(weatherData.timestamp);
  }

  async getWeatherData(id: number): Promise<WeatherData | undefined> {
    const [weather] = await db.select().from(weatherData).where(eq(weatherData.id, id));
    return weather || undefined;
  }

  async createWeatherData(insertWeatherData: InsertWeatherData): Promise<WeatherData> {
    const [weather] = await db
      .insert(weatherData)
      .values(insertWeatherData)
      .returning();
    return weather;
  }

  async getCurrentWeather(location: string): Promise<WeatherData | undefined> {
    const [weather] = await db.select().from(weatherData).where(eq(weatherData.location, location));
    return weather || undefined;
  }

  // Containers
  async getAllContainers(): Promise<Container[]> {
    return await db.select().from(containers);
  }

  async getContainer(id: number): Promise<Container | undefined> {
    const [container] = await db.select().from(containers).where(eq(containers.id, id));
    return container || undefined;
  }

  async createContainer(insertContainer: InsertContainer): Promise<Container> {
    const [container] = await db
      .insert(containers)
      .values(insertContainer)
      .returning();
    return container;
  }

  async updateContainer(id: number, updates: Partial<Container>): Promise<Container | undefined> {
    const [container] = await db
      .update(containers)
      .set(updates)
      .where(eq(containers.id, id))
      .returning();
    return container || undefined;
  }

  async getContainersByType(type: string): Promise<Container[]> {
    return await db.select().from(containers).where(eq(containers.type, type));
  }

  async getAvailableContainers(): Promise<Container[]> {
    return await db.select().from(containers).where(eq(containers.status, "available"));
  }

  // City Management
  async getAllCityManagement(): Promise<CityManagement[]> {
    return await db.select().from(cityManagement);
  }

  async getCityManagement(id: number): Promise<CityManagement | undefined> {
    const [city] = await db.select().from(cityManagement).where(eq(cityManagement.id, id));
    return city || undefined;
  }

  async createCityManagement(insertCityManagement: InsertCityManagement): Promise<CityManagement> {
    const [city] = await db
      .insert(cityManagement)
      .values(insertCityManagement)
      .returning();
    return city;
  }

  async updateCityManagement(id: number, updates: Partial<CityManagement>): Promise<CityManagement | undefined> {
    const [city] = await db
      .update(cityManagement)
      .set(updates)
      .where(eq(cityManagement.id, id))
      .returning();
    return city || undefined;
  }

  async getCityByDistrict(district: string): Promise<CityManagement | undefined> {
    const [city] = await db.select().from(cityManagement).where(eq(cityManagement.district, district));
    return city || undefined;
  }

  // Mobile Users Implementation for MemStorage
  async getAllMobileUsers(): Promise<MobileUser[]> {
    return Array.from(this.mobileUsers.values());
  }

  async getMobileUser(id: number): Promise<MobileUser | undefined> {
    return this.mobileUsers.get(id);
  }

  async getMobileUserByPhone(phoneNumber: string): Promise<MobileUser | undefined> {
    const users = Array.from(this.mobileUsers.values());
    return users.find(user => user.phoneNumber === phoneNumber);
  }

  async createMobileUser(insertUser: InsertMobileUser): Promise<MobileUser> {
    const id = this.currentMobileUserId++;
    const user: MobileUser = {
      ...insertUser,
      id,
      registeredAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.mobileUsers.set(id, user);
    return user;
  }

  async updateMobileUser(id: number, updates: Partial<MobileUser>): Promise<MobileUser | undefined> {
    const user = this.mobileUsers.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date().toISOString() };
    this.mobileUsers.set(id, updatedUser);
    return updatedUser;
  }

  async getMobileUsersByDistrict(district: string): Promise<MobileUser[]> {
    const users = Array.from(this.mobileUsers.values());
    return users.filter(user => user.district === district);
  }

  async getActiveMobileUsers(): Promise<MobileUser[]> {
    const users = Array.from(this.mobileUsers.values());
    return users.filter(user => user.isActive);
  }

  // Emergency Alerts Implementation
  async getAllEmergencyAlerts(): Promise<EmergencyAlert[]> {
    return Array.from(this.emergencyAlerts.values());
  }

  async getEmergencyAlert(id: number): Promise<EmergencyAlert | undefined> {
    return this.emergencyAlerts.get(id);
  }

  async createEmergencyAlert(insertAlert: InsertEmergencyAlert): Promise<EmergencyAlert> {
    const id = this.currentAlertId++;
    const alert: EmergencyAlert = {
      ...insertAlert,
      id,
      sentAt: new Date().toISOString(),
    };
    this.emergencyAlerts.set(id, alert);
    return alert;
  }

  async updateEmergencyAlert(id: number, updates: Partial<EmergencyAlert>): Promise<EmergencyAlert | undefined> {
    const alert = this.emergencyAlerts.get(id);
    if (!alert) return undefined;
    
    const updatedAlert = { ...alert, ...updates };
    this.emergencyAlerts.set(id, updatedAlert);
    return updatedAlert;
  }

  async getActiveAlerts(): Promise<EmergencyAlert[]> {
    const alerts = Array.from(this.emergencyAlerts.values());
    return alerts.filter(alert => alert.isActive);
  }

  async getAlertsByDistrict(district: string): Promise<EmergencyAlert[]> {
    const alerts = Array.from(this.emergencyAlerts.values());
    return alerts.filter(alert => alert.targetDistricts.includes(district));
  }

  // User Locations Implementation
  async getAllUserLocations(): Promise<UserLocation[]> {
    return Array.from(this.userLocations.values());
  }

  async getUserLocation(id: number): Promise<UserLocation | undefined> {
    return this.userLocations.get(id);
  }

  async createUserLocation(insertLocation: InsertUserLocation): Promise<UserLocation> {
    const id = this.currentLocationId++;
    const location: UserLocation = {
      ...insertLocation,
      id,
      reportedAt: new Date().toISOString(),
    };
    this.userLocations.set(id, location);
    return location;
  }

  async getLocationsByUser(mobileUserId: number): Promise<UserLocation[]> {
    const locations = Array.from(this.userLocations.values());
    return locations.filter(location => location.mobileUserId === mobileUserId);
  }

  async getEmergencyLocations(): Promise<UserLocation[]> {
    const locations = Array.from(this.userLocations.values());
    return locations.filter(location => location.isEmergencyLocation);
  }

  async getLocationsByDistrict(district: string): Promise<UserLocation[]> {
    const locations = Array.from(this.userLocations.values());
    return locations.filter(location => location.district === district);
  }

  async getRecentLocations(hours: number): Promise<UserLocation[]> {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    const locations = Array.from(this.userLocations.values());
    return locations.filter(location => new Date(location.reportedAt) > cutoffTime);
  }

  private initializeMobileUsersData() {
    // Sample mobile users
    const sampleMobileUser1: MobileUser = {
      id: this.currentMobileUserId++,
      phoneNumber: "+90 555 123 4567",
      name: "Ahmet Yılmaz",
      district: "Beşiktaş",
      latitude: "41.0428",
      longitude: "29.0044",
      lastLocationUpdate: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      emergencyContact: "+90 555 987 6543",
      medicalInfo: "Diyabet",
      isActive: true,
      registeredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const sampleMobileUser2: MobileUser = {
      id: this.currentMobileUserId++,
      phoneNumber: "+90 555 234 5678",
      name: "Fatma Özkan",
      district: "Kadıköy",
      latitude: "40.9833",
      longitude: "29.0333",
      lastLocationUpdate: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      emergencyContact: "+90 555 876 5432",
      isActive: true,
      registeredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const sampleMobileUser3: MobileUser = {
      id: this.currentMobileUserId++,
      phoneNumber: "+90 555 345 6789",
      name: "Mehmet Demir",
      district: "Bakırköy",
      latitude: "40.9833",
      longitude: "28.8667",
      lastLocationUpdate: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      emergencyContact: "+90 555 765 4321",
      medicalInfo: "Kalp hastası",
      isActive: true,
      registeredAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.mobileUsers.set(1, sampleMobileUser1);
    this.mobileUsers.set(2, sampleMobileUser2);
    this.mobileUsers.set(3, sampleMobileUser3);

    // Sample user locations
    const sampleLocation1: UserLocation = {
      id: this.currentLocationId++,
      mobileUserId: 1,
      latitude: "41.0428",
      longitude: "29.0044",
      address: "Barbaros Bulvarı No:142, Beşiktaş",
      district: "Beşiktaş",
      isEmergencyLocation: true,
      reportedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      accuracy: "5",
      batteryLevel: 78,
      status: "help_needed"
    };

    const sampleLocation2: UserLocation = {
      id: this.currentLocationId++,
      mobileUserId: 2,
      latitude: "40.9833",
      longitude: "29.0333",
      address: "Moda Caddesi No:45, Kadıköy",
      district: "Kadıköy",
      isEmergencyLocation: false,
      reportedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      accuracy: "3",
      batteryLevel: 92,
      status: "safe"
    };

    this.userLocations.set(1, sampleLocation1);
    this.userLocations.set(2, sampleLocation2);

    // Sample emergency alert
    const sampleAlert: EmergencyAlert = {
      id: this.currentAlertId++,
      title: "Bölgesel Tahliye Uyarısı",
      message: "Beşiktaş bölgesinde yangın nedeniyle acil tahliye gerekiyor. En yakın güvenli alana gidiniz.",
      alertType: "evacuation",
      targetDistricts: ["Beşiktaş", "Ortaköy"],
      severity: "critical",
      sentBy: 1,
      sentAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      isActive: true
    };

    this.emergencyAlerts.set(1, sampleAlert);
  }

  private initializeMobileUsersData() {
    // Sample mobile users
    const sampleMobileUser1: MobileUser = {
      id: this.currentMobileUserId++,
      phoneNumber: "+90 555 123 4567",
      name: "Ahmet Yılmaz",
      district: "Beşiktaş",
      latitude: "41.0428",
      longitude: "29.0044",
      lastLocationUpdate: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      emergencyContact: "+90 555 987 6543",
      medicalInfo: "Diyabet",
      isActive: true,
      registeredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const sampleMobileUser2: MobileUser = {
      id: this.currentMobileUserId++,
      phoneNumber: "+90 555 234 5678",
      name: "Fatma Özkan",
      district: "Kadıköy",
      latitude: "40.9833",
      longitude: "29.0333",
      lastLocationUpdate: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      emergencyContact: "+90 555 876 5432",
      isActive: true,
      registeredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const sampleMobileUser3: MobileUser = {
      id: this.currentMobileUserId++,
      phoneNumber: "+90 555 345 6789",
      name: "Mehmet Demir",
      district: "Bakırköy",
      latitude: "40.9833",
      longitude: "28.8667",
      lastLocationUpdate: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      emergencyContact: "+90 555 765 4321",
      medicalInfo: "Kalp hastası",
      isActive: true,
      registeredAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.mobileUsers.set(1, sampleMobileUser1);
    this.mobileUsers.set(2, sampleMobileUser2);
    this.mobileUsers.set(3, sampleMobileUser3);

    // Sample user locations
    const sampleLocation1: UserLocation = {
      id: this.currentLocationId++,
      mobileUserId: 1,
      latitude: "41.0428",
      longitude: "29.0044",
      address: "Barbaros Bulvarı No:142, Beşiktaş",
      district: "Beşiktaş",
      isEmergencyLocation: true,
      reportedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      accuracy: "5",
      batteryLevel: 78,
      status: "help_needed"
    };

    const sampleLocation2: UserLocation = {
      id: this.currentLocationId++,
      mobileUserId: 2,
      latitude: "40.9833",
      longitude: "29.0333",
      address: "Moda Caddesi No:45, Kadıköy",
      district: "Kadıköy",
      isEmergencyLocation: false,
      reportedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      accuracy: "3",
      batteryLevel: 92,
      status: "safe"
    };

    this.userLocations.set(1, sampleLocation1);
    this.userLocations.set(2, sampleLocation2);

    // Sample emergency alert
    const sampleAlert: EmergencyAlert = {
      id: this.currentAlertId++,
      title: "Bölgesel Tahliye Uyarısı",
      message: "Beşiktaş bölgesinde yangın nedeniyle acil tahliye gerekiyor. En yakın güvenli alana gidiniz.",
      alertType: "evacuation",
      targetDistricts: ["Beşiktaş", "Ortaköy"],
      severity: "critical",
      sentBy: 1,
      sentAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      isActive: true
    };

    this.emergencyAlerts.set(1, sampleAlert);
  }
}

export const storage = new MemStorage();
