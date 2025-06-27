import React, { useState } from 'react';

const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-white">
      <div className="bg-primary-dark max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-lg p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Compare Segments Statistics</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-white"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const CompareSegs = ({ AllSegmentations }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leftSegment, setLeftSegment] = useState('');
  const [rightSegment, setRightSegment] = useState('');

  const handleNumber = value => {
    if (value === null || value === undefined) {
      return '';
    }
    if (Array.isArray(value)) {
      return value.map(handleNumber).join(', ');
    }
    return Number(value).toFixed(2);
  };

  // Flatten AllSegmentations to create an array of segments with unique keys
  const allSegments = AllSegmentations.flatMap((entry, segIndex) =>
    Object.entries(entry.segments).map(([key, segment]) => ({
      key: `${segIndex}-${key}`, // Unique key combining segmentation index and segment key
      label: `${entry.label}: ${segment.label || `Segment ${key}`}`, // Updated label format
      segment,
      segmentationId: entry.segmentationId, // Optional, for reference
    }))
  );

  // Find selected segments using the unique key
  const leftSelected = allSegments.find(seg => seg.key === leftSegment)?.segment;
  const rightSelected = allSegments.find(seg => seg.key === rightSegment)?.segment;

  return (
    <>
      <div className="m-2 flex items-center justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
        >
          Compare Stats
        </button>
      </div>
      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div
          className="rounded-lg p-6"
          style={{ backgroundColor: 'rgb(9, 12, 42)' }}
        >
          <div className="space-y-6">
            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <label
                  className="mb-1 block text-sm font-medium"
                  style={{ color: 'rgb(125, 179, 207)' }}
                >
                  Left Segment
                </label>
                <select
                  value={leftSegment}
                  onChange={e => setLeftSegment(e.target.value)}
                  className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                >
                  <option value="">Select a segment</option>
                  {allSegments.map(seg => (
                    <option
                      key={seg.key}
                      value={seg.key}
                      className="text-black"
                    >
                      {seg.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label
                  className="mb-1 block text-sm font-medium"
                  style={{ color: 'rgb(125, 179, 207)' }}
                >
                  Right Segment
                </label>
                <select
                  value={rightSegment}
                  onChange={e => setRightSegment(e.target.value)}
                  className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                >
                  <option value="">Select a segment</option>
                  {allSegments.map(seg => (
                    <option
                      key={seg.key}
                      value={seg.key}
                      className="text-black"
                    >
                      {seg.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                {leftSelected ? (
                  <div
                    className="border-b pb-4"
                    style={{ borderColor: 'rgb(37, 42, 116)' }}
                  >
                    <div className="mb-3 flex items-center space-x-2">
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: 'rgb(125, 179, 207)' }}
                      >
                        {leftSelected.label || 'Selected Segment'}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {leftSelected?.cachedStats?.namedStats ? (
                        Object.entries(leftSelected.cachedStats.namedStats)
                          .filter(([_, stat]) => stat && stat.value !== null)
                          .sort((a, b) => {
                            const orderA = a[1]?.order ?? Number.MAX_SAFE_INTEGER;
                            const orderB = b[1]?.order ?? Number.MAX_SAFE_INTEGER;
                            return orderA - orderB;
                          })
                          .map(([statKey, stat]) => (
                            <div
                              key={statKey}
                              className="flex justify-between text-sm"
                            >
                              <div
                                className="text-lg"
                                style={{ color: 'rgb(125, 179, 207)' }}
                              >
                                {stat.label}
                              </div>
                              <div className="flex items-baseline space-x-1">
                                <span
                                  style={{ color: 'white' }}
                                  className="text-lg font-normal"
                                >
                                  {handleNumber(stat.value)}
                                </span>
                                <span
                                  style={{ color: 'rgb(125, 179, 207)' }}
                                  className="text-md"
                                >
                                  {stat.unit && stat.unit !== 'none' ? stat.unit : ''}
                                </span>
                              </div>
                            </div>
                          ))
                      ) : (
                        <p className="text-gray-500">No stats available</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Select a segment to compare</p>
                )}
              </div>

              <div>
                {rightSelected ? (
                  <div
                    className="border-b pb-4"
                    style={{ borderColor: 'rgb(37, 42, 116)' }}
                  >
                    <div className="mb-3 flex items-center space-x-2">
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: 'rgb(125, 179, 207)' }}
                      >
                        {rightSelected.label || 'Selected Segment'}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {rightSelected?.cachedStats?.namedStats ? (
                        Object.entries(rightSelected.cachedStats.namedStats)
                          .filter(([_, stat]) => stat && stat.value !== null)
                          .sort((a, b) => {
                            const orderA = a[1]?.order ?? Number.MAX_SAFE_INTEGER;
                            const orderB = b[1]?.order ?? Number.MAX_SAFE_INTEGER;
                            return orderA - orderB;
                          })
                          .map(([statKey, stat]) => (
                            <div
                              key={statKey}
                              className="flex justify-between text-sm"
                            >
                              <div
                                className="text-lg"
                                style={{ color: 'rgb(125, 179, 207)' }}
                              >
                                {stat.label}
                              </div>
                              <div className="flex items-baseline space-x-1">
                                <span
                                  style={{ color: 'white' }}
                                  className="text-lg font-normal"
                                >
                                  {handleNumber(stat.value)}
                                </span>
                                <span
                                  style={{ color: 'rgb(125, 179, 207)' }}
                                  className="text-md"
                                >
                                  {stat.unit && stat.unit !== 'none' ? stat.unit : ''}
                                </span>
                              </div>
                            </div>
                          ))
                      ) : (
                        <p className="text-gray-500">No stats available</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Select a segment to compare</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CompareSegs;
