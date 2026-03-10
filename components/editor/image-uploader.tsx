"use client";

import { useCallback } from "react";
import { Upload } from "lucide-react";

interface ImageUploaderProps {
  onImagesUpload: (files: File[]) => void;
  hasImages?: boolean;
}

export function ImageUploader({
  onImagesUpload,
  hasImages = false,
}: ImageUploaderProps) {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        onImagesUpload(files);
      }
    },
    [onImagesUpload],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onImagesUpload(files);
      }
    },
    [onImagesUpload],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="text-center">
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {hasImages ? "Add More Images" : "Upload Product Images"}
        </h3>
        <p className="text-gray-600 mb-4">
          Drag and drop images here, or click to browse
        </p>
        <label className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {hasImages ? "Add More Files" : "Choose Files"}
        </label>
        <p className="text-sm text-gray-500 mt-4">
          Supports: JPG, PNG, WebP • Multiple images supported
        </p>
      </div>
    </div>
  );
}
