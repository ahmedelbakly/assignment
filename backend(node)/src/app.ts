import express from "express";
import type { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/database";
import apartmentRoutes from "./api/route/apartment.route";
const app: Application = express();
const PORT: number | string = process.env.PORT || 3001;

// Connect to the database
connectDB();
// Middleware
app.use(cors());
app.use(express.json());

// C

// Health check endpoint
app.get("/health", (req: Request, res: Response): void => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// API Routes
app.use("/api/apartments", apartmentRoutes);

// Error handling middleware
app.use(
  (error: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error("Unhandled error:", error);
    res.status(400).json(error.message );
  }
);

// handle global errors here
app.use(
  (error: Error, req: Request, res: Response, next: NextFunction): void => {
    res.status(500).json(error.message );
  }
);

// 404 handler - CORRECTED: This should be the last middleware
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT} 🚀`);
});

export default app;
