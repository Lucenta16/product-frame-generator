"use client";

import { useState, useEffect } from "react";
import { ProjectList } from "@/components/dashboard/project-list";
import { CreateProjectDialog } from "@/components/dashboard/create-project-dialog";
import { Image as ImageIcon, Home } from "lucide-react";
import Link from "next/link";
import { localStorageDB } from "@/lib/local-storage";
import { Project } from "@/types";

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(localStorageDB.getProjects());
  }, []);

  const handleProjectsChange = () => {
    setProjects(localStorageDB.getProjects());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <nav className="border-b border-slate-200/60 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <ImageIcon className="relative h-9 w-9 text-white bg-gradient-to-br from-blue-600 to-indigo-600 p-1.5 rounded-xl" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Product Frame Generator
                </span>
              </div>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-semibold">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
            </div>
            <div className="flex items-center gap-4"></div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Frame Templates
              </h1>
              <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold rounded-full">
                {projects.length}
              </div>
            </div>
            <p className="text-lg text-slate-600">
              Create and manage your reusable frame styles
            </p>
          </div>
          <CreateProjectDialog />
        </div>

        <ProjectList
          projects={projects}
          onProjectsChange={handleProjectsChange}
        />
      </main>
    </div>
  );
}
