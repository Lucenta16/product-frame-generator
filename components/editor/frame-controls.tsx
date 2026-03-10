"use client";

import { Palette, Maximize2 } from "lucide-react";

interface FrameControlsProps {
  borderColor: string;
  borderThickness: number;
  backgroundColor: string;
  onBorderColorChange: (color: string) => void;
  onBorderThicknessChange: (thickness: number) => void;
  onBackgroundColorChange: (color: string) => void;
}

export function FrameControls({
  borderColor,
  borderThickness,
  backgroundColor,
  onBorderColorChange,
  onBorderThicknessChange,
  onBackgroundColorChange,
}: FrameControlsProps) {
  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <Palette className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Frame Settings</h3>
      </div>

      <div className="space-y-6">
        <div className="group">
          <label className="block text-sm font-bold text-slate-900 mb-3">
            Border Color
          </label>
          <div className="flex items-center gap-3">
            <div className="relative group/color">
              <div
                className="h-14 w-14 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all hover:scale-110"
                style={{ backgroundColor: borderColor }}
                onClick={() =>
                  document.getElementById("border-color-input")?.click()
                }>
                <input
                  id="border-color-input"
                  type="color"
                  value={borderColor}
                  onChange={(e) => onBorderColorChange(e.target.value)}
                  className="opacity-0 w-0 h-0 absolute"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-3 border-white shadow-lg group-hover/color:scale-110 transition-transform"></div>
            </div>
            <input
              type="text"
              value={borderColor}
              onChange={(e) => onBorderColorChange(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="#000000"
            />
          </div>
        </div>

        <div className="group">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Maximize2 className="h-4 w-4 text-blue-500" />
              Border Thickness
            </label>
            <div className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold rounded-full shadow-md">
              {borderThickness}px
            </div>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="50"
              value={borderThickness}
              onChange={(e) => onBorderThicknessChange(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(59 130 246) ${(borderThickness / 50) * 100}%, rgb(226 232 240) ${(borderThickness / 50) * 100}%, rgb(226 232 240) 100%)`,
              }}
            />
            <div className="flex justify-between mt-2 text-xs font-semibold text-slate-500">
              <span>0px</span>
              <span>25px</span>
              <span>50px</span>
            </div>
          </div>
        </div>

        <div className="group">
          <label className="block text-sm font-bold text-slate-900 mb-3">
            Background Color
          </label>
          <div className="flex items-center gap-3">
            <div className="relative group/color">
              <div
                className="h-14 w-14 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all hover:scale-110"
                style={{ backgroundColor: backgroundColor }}
                onClick={() =>
                  document.getElementById("bg-color-input")?.click()
                }>
                <input
                  id="bg-color-input"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => onBackgroundColorChange(e.target.value)}
                  className="opacity-0 w-0 h-0 absolute"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full border-3 border-white shadow-lg group-hover/color:scale-110 transition-transform"></div>
            </div>
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
