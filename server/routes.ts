import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertBlogPostSchema, updateBlogPostSchema, insertCaseStudySchema, updateCaseStudySchema } from "@shared/schema";
import { z } from "zod";
import { sendContactFormNotification, sendContactFormConfirmation } from "./email";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

// Configure multer for blog image uploads
const uploadStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.resolve(import.meta.dirname, "../client/public/blog-images");
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error as Error, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
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
      cb(new Error("Only images are allowed"));
    }
  }
});

// Configure multer for case study image uploads  
const caseStudyStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.dirname(import.meta.dirname), "dist/public/case-study-images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "case-study-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const caseStudyUpload = multer({
  storage: caseStudyStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // Send email notifications
      try {
        await sendContactFormNotification(contactData);
        await sendContactFormConfirmation(contactData);
      } catch (emailError) {
        console.error("Failed to send email notifications:", emailError);
      }
      
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

  // Get all contacts
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

  // GET /api/blog-posts/by-id/:id (get blog post by ID for admin)
  app.get("/api/blog-posts/by-id/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getBlogPostById(id);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Blog post not found"
        });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post by ID:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve blog post"
      });
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
  app.post("/api/blog-images", upload.single("image"), async (req, res) => {
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

  // ============ CASE STUDY ROUTES ============

  // GET /api/case-studies (get all case studies)
  app.get("/api/case-studies", async (req, res) => {
    try {
      const caseStudies = await storage.getCaseStudies();
      res.json(caseStudies);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve case studies" 
      });
    }
  });

  // GET /api/case-studies/:slug (get case study by slug)
  app.get("/api/case-studies/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const caseStudy = await storage.getCaseStudy(slug);
      if (!caseStudy) {
        return res.status(404).json({ 
          success: false, 
          message: "Case study not found" 
        });
      }
      res.json(caseStudy);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve case study" 
      });
    }
  });

  // GET /api/case-studies/by-id/:id (get case study by ID for admin)
  app.get("/api/case-studies/by-id/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const caseStudy = await storage.getCaseStudyById(id);
      if (!caseStudy) {
        return res.status(404).json({ 
          success: false, 
          message: "Case study not found" 
        });
      }
      res.json(caseStudy);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve case study" 
      });
    }
  });

  // POST /api/case-studies (create new case study)
  app.post("/api/case-studies", async (req, res) => {
    try {
      const caseStudyData = insertCaseStudySchema.parse(req.body);
      const caseStudy = await storage.createCaseStudy(caseStudyData);
      res.status(201).json({ success: true, caseStudy });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid case study data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to create case study" 
        });
      }
    }
  });

  // PUT /api/case-studies/:id (update case study)
  app.put("/api/case-studies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = updateCaseStudySchema.parse(req.body);
      const caseStudy = await storage.updateCaseStudy(id, updates);
      if (!caseStudy) {
        return res.status(404).json({ 
          success: false, 
          message: "Case study not found" 
        });
      }
      res.json({ success: true, caseStudy });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid case study data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to update case study" 
        });
      }
    }
  });

  // DELETE /api/case-studies/:id (delete case study)
  app.delete("/api/case-studies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteCaseStudy(id);
      if (!success) {
        return res.status(404).json({ 
          success: false, 
          message: "Case study not found" 
        });
      }
      res.json({ success: true, message: "Case study deleted successfully" });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete case study" 
      });
    }
  });

  // Case Study Image Upload endpoint
  app.post("/api/case-study-images", caseStudyUpload.single("image"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image file provided",
        });
      }

      const imageUrl = `/case-study-images/${req.file.filename}`;
      res.json({
        success: true,
        imageUrl: imageUrl,
        message: "Image uploaded successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to upload image",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
