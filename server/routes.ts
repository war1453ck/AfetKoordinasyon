import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertIncidentSchema, insertResourceSchema, insertTeamSchema, 
  insertSupplierSchema, insertEarthquakeSchema, insertWeatherDataSchema,
  insertContainerSchema, insertCityManagementSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard stats endpoint
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const activeIncidents = await storage.getActiveIncidents();
      const allResources = await storage.getAllResources();
      const activeResources = allResources.filter(r => r.status === "active");
      const allTeams = await storage.getAllTeams();
      const activeTeams = allTeams.filter(t => t.status === "active");
      
      const stats = {
        activeEmergencies: activeIncidents.length,
        activeResources: activeResources.length,
        totalResources: allResources.length,
        activePersonnel: activeTeams.reduce((sum, team) => sum + team.memberCount, 0),
        averageResponseTime: "8.5dk", // This would be calculated from historical data
        resourceUtilization: Math.round((activeResources.length / allResources.length) * 100),
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Incidents endpoints
  app.get("/api/incidents", async (req, res) => {
    try {
      const incidents = await storage.getAllIncidents();
      res.json(incidents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch incidents" });
    }
  });

  app.get("/api/incidents/active", async (req, res) => {
    try {
      const activeIncidents = await storage.getActiveIncidents();
      res.json(activeIncidents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch active incidents" });
    }
  });

  app.post("/api/incidents", async (req, res) => {
    try {
      const validatedData = insertIncidentSchema.parse(req.body);
      const incident = await storage.createIncident(validatedData);
      res.status(201).json(incident);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid incident data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create incident" });
      }
    }
  });

  app.patch("/api/incidents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const incident = await storage.updateIncident(id, updates);
      
      if (!incident) {
        return res.status(404).json({ message: "Incident not found" });
      }
      
      res.json(incident);
    } catch (error) {
      res.status(500).json({ message: "Failed to update incident" });
    }
  });

  // Resources endpoints
  app.get("/api/resources", async (req, res) => {
    try {
      const resources = await storage.getAllResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.get("/api/resources/stats", async (req, res) => {
    try {
      const allResources = await storage.getAllResources();
      
      const stats = {
        fire: {
          total: allResources.filter(r => r.type === "fire_truck").length,
          active: allResources.filter(r => r.type === "fire_truck" && r.status === "active").length,
        },
        ambulance: {
          total: allResources.filter(r => r.type === "ambulance").length,
          active: allResources.filter(r => r.type === "ambulance" && r.status === "active").length,
        },
        police: {
          total: allResources.filter(r => r.type === "police_car").length,
          active: allResources.filter(r => r.type === "police_car" && r.status === "active").length,
        },
        air: {
          total: allResources.filter(r => r.type === "helicopter").length,
          active: allResources.filter(r => r.type === "helicopter" && r.status === "active").length,
        },
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resource stats" });
    }
  });

  app.post("/api/resources", async (req, res) => {
    try {
      const validatedData = insertResourceSchema.parse(req.body);
      const resource = await storage.createResource(validatedData);
      res.status(201).json(resource);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid resource data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create resource" });
      }
    }
  });

  // Teams endpoints
  app.get("/api/teams", async (req, res) => {
    try {
      const teams = await storage.getAllTeams();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch teams" });
    }
  });

  app.get("/api/teams/active", async (req, res) => {
    try {
      const activeTeams = await storage.getActiveTeams();
      res.json(activeTeams);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch active teams" });
    }
  });

  app.post("/api/teams", async (req, res) => {
    try {
      const validatedData = insertTeamSchema.parse(req.body);
      const team = await storage.createTeam(validatedData);
      res.status(201).json(team);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid team data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create team" });
      }
    }
  });

  // Suppliers endpoints
  app.get("/api/suppliers", async (req, res) => {
    try {
      const suppliers = await storage.getAllSuppliers();
      res.json(suppliers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch suppliers" });
    }
  });

  app.get("/api/suppliers/type/:type", async (req, res) => {
    try {
      const type = req.params.type;
      const suppliers = await storage.getSuppliersByType(type);
      res.json(suppliers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch suppliers by type" });
    }
  });

  app.post("/api/suppliers", async (req, res) => {
    try {
      const validatedData = insertSupplierSchema.parse(req.body);
      const supplier = await storage.createSupplier(validatedData);
      res.status(201).json(supplier);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid supplier data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create supplier" });
      }
    }
  });

  // Earthquakes endpoints
  app.get("/api/earthquakes", async (req, res) => {
    try {
      const earthquakes = await storage.getAllEarthquakes();
      res.json(earthquakes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch earthquakes" });
    }
  });

  app.get("/api/earthquakes/recent/:hours", async (req, res) => {
    try {
      const hours = parseInt(req.params.hours) || 24;
      const earthquakes = await storage.getRecentEarthquakes(hours);
      res.json(earthquakes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent earthquakes" });
    }
  });

  app.post("/api/earthquakes", async (req, res) => {
    try {
      const validatedData = insertEarthquakeSchema.parse(req.body);
      const earthquake = await storage.createEarthquake(validatedData);
      res.status(201).json(earthquake);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid earthquake data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create earthquake" });
      }
    }
  });

  // Weather endpoints
  app.get("/api/weather", async (req, res) => {
    try {
      const weatherData = await storage.getAllWeatherData();
      res.json(weatherData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch weather data" });
    }
  });

  app.get("/api/weather/current/:location", async (req, res) => {
    try {
      const location = req.params.location;
      const weather = await storage.getCurrentWeather(location);
      if (!weather) {
        return res.status(404).json({ message: "Weather data not found for location" });
      }
      res.json(weather);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch current weather" });
    }
  });

  app.post("/api/weather", async (req, res) => {
    try {
      const validatedData = insertWeatherDataSchema.parse(req.body);
      const weather = await storage.createWeatherData(validatedData);
      res.status(201).json(weather);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid weather data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create weather data" });
      }
    }
  });

  // Containers endpoints
  app.get("/api/containers", async (req, res) => {
    try {
      const containers = await storage.getAllContainers();
      res.json(containers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch containers" });
    }
  });

  app.get("/api/containers/available", async (req, res) => {
    try {
      const containers = await storage.getAvailableContainers();
      res.json(containers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch available containers" });
    }
  });

  app.get("/api/containers/type/:type", async (req, res) => {
    try {
      const type = req.params.type;
      const containers = await storage.getContainersByType(type);
      res.json(containers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch containers by type" });
    }
  });

  app.post("/api/containers", async (req, res) => {
    try {
      const validatedData = insertContainerSchema.parse(req.body);
      const container = await storage.createContainer(validatedData);
      res.status(201).json(container);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid container data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create container" });
      }
    }
  });

  app.patch("/api/containers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const container = await storage.updateContainer(id, updates);
      
      if (!container) {
        return res.status(404).json({ message: "Container not found" });
      }
      
      res.json(container);
    } catch (error) {
      res.status(500).json({ message: "Failed to update container" });
    }
  });

  // City Management endpoints
  app.get("/api/city-management", async (req, res) => {
    try {
      const cities = await storage.getAllCityManagement();
      res.json(cities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch city management data" });
    }
  });

  app.get("/api/city-management/district/:district", async (req, res) => {
    try {
      const district = req.params.district;
      const city = await storage.getCityByDistrict(district);
      if (!city) {
        return res.status(404).json({ message: "District not found" });
      }
      res.json(city);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch city data" });
    }
  });

  app.post("/api/city-management", async (req, res) => {
    try {
      const validatedData = insertCityManagementSchema.parse(req.body);
      const city = await storage.createCityManagement(validatedData);
      res.status(201).json(city);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid city management data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create city management data" });
      }
    }
  });

  app.patch("/api/city-management/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const city = await storage.updateCityManagement(id, updates);
      
      if (!city) {
        return res.status(404).json({ message: "City not found" });
      }
      
      res.json(city);
    } catch (error) {
      res.status(500).json({ message: "Failed to update city management data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
