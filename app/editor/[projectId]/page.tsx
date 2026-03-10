"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { localStorageDB } from "@/lib/local-storage";
import { ImageEditor } from "@/components/editor/image-editor";
import { Project } from "@/types";

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = params.projectId as string;
    const foundProject = localStorageDB.getProject(projectId);

    if (!foundProject) {
      router.push("/dashboard");
      return;
    }

    setProject(foundProject);
    setLoading(false);
  }, [params.projectId, router]);

  if (loading || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-slate-600">Loading...</div>
      </div>
    );
  }

  return <ImageEditor project={project} />;
}
