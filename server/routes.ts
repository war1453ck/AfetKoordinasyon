import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertIncidentSchema, insertResourceSchema, insertTeamSchema } from "@shared/schema";
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

  const httpServer = createServer(app);
  return httpServer;
}
