import React from 'react';

export const Dialog = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div className="bg-primary-dark flex max-h-[90vh] w-full max-w-5xl flex-col rounded-lg p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2
            id="dialog-title"
            className="text-xl font-semibold"
          >
            {title || ''}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-white"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
