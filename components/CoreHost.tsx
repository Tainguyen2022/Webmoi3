
import React from 'react';
import { CORE_REGISTRY, getCoreByKey } from '../cores';

export default function CoreHost({ canonKey }: { canonKey?: string | null }) {
  const Comp = getCoreByKey(canonKey);
  if (!Comp) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-600 bg-white">
        Chưa có nội dung cho <b>{canonKey || '—'}</b>.
        <div className="mt-2">
          Keys sẵn có: <code className="text-xs">{Object.keys(CORE_REGISTRY).join(', ')}</code>
        </div>
      </div>
    );
  }
  return <Comp />;
}
