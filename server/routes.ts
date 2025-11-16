import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertBlogPostSchema, updateBlogPostSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactFormNotification, sendContactFormConfirmation } from "./email";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

// Configure multer for image uploads
const uploadStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.resolve(import.meta.dirname, '../client/public/blog-images');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error as Error, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: uploadStorage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export async function registerRoutes(app: Express): Promise<Server> {

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // Send email notifications
      const emailParams = {
        name: contact.name,
        email: contact.email,
        company: contact.company || undefined,
        message: contact.message,
        submissionId: contact.id,
        submissionTime: new Date(contact.createdAt).toLocaleString('en-UK', {
          timeZone: 'Europe/London',
          dateStyle: 'full',
          timeStyle: 'short'
        })
      };
      
      // Send notification to you (async, don't block response)
      sendContactFormNotification(emailParams).catch(error => {
        console.error('Failed to send notification email:', error);
      });
      
      // Send confirmation to user (async, don't block response)
      sendContactFormConfirmation(emailParams).catch(error => {
        console.error('Failed to send confirmation email:', error);
      });
      
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // Get all contacts (for admin purposes if needed)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve contacts"
      });
    }
  });

  // ============ BLOG POST ROUTES ============

  // Get all blog posts
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve blog posts"
      });
    }
  });

  // Get single blog post by slug
  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Blog post not found"
        });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve blog post"
      });
    }
  });

  // Create new blog post
  app.post("/api/blog-posts", async (req, res) => {
    try {
      const postData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(postData);
      res.status(201).json({ success: true, post });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid blog post data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to create blog post"
        });
      }
    }
  });

  // Update blog post
  app.patch("/api/blog-posts/:id", async (req, res) => {
    try {
      const postData = updateBlogPostSchema.parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, postData);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Blog post not found"
        });
      }
      res.json({ success: true, post });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid blog post data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to update blog post"
        });
      }
    }
  });

  // Delete blog post
  app.delete("/api/blog-posts/:id", async (req, res) => {
    try {
      const success = await storage.deleteBlogPost(req.params.id);
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "Blog post not found"
        });
      }
      res.json({ success: true, message: "Blog post deleted successfully" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete blog post"
      });
    }
  });

  // Upload image for blog post
  app.post("/api/blog-images", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image file provided"
        });
      }

      const imageUrl = `/blog-images/${req.file.filename}`;
      res.json({
        success: true,
        url: imageUrl,
        filename: req.file.filename
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to upload image"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
