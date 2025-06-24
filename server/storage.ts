import { users, incidents, resources, teams, type User, type InsertUser, type Incident, type InsertIncident, type Resource, type InsertResource, type Team, type InsertTeam } from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private incidents: Map<number, Incident>;
  private resources: Map<number, Resource>;
  private teams: Map<number, Team>;
  private currentUserId: number;
  private currentIncidentId: number;
  private currentResourceId: number;
  private currentTeamId: number;

  constructor() {
    this.users = new Map();
    this.incidents = new Map();
    this.resources = new Map();
    this.teams = new Map();
    this.currentUserId = 1;
    this.currentIncidentId = 1;
    this.currentResourceId = 1;
    this.currentTeamId = 1;

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
}

export const storage = new MemStorage();
