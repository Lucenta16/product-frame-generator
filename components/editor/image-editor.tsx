"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Project,
  MARKETPLACE_CONFIGS,
  MarketplacePreset,
  DEFAULT_BADGES,
  Badge,
  BadgePosition,
} from "@/types";
import {
  processImage,
  validateImageResolution,
  checkMinimumResolution,
} from "@/lib/image-processing";
import { localStorageDB } from "@/lib/local-storage";
import { useToast } from "@/components/ui/toast";
import { ImageUploader } from "./image-uploader";
import { PresetSelector } from "./preset-selector";
import { FrameControls } from "./frame-controls";
import { BadgeSelector } from "./badge-selector";
import { Canvas } from "./canvas";
import { ExportButton } from "./export-button";
import { ArrowLeft, Crown, Sparkles } from "lucide-react";
import Link from "next/link";
import JSZip from "jszip";

interface ImageEditorProps {
  project: Project;
}

export function ImageEditor({ project }: ImageEditorProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [hasUserImages, setHasUserImages] = useState(false);

  // Load saved preset or use first preset
  const initialPreset = project.selected_preset_name
    ? MARKETPLACE_CONFIGS[project.marketplace].presets.find(
        (p) => p.name === project.selected_preset_name,
      ) || MARKETPLACE_CONFIGS[project.marketplace].presets[0]
    : MARKETPLACE_CONFIGS[project.marketplace].presets[0];

  const [selectedPreset, setSelectedPreset] =
    useState<MarketplacePreset>(initialPreset);
  const [borderColor, setBorderColor] = useState(
    project.border_color || "#000000",
  );
  const [borderThickness, setBorderThickness] = useState(
    project.border_thickness || 0,
  );
  const [backgroundColor, setBackgroundColor] = useState(
    project.background_color ||
      MARKETPLACE_CONFIGS[project.marketplace].backgroundColor,
  );

  // Load saved badges if exists
  const initialBadges = project.selected_badges || [];

  const [selectedBadges, setSelectedBadges] = useState<Badge[]>(initialBadges);
  const [badgeSize, setBadgeSize] = useState(project.badge_size || 15); // Badge size as percentage (10-25%)
  const [removeBackground, setRemoveBackground] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [canExport, setCanExport] = useState(true);
  const [exportLimit, setExportLimit] = useState({ remaining: 5, limit: 5 });

  const marketplaceConfig = MARKETPLACE_CONFIGS[project.marketplace];

  // Load placeholder image on mount
  useEffect(() => {
    const loadPlaceholderImage = async () => {
      try {
        const response = await fetch("/placeholder.svg");
        const blob = await response.blob();
        const file = new File([blob], "placeholder.svg", {
          type: "image/svg+xml",
        });
        setUploadedImages([file]);
      } catch (error) {
        console.error("Failed to load placeholder image:", error);
      }
    };

    loadPlaceholderImage();
  }, []);

  // Auto-save project style when settings change
  useEffect(() => {
    const saveStyle = () => {
      localStorageDB.updateProject(project.id, {
        border_color: borderColor,
        border_thickness: borderThickness,
        background_color: backgroundColor,
        selected_badges: selectedBadges,
        badge_size: badgeSize,
        selected_preset_name: selectedPreset.name,
      });
    };

    // Debounce save to avoid too many updates
    const timeoutId = setTimeout(saveStyle, 500);
    return () => clearTimeout(timeoutId);
  }, [
    borderColor,
    borderThickness,
    backgroundColor,
    selectedBadges,
    badgeSize,
    selectedPreset,
    project.id,
  ]);

  const handleImagesUpload = (files: File[]) => {
    const validImages = files.filter((file) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.src = url;

      return file.type.startsWith("image/");
    });

    // If user already has images, append new ones; otherwise replace placeholder
    setUploadedImages((prev) => {
      if (hasUserImages) {
        return [...prev, ...validImages];
      }
      return validImages;
    });
    setHasUserImages(true);
  };

  const handleExport = async () => {
    if (uploadedImages.length === 0) {
      showToast("Please upload at least one image", "error");
      return;
    }

    if (!hasUserImages) {
      showToast("Please upload your own images to export", "error");
      return;
    }

    // Temporarily disabled for testing
    // if (!canExport) {
    //   showToast(
    //     "You have reached your export limit. Please upgrade your plan.",
    //     "error",
    //   );
    //   return;
    // }

    setIsExporting(true);

    try {
      const processedBlobs: { blob: Blob; filename: string }[] = [];

      for (let i = 0; i < uploadedImages.length; i++) {
        const file = uploadedImages[i];

        const img = new Image();
        const url = URL.createObjectURL(file);

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
        });

        // Allow all images - the canvas will scale them appropriately
        // Just show a warning if resolution is lower than ideal
        const validation = validateImageResolution(
          img.width,
          img.height,
          selectedPreset,
        );
        if (!validation.valid) {
          showToast(
            `${file.name}: Image will be upscaled. For best quality, use ${selectedPreset.width}x${selectedPreset.height} or larger.`,
            "info",
          );
        }

        // Background removal feature disabled in open-source version
        // Users can implement their own background removal by adding the API integration
        let processedFile = file;
        if (removeBackground) {
          showToast(
            "Background removal feature requires API integration",
            "info",
          );
        }

        const blob = await processImage({
          imageFile: processedFile,
          preset: selectedPreset,
          borderColor,
          borderThickness,
          backgroundColor,
          badgeSize,
          badges: selectedBadges.map((badge, index) => ({
            imageUrl: badge.url,
            x: 20 + index * 120,
            y: 20,
            color: badge.color,
          })),
        });

        const originalName = file.name.replace(/\.[^/.]+$/, "");
        const filename = `${originalName}_${selectedPreset.width}x${selectedPreset.height}.png`;

        processedBlobs.push({ blob, filename });
        URL.revokeObjectURL(url);
      }

      if (processedBlobs.length === 0) {
        showToast("No images were processed", "error");
        setIsExporting(false);
        return;
      }

      // Temporarily disabled for testing
      // const incrementResult = await incrementExportCount();
      // if (!incrementResult.success) {
      //   showToast(incrementResult.error || "Failed to process export", "error");
      //   setIsExporting(false);
      //   return;
      // }

      if (processedBlobs.length === 1) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(processedBlobs[0].blob);
        link.download = processedBlobs[0].filename;
        link.click();
        URL.revokeObjectURL(link.href);
      } else {
        const zip = new JSZip();

        processedBlobs.forEach(({ blob, filename }) => {
          zip.file(filename, blob);
        });

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(zipBlob);
        link.download = `${project.name}_export.zip`;
        link.click();
        URL.revokeObjectURL(link.href);
      }

      // await checkExportPermission(); // Disabled for testing
      showToast(
        `Successfully exported ${processedBlobs.length} image(s)!`,
        "success",
      );
    } catch (error) {
      console.error("Export error:", error);
      showToast("Failed to export images. Please try again.", "error");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <nav className="border-b border-slate-200/60 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-6">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-semibold group">
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Dashboard
              </Link>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {project.name}
                </h1>
                <span className="inline-block mt-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold rounded-full">
                  {marketplaceConfig.name}
                </span>
              </div>
            </div>
            <ExportButton
              onExport={handleExport}
              isExporting={isExporting}
              canExport={canExport && hasUserImages}
              remaining={exportLimit.remaining}
              limit={exportLimit.limit}
            />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ImageUploader
              onImagesUpload={handleImagesUpload}
              hasImages={uploadedImages.length > 0}
            />

            {uploadedImages.length > 0 && (
              <Canvas
                images={uploadedImages}
                preset={selectedPreset}
                borderColor={borderColor}
                borderThickness={borderThickness}
                backgroundColor={backgroundColor}
                badges={selectedBadges}
                badgeSize={badgeSize}
              />
            )}
          </div>

          <div className="space-y-6">
            <PresetSelector
              marketplace={project.marketplace}
              selectedPreset={selectedPreset}
              onPresetChange={setSelectedPreset}
            />

            <FrameControls
              borderColor={borderColor}
              borderThickness={borderThickness}
              backgroundColor={backgroundColor}
              onBorderColorChange={setBorderColor}
              onBorderThicknessChange={setBorderThickness}
              onBackgroundColorChange={setBackgroundColor}
            />

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border-2 border-purple-200 p-6 relative overflow-hidden">
              {/* NEW FEATURE Badge */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg">
                  <Sparkles className="h-3 w-3" />
                  NEW FEATURE
                </span>
              </div>

              <div className="flex items-start gap-3 mb-4 pr-32">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-gray-900">
                      Background Removal
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold rounded-full">
                      <Crown className="h-3 w-3" />
                      PRO
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    AI-powered background removal for professional product
                    images
                  </p>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer p-4 bg-white/80 rounded-lg hover:bg-white transition-colors border border-purple-100">
                <input
                  type="checkbox"
                  checked={removeBackground}
                  onChange={(e) => setRemoveBackground(e.target.checked)}
                  className="h-5 w-5 text-purple-600 rounded mt-0.5"
                />
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    Remove background on export
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Background will only be removed when you export (saves API
                    credits)
                  </div>
                </div>
              </label>
            </div>

            <BadgeSelector
              selectedBadges={selectedBadges}
              onBadgesChange={setSelectedBadges}
              badgeSize={badgeSize}
              onBadgeSizeChange={setBadgeSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
