"use client";

import { Badge, DEFAULT_BADGES } from "@/types";
import { X } from "lucide-react";

interface BadgeSelectorProps {
  selectedBadges: Badge[];
  onBadgesChange: (badges: Badge[]) => void;
  badgeSize: number;
  onBadgeSizeChange: (size: number) => void;
}

export function BadgeSelector({
  selectedBadges,
  onBadgesChange,
  badgeSize,
  onBadgeSizeChange,
}: BadgeSelectorProps) {
  const toggleBadge = (badge: Badge) => {
    const isSelected = selectedBadges.some((b) => b.id === badge.id);
    if (isSelected) {
      onBadgesChange(selectedBadges.filter((b) => b.id !== badge.id));
    } else {
      onBadgesChange([...selectedBadges, badge]);
    }
  };

  const updateBadgeColor = (badgeId: string, color: string) => {
    onBadgesChange(
      selectedBadges.map((b) => (b.id === badgeId ? { ...b, color } : b)),
    );
  };

  const clearAll = () => {
    onBadgesChange([]);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Badge Overlays</h3>
        {selectedBadges.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-gray-500 hover:text-gray-700"
            title="Clear all badges">
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {DEFAULT_BADGES.map((badge) => {
          const isSelected = selectedBadges.some((b) => b.id === badge.id);
          return (
            <button
              key={badge.id}
              onClick={() => toggleBadge(badge)}
              className={`p-3 rounded-lg border-2 transition-all text-left flex items-center gap-2 ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => {}}
                className="h-4 w-4 text-indigo-600 rounded"
              />
              <div className="text-sm font-medium text-gray-900">
                {badge.name}
              </div>
            </button>
          );
        })}
      </div>

      {selectedBadges.length > 0 && (
        <>
          <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
            <p className="text-sm text-indigo-700">
              <strong>{selectedBadges.length}</strong> badge
              {selectedBadges.length > 1 ? "s" : ""} selected
            </p>
            <p className="text-xs text-indigo-600 mt-1">
              Badges will appear in exported images
            </p>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Badge Colors
              </h4>
              <div className="space-y-3">
                {selectedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">
                      {badge.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={badge.color || "#000000"}
                        onChange={(e) =>
                          updateBadgeColor(badge.id, e.target.value)
                        }
                        className="h-8 w-16 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={badge.color || "#000000"}
                        onChange={(e) =>
                          updateBadgeColor(badge.id, e.target.value)
                        }
                        className="w-24 px-2 py-1 text-xs font-mono border border-gray-300 rounded text-gray-900"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-900">
                  Badge Size
                </h4>
                <span className="text-xs font-medium text-gray-600">
                  {badgeSize}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="25"
                value={badgeSize}
                onChange={(e) => onBadgeSizeChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Small (10%)</span>
                <span>Large (25%)</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
