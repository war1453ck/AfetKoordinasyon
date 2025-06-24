import { pgTable, text, serial, integer, timestamp, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("operator"),
});

export const incidents = pgTable("incidents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(),
  priority: text("priority").notNull(),
  status: text("status").notNull().default("active"),
  location: text("location").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  contactPhone: text("contact_phone"),
  reportedBy: integer("reported_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull().default("available"),
  currentLocation: text("current_location"),
  assignedIncident: integer("assigned_incident").references(() => incidents.id),
  capacity: integer("capacity").default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull().default("available"),
  currentTask: text("current_task"),
  assignedIncident: integer("assigned_incident").references(() => incidents.id),
  memberCount: integer("member_count").default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// New tables for additional features
export const suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // food, medical, shelter, fuel, etc.
  contactPerson: text("contact_person").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  address: text("address").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  capacity: integer("capacity").default(0),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const earthquakes = pgTable("earthquakes", {
  id: serial("id").primaryKey(),
  magnitude: decimal("magnitude", { precision: 3, scale: 1 }).notNull(),
  depth: decimal("depth", { precision: 5, scale: 2 }),
  location: text("location").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  timestamp: timestamp("timestamp").notNull(),
  source: text("source").default("AFAD"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const weatherData = pgTable("weather_data", {
  id: serial("id").primaryKey(),
  location: text("location").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  temperature: decimal("temperature", { precision: 4, scale: 1 }),
  humidity: integer("humidity"),
  windSpeed: decimal("wind_speed", { precision: 4, scale: 1 }),
  windDirection: integer("wind_direction"),
  pressure: decimal("pressure", { precision: 6, scale: 2 }),
  condition: text("condition"), // sunny, cloudy, rainy, etc.
  visibility: decimal("visibility", { precision: 4, scale: 1 }),
  timestamp: timestamp("timestamp").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const containers = pgTable("containers", {
  id: serial("id").primaryKey(),
  containerNumber: text("container_number").notNull().unique(),
  type: text("type").notNull(), // housing, medical, storage, office
  capacity: integer("capacity").default(1),
  currentOccupancy: integer("current_occupancy").default(0),
  location: text("location").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  status: text("status").notNull().default("available"), // available, occupied, maintenance
  assignedIncident: integer("assigned_incident").references(() => incidents.id),
  facilities: text("facilities").array(), // ["electricity", "water", "heating", "internet"]
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cityManagement = pgTable("city_management", {
  id: serial("id").primaryKey(),
  district: text("district").notNull(),
  population: integer("population"),
  emergencyPersonnel: integer("emergency_personnel").default(0),
  shelterCapacity: integer("shelter_capacity").default(0),
  currentSheltered: integer("current_sheltered").default(0),
  availableResources: text("available_resources").array(),
  riskLevel: text("risk_level").notNull().default("low"), // low, medium, high, critical
  lastUpdate: timestamp("last_update").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertIncidentSchema = createInsertSchema(incidents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  createdAt: true,
});

export const insertTeamSchema = createInsertSchema(teams).omit({
  id: true,
  createdAt: true,
});

export const insertSupplierSchema = createInsertSchema(suppliers).omit({
  id: true,
  createdAt: true,
});

export const insertEarthquakeSchema = createInsertSchema(earthquakes).omit({
  id: true,
  createdAt: true,
});

export const insertWeatherDataSchema = createInsertSchema(weatherData).omit({
  id: true,
  createdAt: true,
});

export const insertContainerSchema = createInsertSchema(containers).omit({
  id: true,
  createdAt: true,
});

export const insertCityManagementSchema = createInsertSchema(cityManagement).omit({
  id: true,
  createdAt: true,
  lastUpdate: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Incident = typeof incidents.$inferSelect;
export type InsertIncident = z.infer<typeof insertIncidentSchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type Team = typeof teams.$inferSelect;
export type InsertTeam = z.infer<typeof insertTeamSchema>;

export type Supplier = typeof suppliers.$inferSelect;
export type InsertSupplier = z.infer<typeof insertSupplierSchema>;

export type Earthquake = typeof earthquakes.$inferSelect;
export type InsertEarthquake = z.infer<typeof insertEarthquakeSchema>;

export type WeatherData = typeof weatherData.$inferSelect;
export type InsertWeatherData = z.infer<typeof insertWeatherDataSchema>;

export type Container = typeof containers.$inferSelect;
export type InsertContainer = z.infer<typeof insertContainerSchema>;

export type CityManagement = typeof cityManagement.$inferSelect;
export type InsertCityManagement = z.infer<typeof insertCityManagementSchema>;
