"use client";

import { useState } from "react";
import Link from "next/link";
import { Project, MARKETPLACE_CONFIGS } from "@/types";
import { localStorageDB } from "@/lib/local-storage";
import { TemplatePreview } from "./template-preview";
import { Trash2, ExternalLink, Sparkles, Tag } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onDelete?: () => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const marketplaceConfig = MARKETPLACE_CONFIGS[project.marketplace];
  const preset = project.selected_preset_name
    ? marketplaceConfig.presets.find(
        (p) => p.name === project.selected_preset_name,
      )
    : marketplaceConfig.presets[0];

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this template?")) {
      return;
    }

    setIsDeleting(true);
    const result = localStorageDB.deleteProject(project.id);

    if (!result.success) {
      alert(result.error || "Failed to delete template");
      setIsDeleting(false);
    } else {
      onDelete?.();
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Preview Thumbnail */}
      <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 p-4 flex justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <TemplatePreview project={project} size={200} />
      </div>

      {/* Template Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 truncate mb-1.5 group-hover:text-blue-600 transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold rounded-full">
                {marketplaceConfig.name}
              </span>
            </div>
          </div>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl disabled:opacity-50 transition-all"
            title="Delete template">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        {/* Template Settings Summary */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Tag className="h-4 w-4 text-blue-500" />
            <span className="font-semibold">Preset:</span>
            <span className="text-slate-700">{preset?.name || "Default"}</span>
          </div>
          {project.selected_badges && project.selected_badges.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="font-semibold">Badges:</span>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                {project.selected_badges.length}
              </span>
            </div>
          )}
          {project.border_thickness && project.border_thickness > 0 && (
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="h-4 w-4 rounded border-2 border-slate-400"></div>
              <span className="font-semibold">Border:</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-md border border-slate-300 shadow-sm"
                  style={{ backgroundColor: project.border_color || "#000000" }}
                />
                <span className="text-slate-700 font-medium">
                  {project.border_thickness}px
                </span>
              </div>
            </div>
          )}
        </div>

        <Link
          href={`/editor/${project.id}`}
          className="group/btn relative flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105">
          <span className="relative z-10 flex items-center gap-2">
            Use Template
            <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
        </Link>
      </div>
    </div>
  );
}
