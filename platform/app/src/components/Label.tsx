import React from 'react';

type LabelType = 'healthy' | 'suspicious' | 'error';

interface LabelProps {
  type: LabelType;
  children: React.ReactNode;
}

const labelStyles: Record<LabelType, string> = {
  healthy: 'bg-[#2a3110] text-[#008A2E] border-[#008A2E]',
  suspicious: 'bg-[#2a3110] text-[#db9210] border-[#db9210]',
  error: 'bg-red-100 text-red-800 border-red-200',
};

export function Label({ type, children }: LabelProps) {
  return (
    <span
      className={`ml-5 inline-block rounded-full border px-3 py-1 text-xs font-medium ${labelStyles[type]}`}
    >
      {children}
    </span>
  );
}
