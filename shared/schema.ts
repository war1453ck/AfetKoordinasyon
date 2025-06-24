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

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Incident = typeof incidents.$inferSelect;
export type InsertIncident = z.infer<typeof insertIncidentSchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type Team = typeof teams.$inferSelect;
export type InsertTeam = z.infer<typeof insertTeamSchema>;
