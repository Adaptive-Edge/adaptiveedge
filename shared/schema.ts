import { sql } from "drizzle-orm";
import { mysqlTable, text, varchar, timestamp, boolean, int } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = mysqlTable("contacts", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = mysqlTable("blog_posts", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  image: text("image"),
  linkedinUrl: text("linkedin_url"),
  featured: boolean("featured").default(false),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  date: varchar("date", { length: 10 }).notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertContactSchema = createInsertSchema(contacts);
export const insertBlogPostSchema = createInsertSchema(blogPosts, {  id: z.string().uuid().optional(),  createdAt: z.date().optional(),  updatedAt: z.date().optional(),  featured: z.boolean().optional(),  published: z.boolean().optional(),  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),});

export type User = typeof users.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export const updateBlogPostSchema = insertBlogPostSchema;

export const caseStudies = mysqlTable("case_studies", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  client: text("client").notNull(),
  category: text("category").notNull(),
  challenge: text("challenge").notNull(),
  approach: text("approach").notNull(),
  impact: text("impact").notNull(),
  roleDescription: text("role_description").notNull(),
  featured: boolean("featured").default(false),
  treeHouseAttribution: text("tree_house_attribution"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const insertCaseStudySchema = createInsertSchema(caseStudies, {
  id: z.string().uuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  featured: z.boolean().optional(),
});

export type CaseStudy = typeof caseStudies.$inferSelect;
export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;
export const updateCaseStudySchema = insertCaseStudySchema;
