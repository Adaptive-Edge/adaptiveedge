import { Router } from "express";
import { Pool } from "pg";

const contactRouter = Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

contactRouter.post("/contact", async (req, res) => {
  const { name, email, company, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }
  try {
    await pool.query(
      "INSERT INTO contacts (name, email, company, message) VALUES ($1, $2, $3, $4)",
      [name, email, company, message]
    );
    res.status(200).json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default contactRouter;
