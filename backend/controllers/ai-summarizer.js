import Task from "../models/task.js";
import Project from "../models/project.js";
import Workspace from "../models/workspace.js";
import { generateSummary, parseAISummary } from "../libs/ai-provider.js";
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

// Get date range based on timeRange parameter
const getDateRange = (timeRange) => {
  const now = new Date();
  let startDate, endDate = now;

  switch (timeRange) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      startDate = startOfWeek(now);
      endDate = endOfWeek(now);
      break;
    case "month":
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
      break;
    default:
      startDate = subDays(now, 7);
  }

  return { startDate, endDate };
};

// Format tasks for AI prompt
const formatTasksForAI = (tasks) => {
  return tasks
    .map((task) => {
      return `
Task: ${task.title}
Status: ${task.status}
Priority: ${task.priority}
Project: ${task.project?.title || "Unknown"}
Due Date: ${task.dueDate ? format(new Date(task.dueDate), "PPP") : "No due date"}
Description: ${task.description || "No description"}
Completed: ${task.status === "Done" ? "Yes" : "No"}
`;
    })
    .join("\n---\n");
};

// Summarize user's tasks
const summarizeTasks = async (req, res) => {
  try {
    const { timeRange } = req.body;
    const userId = req.user._id;

    const { startDate, endDate } = getDateRange(timeRange);

    // Fetch user's tasks
    const tasks = await Task.find({
      assignees: userId,
      updatedAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .populate("project", "title")
      .sort({ createdAt: -1 });

    if (tasks.length === 0) {
      return res.status(200).json({
        summary: `No tasks found for ${timeRange}. Keep up the great work! 🎯`,
        keyInsights: ["No recent task activity"],
        recommendations: ["Create new tasks to track your progress"],
      });
    }

    // Calculate statistics
    const completedTasks = tasks.filter((t) => t.status === "Done").length;
    const totalTasks = tasks.length;
    const highPriorityTasks = tasks.filter((t) => t.priority === "High").length;
    const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;

    // Create AI prompt
    const prompt = `You are a productivity coach. Analyze the following tasks and provide a comprehensive summary highlighting:
1. Overall productivity and completion rate
2. Priority areas and focus areas
3. Actionable recommendations for improvement

Tasks:
${formatTasksForAI(tasks)}

Statistics:
- Total Tasks: ${totalTasks}
- Completed: ${completedTasks} (${((completedTasks / totalTasks) * 100).toFixed(1)}%)
- In Progress: ${inProgressTasks}
- High Priority: ${highPriorityTasks}

Please provide:
1. A brief summary (2-3 sentences)
2. Key insights (bullet points)
3. Recommendations for better productivity

Format your response clearly with sections.`;

    // Generate summary using OpenAI
    const aiResponse = await generateSummary(prompt);

    if (!aiResponse) {
      return res.status(500).json({
        message: "Failed to generate summary",
      });
    }

    const parsedSummary = parseAISummary(aiResponse);

    res.status(200).json({
      summary: parsedSummary.summary || aiResponse,
      keyInsights: parsedSummary.keyInsights,
      recommendations: parsedSummary.recommendations,
      metadata: `Analyzed ${totalTasks} tasks from ${format(startDate, "PPP")} to ${format(endDate, "PPP")}`,
    });
  } catch (error) {
    console.error("Error in summarizeTasks:", error);
    res.status(500).json({
      message: error.message || "Failed to summarize tasks",
    });
  }
};

// Format projects for AI prompt
const formatProjectsForAI = (projects) => {
  return projects
    .map((project) => {
      const taskCount = project.tasks?.length || 0;
      return `
Project: ${project.title}
Status: ${project.status}
Progress: ${project.progress}%
Description: ${project.description || "No description"}
Tasks Count: ${taskCount}
Members: ${project.members?.length || 0}
Start Date: ${project.startDate ? format(new Date(project.startDate), "PPP") : "Not set"}
Due Date: ${project.dueDate ? format(new Date(project.dueDate), "PPP") : "Not set"}
`;
    })
    .join("\n---\n");
};

// Summarize projects
const summarizeProjects = async (req, res) => {
  try {
    const { workspaceId, timeRange } = req.body;
    const userId = req.user._id;

    // Verify user has access to workspace
    const workspace = await Workspace.findOne({
      _id: workspaceId,
      "members.user": userId,
    });

    if (!workspace) {
      return res.status(403).json({
        message: "Access denied to this workspace",
      });
    }

    const { startDate, endDate } = getDateRange(timeRange);

    // Fetch projects from the workspace
    const projects = await Project.find({
      workspace: workspaceId,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
      isArchived: false,
    })
      .populate("tasks")
      .sort({ createdAt: -1 });

    if (projects.length === 0) {
      return res.status(200).json({
        summary: `No projects found for ${timeRange}. Start a new project to get things done! 🚀`,
        keyInsights: ["No recent projects"],
        recommendations: ["Create new projects to organize your team's work"],
      });
    }

    // Calculate statistics
    const completedProjects = projects.filter((p) => p.status === "Completed").length;
    const inProgressProjects = projects.filter((p) => p.status === "In Progress").length;
    const plannedProjects = projects.filter((p) => p.status === "Planning").length;
    const averageProgress = projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length;
    const totalTasks = projects.reduce((sum, p) => sum + (p.tasks?.length || 0), 0);

    // Create AI prompt
    const prompt = `You are a project management expert. Analyze the following projects and provide a comprehensive summary highlighting:
1. Project portfolio health and progress
2. Status distribution and risk areas
3. Strategic recommendations for project execution

Projects:
${formatProjectsForAI(projects)}

Statistics:
- Total Projects: ${projects.length}
- Completed: ${completedProjects}
- In Progress: ${inProgressProjects}
- Planned: ${plannedProjects}
- Average Progress: ${averageProgress.toFixed(1)}%
- Total Tasks Across Projects: ${totalTasks}

Please provide:
1. A brief portfolio summary (2-3 sentences)
2. Key insights about project health (bullet points)
3. Recommendations for improving project outcomes

Format your response clearly with sections.`;

    // Generate summary using AI
    const aiResponse = await generateSummary(prompt);

    if (!aiResponse) {
      return res.status(500).json({
        message: "Failed to generate summary",
      });
    }

    const parsedSummary = parseAISummary(aiResponse);

    res.status(200).json({
      summary: parsedSummary.summary || aiResponse,
      keyInsights: parsedSummary.keyInsights,
      recommendations: parsedSummary.recommendations,
      metadata: `Analyzed ${projects.length} projects with ${totalTasks} total tasks from ${format(startDate, "PPP")} to ${format(endDate, "PPP")}`,
    });
  } catch (error) {
    console.error("Error in summarizeProjects:", error);
    res.status(500).json({
      message: error.message || "Failed to summarize projects",
    });
  }
};

// Summarize workspace
const summarizeWorkspace = async (req, res) => {
  try {
    const { workspaceId, timeRange } = req.body;
    const userId = req.user._id;

    // Verify user has access to workspace
    const workspace = await Workspace.findOne({
      _id: workspaceId,
      "members.user": userId,
    }).populate({
      path: "projects",
      populate: { path: "tasks" },
    });

    if (!workspace) {
      return res.status(403).json({
        message: "Access denied to this workspace",
      });
    }

    const { startDate, endDate } = getDateRange(timeRange);

    // Fetch all projects in the workspace
    const projects = await Project.find({
      workspace: workspaceId,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
      isArchived: false,
    }).populate("tasks");

    // Fetch all tasks in the workspace projects
    const allTasks = await Task.find({
      project: { $in: projects.map((p) => p._id) },
      updatedAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).populate("project");

    if (projects.length === 0 && allTasks.length === 0) {
      return res.status(200).json({
        summary: `No activity found in this workspace for ${timeRange}. Start collaborating to move projects forward! 🤝`,
        keyInsights: ["No recent workspace activity"],
        recommendations: ["Create projects and invite team members to get started"],
      });
    }

    // Calculate comprehensive statistics
    const completedProjects = projects.filter((p) => p.status === "Completed").length;
    const completedTasks = allTasks.filter((t) => t.status === "Done").length;
    const inProgressTasks = allTasks.filter((t) => t.status === "In Progress").length;
    const highPriorityTasks = allTasks.filter((t) => t.priority === "High").length;
    const taskCompletionRate = allTasks.length > 0 ? ((completedTasks / allTasks.length) * 100).toFixed(1) : 0;
    const teamMembers = workspace.members?.length || 0;

    // Create AI prompt
    const prompt = `You are a workspace productivity analyst. Analyze the following workspace metrics and provide a comprehensive summary highlighting:
1. Overall workspace productivity and team efficiency
2. Project and task execution health
3. Strategic recommendations for team collaboration

Workspace: ${workspace.name}

Statistics:
- Team Members: ${teamMembers}
- Total Projects: ${projects.length}
- Completed Projects: ${completedProjects}
- Total Tasks: ${allTasks.length}
- Completed Tasks: ${completedTasks} (${taskCompletionRate}%)
- In Progress Tasks: ${inProgressTasks}
- High Priority Tasks: ${highPriorityTasks}
- Period: ${format(startDate, "PPP")} to ${format(endDate, "PPP")}

Recent Projects Activity:
${formatProjectsForAI(projects.slice(0, 5))}

Please provide:
1. A comprehensive workspace summary (2-3 sentences)
2. Key insights about team productivity and project health (bullet points)
3. Strategic recommendations for improving team collaboration and execution

Format your response clearly with sections.`;

    // Generate summary using AI
    const aiResponse = await generateSummary(prompt);

    if (!aiResponse) {
      return res.status(500).json({
        message: "Failed to generate summary",
      });
    }

    const parsedSummary = parseAISummary(aiResponse);

    res.status(200).json({
      summary: parsedSummary.summary || aiResponse,
      keyInsights: parsedSummary.keyInsights,
      recommendations: parsedSummary.recommendations,
      metadata: `Analyzed ${projects.length} projects, ${allTasks.length} tasks, and ${teamMembers} team members from ${format(startDate, "PPP")} to ${format(endDate, "PPP")}`,
    });
  } catch (error) {
    console.error("Error in summarizeWorkspace:", error);
    res.status(500).json({
      message: "Failed to summarize workspace",
    });
  }
};

export { summarizeTasks, summarizeProjects, summarizeWorkspace };
