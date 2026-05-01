import Workspace from "../models/workspace.js";
import Project from "../models/project.js";
import Task from "../models/task.js";
import { recordActivity } from "../libs/index.js";

const createProject = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { title, description, status, startDate, dueDate, tags, members } =
      req.body;

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    // Check if user is member and has permission to create project
    const userMemberInfo = workspace.members.find(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (!userMemberInfo) {
      return res.status(403).json({
        message: "You are not a member of this workspace",
      });
    }

    // Only owner and admin can create projects
    if (!["owner", "admin"].includes(userMemberInfo.role)) {
      return res.status(403).json({
        message: "Only workspace owner or admin can create projects",
      });
    }

    const tagArray = tags ? tags.split(",") : [];

    const newProject = await Project.create({
      title,
      description,
      status,
      startDate,
      dueDate,
      tags: tagArray,
      workspace: workspaceId,
      members,
      createdBy: req.user._id,
    });

    workspace.projects.push(newProject._id);
    await workspace.save();

    return res.status(201).json(newProject);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getProjectDetails = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (member) => member.user.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this project",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate("members.user");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (member) => member.user._id.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this project",
      });
    }

    const tasks = await Task.find({
      project: projectId,
      isArchived: false,
    })
      .populate("assignees", "name profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      project,
      tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, status, dueDate, tags } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only project creator can edit this project",
      });
    }

    project.title = title;
    project.description = description;
    project.status = status;
    project.dueDate = dueDate;
    project.tags = tags
      ? tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

    await project.save();

    await recordActivity(req.user._id, "updated_project", "Project", projectId, {
      description: `updated project ${project.title}`,
    });

    return res.status(200).json(project);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Check if user is the creator
    if (project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only project creator can delete this project",
      });
    }

    // Delete all tasks in the project
    await Task.deleteMany({ project: projectId });

    // Remove project from workspace
    const workspace = await Workspace.findById(project.workspace);
    if (workspace) {
      workspace.projects = workspace.projects.filter(
        (proj) => proj.toString() !== projectId
      );
      await workspace.save();
    }

    // Delete the project
    await Project.deleteOne({ _id: projectId });

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export {
  createProject,
  getProjectDetails,
  getProjectTasks,
  updateProject,
  deleteProject,
};
