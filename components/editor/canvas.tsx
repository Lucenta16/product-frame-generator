"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { MarketplacePreset, Badge, BadgePosition } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CanvasProps {
  images: File[];
  preset: MarketplacePreset;
  borderColor: string;
  borderThickness: number;
  backgroundColor: string;
  badges: Badge[];
  badgeSize: number;
}

export function Canvas({
  images,
  preset,
  borderColor,
  borderThickness,
  backgroundColor,
  badgeSize,
  badges,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [baseImageReady, setBaseImageReady] = useState(false);
  const baseImageRef = useRef<ImageData | null>(null);
  const coreImageRef = useRef<ImageData | null>(null);
  const svgCacheRef = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setBaseImageReady(false);

    canvas.width = preset.width;
    canvas.height = preset.height;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;

      let drawWidth = canvas.width - borderThickness * 2;
      let drawHeight = canvas.height - borderThickness * 2;
      let offsetX = borderThickness;
      let offsetY = borderThickness;

      if (imgAspect > canvasAspect) {
        drawHeight = drawWidth / imgAspect;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = drawHeight * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // Save core image without border/background
      coreImageRef.current = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      );
      setBaseImageReady(true);
    };

    reader.readAsDataURL(images[currentImageIndex]);
  }, [images, currentImageIndex, preset]);

  // Separate effect for border/background - only redraws these layers
  useEffect(() => {
    if (!baseImageReady || !coreImageRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Restore core image
    ctx.putImageData(coreImageRef.current, 0, 0);

    // Draw background
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";

    // Draw border
    if (borderThickness > 0) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderThickness;
      ctx.strokeRect(
        borderThickness / 2,
        borderThickness / 2,
        canvas.width - borderThickness,
        canvas.height - borderThickness,
      );
    }

    // Save complete base image
    baseImageRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }, [baseImageReady, borderColor, borderThickness, backgroundColor]);

  useEffect(() => {
    if (!baseImageReady || !baseImageRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawBadges = async () => {
      // Restore base image first
      ctx.putImageData(baseImageRef.current!, 0, 0);

      if (badges.length === 0) return;

      const calculatedBadgeSize =
        Math.min(canvas.width, canvas.height) * (badgeSize / 100);

      // Load all badges in parallel and wait for all to complete
      const badgePromises = badges.map(async (badge, index) => {
        try {
          const cacheKey = `${badge.url}_${badge.color}`;
          let svgUrl: string;

          if (svgCacheRef.current.has(cacheKey)) {
            svgUrl = svgCacheRef.current.get(cacheKey)!;
          } else {
            const response = await fetch(badge.url);
            let svgText = await response.text();

            if (badge.color) {
              svgText = svgText.replace(/currentColor/g, badge.color);
            }

            const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
            svgUrl = URL.createObjectURL(svgBlob);
            svgCacheRef.current.set(cacheKey, svgUrl);
          }

          // Return a promise that resolves when image is loaded
          return new Promise<void>((resolve) => {
            const badgeImg = new Image();
            badgeImg.onload = () => {
              const spacing = calculatedBadgeSize + 10;
              const x = 20 + index * spacing;
              const y = 20;
              ctx.drawImage(
                badgeImg,
                x,
                y,
                calculatedBadgeSize,
                calculatedBadgeSize,
              );
              resolve();
            };
            badgeImg.onerror = () => {
              console.error("Error loading badge image:", badge.url);
              resolve(); // Resolve anyway to not block other badges
            };
            badgeImg.src = svgUrl;
          });
        } catch (error) {
          console.error("Error loading badge:", error);
        }
      });

      // Wait for all badges to load and draw
      await Promise.all(badgePromises);
    };

    drawBadges();
  }, [badges, badgeSize]);

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 sticky top-4 z-10 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900">Live Preview</h3>
        {images.length > 1 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev > 0 ? prev - 1 : images.length - 1,
                )
              }
              className="group flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-blue-500 hover:to-indigo-600 text-slate-700 hover:text-white rounded-xl font-semibold text-sm transition-all hover:scale-105 shadow-md hover:shadow-lg">
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Prev</span>
            </button>
            <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-sm shadow-md">
              {currentImageIndex + 1} / {images.length}
            </div>
            <button
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev < images.length - 1 ? prev + 1 : 0,
                )
              }
              className="group flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-blue-500 hover:to-indigo-600 text-slate-700 hover:text-white rounded-xl font-semibold text-sm transition-all hover:scale-105 shadow-md hover:shadow-lg">
              <span>Next</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          className="border border-gray-300 rounded-lg shadow-sm"
          style={{ maxWidth: "600px", width: "100%", height: "auto" }}
        />
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">
          <strong>Export Size:</strong> {preset.width} × {preset.height} pixels
        </div>
      </div>
    </div>
  );
}
