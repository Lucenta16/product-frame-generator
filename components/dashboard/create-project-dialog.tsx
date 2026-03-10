"use client";

import { useState } from "react";
import { localStorageDB } from "@/lib/local-storage";
import { Marketplace, MARKETPLACE_CONFIGS } from "@/types";
import { Plus, X, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateProjectDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [marketplace, setMarketplace] = useState<Marketplace>("amazon");
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a project name");
      return;
    }

    setIsCreating(true);
    const result = localStorageDB.createProject(name, marketplace);

    if (result.success && result.project) {
      setName("");
      setMarketplace("amazon");
      setIsOpen(false);
      // Redirect to editor with new project
      router.push(`/editor/${result.project.id}`);
    } else {
      alert(result.error || "Failed to create project");
    }

    setIsCreating(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105">
        <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" />
        <span className="relative z-10">New Frame Template</span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <h2 className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Create New Template
              </h2>
            </div>
            <p className="text-slate-600">Set up your reusable frame style</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold text-slate-900 mb-3">
              Template Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 font-medium transition-all"
              placeholder="e.g., Premium Gold Frame"
              required
            />
          </div>

          <div>
            <label
              htmlFor="marketplace"
              className="block text-sm font-bold text-slate-900 mb-3">
              Marketplace
            </label>
            <select
              id="marketplace"
              value={marketplace}
              onChange={(e) => setMarketplace(e.target.value as Marketplace)}
              className="w-full px-5 py-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 font-medium transition-all">
              {Object.entries(MARKETPLACE_CONFIGS).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
            <p className="text-sm font-bold text-slate-900 mb-3">
              {MARKETPLACE_CONFIGS[marketplace].name} Presets:
            </p>
            <ul className="text-sm text-slate-700 space-y-2">
              {MARKETPLACE_CONFIGS[marketplace].presets.map((preset) => (
                <li key={preset.name} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  <span className="font-semibold">{preset.name}:</span>
                  <span className="text-slate-600">
                    {preset.width}x{preset.height}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-6 py-3.5 border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all font-bold">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="group relative flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="relative z-10">
                {isCreating ? "Creating..." : "Create Template"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
