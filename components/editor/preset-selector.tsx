'use client';

import { Marketplace, MarketplacePreset, MARKETPLACE_CONFIGS } from '@/types';

interface PresetSelectorProps {
  marketplace: Marketplace;
  selectedPreset: MarketplacePreset;
  onPresetChange: (preset: MarketplacePreset) => void;
}

export function PresetSelector({
  marketplace,
  selectedPreset,
  onPresetChange,
}: PresetSelectorProps) {
  const config = MARKETPLACE_CONFIGS[marketplace];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Export Size Preset
      </h3>
      
      <div className="space-y-3">
        {config.presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onPresetChange(preset)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedPreset.name === preset.name
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-gray-900">{preset.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {preset.width} × {preset.height}
                </div>
              </div>
              {selectedPreset.name === preset.name && (
                <div className="h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full" />
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-2">{preset.description}</div>
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">
          <strong>Aspect Ratio:</strong> {config.aspectRatio}
        </div>
      </div>
    </div>
  );
}
