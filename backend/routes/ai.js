import express from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import authMiddleware from "../middleware/auth-middleware.js";
import { summarizeTasks, summarizeProjects, summarizeWorkspace } from "../controllers/ai-summarizer.js";

const router = express.Router();

// Rate limiting map: userId -> { count, resetTime }
const rateLimitMap = new Map();

// Rate limiting middleware
const aiRateLimiter = (req, res, next) => {
  const userId = req.user._id.toString();
  const now = Date.now();
  const limit = 10; // 10 summaries per user per day
  const windowMs = 24 * 60 * 60 * 1000; // 24 hours

  let userLimit = rateLimitMap.get(userId);

  // Initialize or reset if window expired
  if (!userLimit || now > userLimit.resetTime) {
    userLimit = {
      count: 0,
      resetTime: now + windowMs,
    };
    rateLimitMap.set(userId, userLimit);
  }

  // Check if limit exceeded
  if (userLimit.count >= limit) {
    return res.status(429).json({
      message: `Rate limit exceeded. You can generate ${limit} summaries per day. Try again tomorrow.`,
      retryAfter: Math.ceil((userLimit.resetTime - now) / 1000),
    });
  }

  // Increment counter
  userLimit.count++;

  // Add info to request
  req.rateLimitInfo = {
    remaining: limit - userLimit.count,
    reset: userLimit.resetTime,
  };

  next();
};

// Validation schema
const summarizeSchema = z.object({
  type: z.enum(["tasks", "projects", "workspace"]),
  timeRange: z.enum(["today", "week", "month"]),
  workspaceId: z.string().optional(),
});

// Routes
router.post(
  "/summarize",
  authMiddleware,
  aiRateLimiter,
  validateRequest({ body: summarizeSchema }),
  async (req, res) => {
    const { type, timeRange, workspaceId } = req.body;

    try {
      switch (type) {
        case "tasks":
          return await summarizeTasks(
            { ...req, body: { timeRange } },
            res
          );

        case "projects":
          return await summarizeProjects(
            { ...req, body: { workspaceId, timeRange } },
            res
          );

        case "workspace":
          return await summarizeWorkspace(
            { ...req, body: { workspaceId, timeRange } },
            res
          );

        default:
          return res.status(400).json({
            message: "Invalid summary type",
          });
      }
    } catch (error) {
      console.error("Error in /summarize route:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

export default router;
