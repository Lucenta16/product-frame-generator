'use client';

import { Download } from 'lucide-react';

interface ExportButtonProps {
  onExport: () => void;
  isExporting: boolean;
  canExport: boolean;
  remaining: number;
  limit: number;
}

export function ExportButton({
  onExport,
  isExporting,
  canExport,
  remaining,
  limit,
}: ExportButtonProps) {
  return (
    <div className="flex items-center gap-4">
      {limit !== Infinity && (
        <div className="text-sm text-gray-600">
          <span className="font-medium">
            {remaining} / {limit}
          </span>{' '}
          exports remaining
        </div>
      )}
      <button
        onClick={onExport}
        disabled={isExporting || !canExport}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        <Download className="h-5 w-5" />
        {isExporting ? 'Exporting...' : 'Export Images'}
      </button>
    </div>
  );
}
