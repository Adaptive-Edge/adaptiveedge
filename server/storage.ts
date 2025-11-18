import { eq, sql, desc } from "drizzle-orm";
import { caseStudies } from "@shared/schema";
import type { CaseStudy, InsertCaseStudy, updateCaseStudySchema } from "@shared/schema";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { users, contacts, blogPosts } from "@shared/schema";
import type { User, Contact, BlogPost, InsertUser, InsertContact, InsertBlogPost, updateBlogPostSchema } from "@shared/schema";

type UpdateBlogPost = typeof updateBlogPostSchema._type;
type UpdateCaseStudy = typeof updateCaseStudySchema._type;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: UpdateBlogPost): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudy(slug: string): Promise<CaseStudy | undefined>;
  getCaseStudyById(id: string): Promise<CaseStudy | undefined>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
  updateCaseStudy(id: string, caseStudy: UpdateCaseStudy): Promise<CaseStudy | undefined>;
  deleteCaseStudy(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    await db.insert(users).values(insertUser);
    const [user] = await db.select().from(users).where(eq(users.username, insertUser.username));
    return user;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    await db.insert(contacts).values(insertContact);
    // For MySQL, we need to get the inserted record separately
    const [contact] = await db.select().from(contacts).where(eq(contacts.email, insertContact.email));
    return contact;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    await db.insert(blogPosts).values(insertPost);
    
    // Get the inserted post by slug since MySQL does not support RETURNING
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, insertPost.slug));
    
    return post;
  }

  async updateBlogPost(id: string, updatePost: UpdateBlogPost): Promise<BlogPost | undefined> {
    await db
      .update(blogPosts)
      .set({ ...updatePost, updatedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(blogPosts.id, id));
    
    // Get the updated post
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id));
    
    return post || undefined;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    try {
      const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
      // MySQL2 returns an array with metadata
      return (result[0]?.affectedRows || 0) > 0;
    } catch (error) {
      console.error("Failed to delete blog post:", error);
      return false;
    }
  }

  async getCaseStudies(): Promise<CaseStudy[]> {
    return await db.select().from(caseStudies).orderBy(desc(caseStudies.createdAt));
  }

  async getCaseStudy(slug: string): Promise<CaseStudy | undefined> {
    const [caseStudy] = await db.select().from(caseStudies).where(eq(caseStudies.slug, slug));
    return caseStudy || undefined;
  }

  async getCaseStudyById(id: string): Promise<CaseStudy | undefined> {
    const [caseStudy] = await db.select().from(caseStudies).where(eq(caseStudies.id, id));
    return caseStudy || undefined;
  }

  async createCaseStudy(insertCaseStudy: InsertCaseStudy): Promise<CaseStudy> {
    await db.insert(caseStudies).values(insertCaseStudy);
    
    // Get the inserted case study by slug since MySQL does not support RETURNING
    const [caseStudy] = await db
      .select()
      .from(caseStudies)
      .where(eq(caseStudies.slug, insertCaseStudy.slug));
    
    return caseStudy;
  }

  async updateCaseStudy(id: string, updateCaseStudy: UpdateCaseStudy): Promise<CaseStudy | undefined> {
    await db
      .update(caseStudies)
      .set({ ...updateCaseStudy, updatedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(caseStudies.id, id));
    
    // Get the updated case study
    const [caseStudy] = await db
      .select()
      .from(caseStudies)
      .where(eq(caseStudies.id, id));
    
    return caseStudy || undefined;
  }

  async deleteCaseStudy(id: string): Promise<boolean> {
    try {
      const result = await db.delete(caseStudies).where(eq(caseStudies.id, id));
      // MySQL2 returns an array with metadata
      return (result[0]?.affectedRows || 0) > 0;
    } catch (error) {
      console.error("Failed to delete case study:", error);
      return false;
    }
  }
}

export const storage = new DatabaseStorage();
