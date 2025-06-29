import React from 'react';

type LabelType = 'healthy' | 'suspicious' | 'error';

interface LabelProps {
  type: LabelType;
  children: React.ReactNode;
}

const labelStyles: Record<LabelType, string> = {
  healthy: 'bg-[#2a3110] text-[#008A2E] border-[#2a3110]',
  suspicious: 'bg-orange-900 text-orange-300 border-orange-900',
  error: 'bg-red-900 text-red-300 border-red-300',
};

export function Label({ type, children }: LabelProps) {
  return (
    <span
      className={`red ml-5 inline-block rounded-full border-2 px-3 py-1 text-xs font-medium ${labelStyles[type]}`}
    >
      {children}
    </span>
  );
}
