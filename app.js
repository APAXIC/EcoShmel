//app.js
import express from "express";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import swaggerUI from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Swagger документація
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Routes
app.use("/api", routes);

// Health check route
app.get('/', (req, res) => {
  res.send('API works');
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;