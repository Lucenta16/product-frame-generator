'use client';

import { UsageLimit, FREE_PLAN_EXPORT_LIMIT } from '@/types';

interface UsageDisplayProps {
  usageLimit: UsageLimit | null;
}

export function UsageDisplay({ usageLimit }: UsageDisplayProps) {
  if (!usageLimit) {
    return null;
  }

  const isPro = usageLimit.plan === 'pro';
  const remaining = isPro
    ? Infinity
    : Math.max(0, FREE_PLAN_EXPORT_LIMIT - usageLimit.exports_count);

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
      <span className="text-sm font-medium text-gray-700">
        {isPro ? (
          <span className="text-indigo-600">Pro Plan</span>
        ) : (
          <>
            Exports: {usageLimit.exports_count}/{FREE_PLAN_EXPORT_LIMIT}
          </>
        )}
      </span>
      {!isPro && remaining === 0 && (
        <span className="text-xs text-red-600 font-medium">Limit Reached</span>
      )}
    </div>
  );
}
