import { MarketplacePreset } from '@/types';

export interface ProcessImageOptions {
  imageFile: File;
  preset: MarketplacePreset;
  borderColor: string;
  borderThickness: number;
  backgroundColor: string;
  badgeSize?: number; // Badge size as percentage (10-25%)
  badges?: Array<{
    imageUrl: string;
    x: number;
    y: number;
    color?: string;
  }>;
}

export async function processImage(
  options: ProcessImageOptions
): Promise<Blob> {
  const {
    imageFile,
    preset,
    borderColor,
    borderThickness,
    backgroundColor,
    badgeSize = 15, // Default 15%
    badges = [],
  } = options;

  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      canvas.width = preset.width;
      canvas.height = preset.height;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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

      if (borderThickness > 0) {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderThickness;
        ctx.strokeRect(
          borderThickness / 2,
          borderThickness / 2,
          canvas.width - borderThickness,
          canvas.height - borderThickness
        );
      }

      // Render multiple badges with custom colors
      if (badges.length > 0) {
        let loadedCount = 0;
        const calculatedBadgeSize = Math.min(canvas.width, canvas.height) * (badgeSize / 100);

        const finishRendering = () => {
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob'));
            }
          }, 'image/png');
        };

        badges.forEach(async (badge, index) => {
          try {
            // Fetch SVG content
            const response = await fetch(badge.imageUrl);
            let svgText = await response.text();
            
            // Replace currentColor with the badge's custom color
            if (badge.color) {
              svgText = svgText.replace(/currentColor/g, badge.color);
            }
            
            // Convert SVG to data URL
            const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
            const svgUrl = URL.createObjectURL(svgBlob);
            
            const badgeImg = new window.Image();
            
            badgeImg.onload = () => {
              // Calculate position based on index to prevent overlap
              const spacing = calculatedBadgeSize + 10; // Add 10px gap between badges
              const x = 20 + index * spacing;
              const y = 20;
              ctx.drawImage(badgeImg, x, y, calculatedBadgeSize, calculatedBadgeSize);
              URL.revokeObjectURL(svgUrl);
              loadedCount++;
              if (loadedCount === badges.length) {
                finishRendering();
              }
            };
            
            badgeImg.onerror = () => {
              URL.revokeObjectURL(svgUrl);
              loadedCount++;
              if (loadedCount === badges.length) {
                finishRendering();
              }
            };
            
            badgeImg.src = svgUrl;
          } catch (error) {
            console.error('Error loading badge:', error);
            loadedCount++;
            if (loadedCount === badges.length) {
              finishRendering();
            }
          }
        });
      } else {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        }, 'image/png');
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    reader.readAsDataURL(imageFile);
  });
}

export function validateImageResolution(
  imageWidth: number,
  imageHeight: number,
  preset: MarketplacePreset
): { valid: boolean; message?: string } {
  // Check if image is smaller than preset
  if (imageWidth < preset.width || imageHeight < preset.height) {
    return {
      valid: false,
      message: `Current: ${imageWidth}x${imageHeight} | Recommended: ${preset.width}x${preset.height}`,
    };
  }

  return { valid: true };
}

export function checkMinimumResolution(
  imageWidth: number,
  imageHeight: number,
  preset: MarketplacePreset
): boolean {
  const minWidth = preset.width * 0.8;
  const minHeight = preset.height * 0.8;

  return imageWidth >= minWidth && imageHeight >= minHeight;
}
