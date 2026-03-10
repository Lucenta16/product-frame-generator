/**
 * Local Storage utility for managing projects/templates
 * Replaces Supabase database with browser localStorage
 */

import { Project, Marketplace } from "@/types";

const PROJECTS_KEY = "product-frame-projects";

export const localStorageDB = {
  // Get all projects
  getProjects: (): Project[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(PROJECTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Get single project by ID
  getProject: (id: string): Project | null => {
    const projects = localStorageDB.getProjects();
    return projects.find((p) => p.id === id) || null;
  },

  // Create new project
  createProject: (
    name: string,
    marketplace: Marketplace
  ): { success: boolean; project?: Project; error?: string } => {
    try {
      const projects = localStorageDB.getProjects();
      const newProject: Project = {
        id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name,
        marketplace,
        created_at: new Date().toISOString(),
        user_id: "local-user",
      };
      projects.push(newProject);
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
      return { success: true, project: newProject };
    } catch (error) {
      return { success: false, error: "Failed to create project" };
    }
  },

  // Update project
  updateProject: (
    id: string,
    updates: Partial<Project>
  ): { success: boolean; error?: string } => {
    try {
      const projects = localStorageDB.getProjects();
      const index = projects.findIndex((p) => p.id === id);
      if (index === -1) {
        return { success: false, error: "Project not found" };
      }
      projects[index] = { ...projects[index], ...updates };
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to update project" };
    }
  },

  // Delete project
  deleteProject: (id: string): { success: boolean; error?: string } => {
    try {
      const projects = localStorageDB.getProjects();
      const filtered = projects.filter((p) => p.id !== id);
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(filtered));
      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to delete project" };
    }
  },

  // Clear all projects (for testing)
  clearAll: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(PROJECTS_KEY);
    }
  },
};
