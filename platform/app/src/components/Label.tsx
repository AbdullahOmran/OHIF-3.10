import React from 'react';

type LabelType = 'healthy' | 'suspicious' | 'error';

interface LabelProps {
  type: LabelType;
  children: React.ReactNode;
}

const labelStyles: Record<LabelType, string> = {
  healthy:
    'bg-green-950 text-green-300 border-green-600 hover:bg-green-900 hover:border-green-500 bg-green-800/50',
  suspicious:
    'bg-orange-950 text-orange-200 border-orange-600 hover:bg-orange-900 hover:border-orange-500 bg-orange-800/50',
  error:
    'bg-red-950 text-red-200 border-red-600 hover:bg-red-900 hover:border-red-500 bg-red-800/50',
};

export function Label({ type, children }: LabelProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border-2 px-3 py-1 text-sm font-semibold transition-colors duration-200 ${labelStyles[type]}`}
    >
      {children}
    </span>
  );
}
