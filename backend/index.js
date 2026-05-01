import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from "morgan";
import routes from './routes/index.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Connect to MongoDB
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI,{
        dbName : "PROJECT_MANAGEMENT",
    })
    .then(() => console.log('Connected to Database'))
    .catch(err => console.log('DB connection error:', err));
}


app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to EaseCollaborate API",
  });
});


// http:localhost:500/api-v1/
app.use("/api/v1", routes);


// error middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// not found middleware
app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 


