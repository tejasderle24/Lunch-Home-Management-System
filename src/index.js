import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import tiffinRoutes from "./routes/tiffinRoutes.js";
import kitchenRoutes from "./routes/kitchenRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";


dotenv.config(
    { path: "./.env" }
);
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/tiffin", tiffinRoutes);
app.use("/api/kitchen", kitchenRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/export", exportRoutes);



// Root endpoint - health check HTML
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lunch Home Status</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
          .container { background: #f9fafb; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          h1 { color: #2563eb; }
          .status { color: #16a34a; font-weight: bold; }
          .info { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          .footer { margin-top: 30px; font-size: 0.9rem; color: #6b7280; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Lunch Home API</h1>
          <p>Status: <span class="status">Online</span></p>
          <p>Server Time: ${new Date().toLocaleString()}</p>
          
          <div class="info">
            <p>The Lunch Home API is running properly. This backend serves property listings, user authentication,
            and AI analysis features for the Lunch Home platform.</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Lunch Home. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `);
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server running on port", process.env.PORT);
    });
  })
  .catch((err) => console.error("MongoDB Error", err));
