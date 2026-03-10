"use client";

import { useEffect, useRef } from "react";
import { Project, MARKETPLACE_CONFIGS, DEFAULT_BADGES } from "@/types";

interface TemplatePreviewProps {
  project: Project;
  size?: number;
}

export function TemplatePreview({ project, size = 200 }: TemplatePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const marketplaceConfig = MARKETPLACE_CONFIGS[project.marketplace];
    const preset = project.selected_preset_name
      ? marketplaceConfig.presets.find(
          (p) => p.name === project.selected_preset_name,
        )
      : marketplaceConfig.presets[0];

    if (!preset) return;

    // Set canvas to preset dimensions
    canvas.width = preset.width;
    canvas.height = preset.height;

    // Draw background
    ctx.fillStyle =
      project.background_color || marketplaceConfig.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create placeholder image (gradient)
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    gradient.addColorStop(0, "#E5E7EB");
    gradient.addColorStop(1, "#9CA3AF");

    const borderThickness = project.border_thickness || 0;
    const imgAspect = 1; // Square placeholder
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

    // Function to draw border and badges
    const drawBorderAndBadges = async () => {
      // Draw border
      if (borderThickness > 0) {
        ctx.strokeStyle = project.border_color || "#000000";
        ctx.lineWidth = borderThickness;
        ctx.strokeRect(
          borderThickness / 2,
          borderThickness / 2,
          canvas.width - borderThickness,
          canvas.height - borderThickness,
        );
      }

      // Draw badges
      const badges = project.selected_badges || [];
      const badgeSize = project.badge_size || 15;

      if (badges.length > 0) {
        const calculatedBadgeSize =
          Math.min(canvas.width, canvas.height) * (badgeSize / 100);

        // Load all badges in parallel and wait for all to complete
        const badgePromises = badges.map(async (badge, index) => {
          try {
            const response = await fetch(badge.url);
            let svgText = await response.text();

            if (badge.color) {
              svgText = svgText.replace(/currentColor/g, badge.color);
            }

            const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
            const svgUrl = URL.createObjectURL(svgBlob);

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
                URL.revokeObjectURL(svgUrl);
                resolve();
              };
              badgeImg.onerror = () => {
                console.error("Error loading badge image:", badge.url);
                URL.revokeObjectURL(svgUrl);
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
      }
    };

    // Load and draw placeholder image
    const placeholderImg = new Image();
    placeholderImg.crossOrigin = "anonymous";
    placeholderImg.onload = async () => {
      ctx.drawImage(placeholderImg, offsetX, offsetY, drawWidth, drawHeight);
      await drawBorderAndBadges();
    };
    placeholderImg.onerror = async () => {
      // Fallback to gradient if image fails to load
      ctx.fillStyle = gradient;
      ctx.fillRect(offsetX, offsetY, drawWidth, drawHeight);
      await drawBorderAndBadges();
    };
    placeholderImg.src =
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
  }, [project]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto rounded-lg border border-gray-200"
      style={{ maxWidth: `${size}px` }}
    />
  );
}
