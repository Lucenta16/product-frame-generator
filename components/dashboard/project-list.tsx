"use client";

import { Project } from "@/types";
import { ProjectCard } from "./project-card";

interface ProjectListProps {
  projects: Project[];
  onProjectsChange?: () => void;
}

export function ProjectList({ projects, onProjectsChange }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500 text-lg">No frame templates yet</p>
        <p className="text-gray-400 mt-2">
          Create your first template to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={onProjectsChange}
        />
      ))}
    </div>
  );
}
