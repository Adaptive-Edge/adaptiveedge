import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactFormNotification, sendContactFormConfirmation } from "./email";

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

  const httpServer = createServer(app);
  return httpServer;
}
