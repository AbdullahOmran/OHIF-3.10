import React, { useState, useMemo, useEffect } from 'react';

import { Dialog } from './Dialog';

// Reusable Stat Display Component
const StatDisplay = ({ segment, otherSegment, statPreferences, forceHUStats, handleNumber }) => {
  const getBetterValue = (statKey, leftValue, rightValue) => {
    if (
      leftValue === null ||
      rightValue === null ||
      leftValue === undefined ||
      rightValue === undefined
    ) {
      return null;
    }
    const preference = statPreferences[statKey] || 'none';
    if (preference === 'none') {
      return null;
    }
    if (leftValue === rightValue) {
      return 'tie';
    }
    if (preference === 'smaller') {
      return leftValue < rightValue ? 'left' : 'right';
    }
    if (preference === 'larger') {
      return leftValue > rightValue ? 'left' : 'right';
    }
    if (preference === 'smallerAbs') {
      return Math.abs(leftValue) < Math.abs(rightValue) ? 'left' : 'right';
    }
    return null;
  };

  return (
    <div
      className="border-b pb-4"
      style={{ borderColor: 'rgb(37, 42, 116)' }}
    >
      <div className="mb-3 flex items-center space-x-2">
        <h3
          className="text-lg font-semibold"
          style={{ color: 'rgb(125, 179, 207)' }}
        >
          {segment.label || 'Selected Segment'}
        </h3>
      </div>
      <div className="space-y-2">
        {segment.cachedStats?.namedStats &&
        Object.keys(segment.cachedStats.namedStats).length > 0 ? (
          Object.entries(segment.cachedStats.namedStats)
            .filter(([_, stat]) => stat && stat.value !== null)
            .sort(
              (a, b) =>
                (a[1]?.order ?? Number.MAX_SAFE_INTEGER) - (b[1]?.order ?? Number.MAX_SAFE_INTEGER)
            )
            .map(([statKey, stat]) => {
              const isBetter = getBetterValue(
                stat.name,
                segment === segment
                  ? stat.value
                  : otherSegment?.cachedStats?.namedStats?.[statKey]?.value,
                segment === segment
                  ? otherSegment?.cachedStats?.namedStats?.[statKey]?.value
                  : stat.value
              );
              const isNumeric =
                typeof stat.value === 'number' &&
                typeof otherSegment?.cachedStats?.namedStats?.[statKey]?.value === 'number';
              const displayUnit = forceHUStats.includes(stat.name)
                ? 'HU'
                : stat.unit && stat.unit !== 'none'
                  ? stat.unit
                  : '';
              // Show diff only if this segment's value is better or it's a tie
              const showDiff =
                isNumeric &&
                (isBetter === (segment === segment ? 'left' : 'right') || isBetter === 'tie');
              return (
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
                      style={{
                        color: 'white',
                        fontWeight:
                          isBetter === (segment === segment ? 'left' : 'right') ||
                          isBetter === 'tie'
                            ? 'bold'
                            : 'normal',
                        backgroundColor:
                          isBetter === (segment === segment ? 'left' : 'right')
                            ? 'rgba(0, 255, 0, 0.2)'
                            : isBetter === 'tie'
                              ? 'rgba(255, 255, 0, 0.2)'
                              : isBetter === (segment === segment ? 'right' : 'left')
                                ? 'rgba(255, 0, 0, 0.2)'
                                : 'transparent',
                        padding: isBetter ? '2px 4px' : '0',
                        borderRadius: isBetter ? '4px' : '0',
                      }}
                      className="text-lg font-normal"
                    >
                      {handleNumber(stat.value)}
                    </span>
                    <span
                      style={{ color: 'rgb(125, 179, 207)' }}
                      className="text-md"
                    >
                      {displayUnit}
                    </span>
                    {showDiff && (
                      <span
                        style={{ color: 'rgb(125, 179, 207)' }}
                        className="text-sm"
                      >
                        (Diff:{' '}
                        {handleNumber(
                          Math.abs(
                            stat.value - otherSegment?.cachedStats?.namedStats?.[statKey]?.value
                          )
                        )}{' '}
                        {displayUnit})
                      </span>
                    )}
                  </div>
                </div>
              );
            })
        ) : (
          <p className="text-gray-500">No valid stats available</p>
        )}
      </div>
    </div>
  );
};

const CompareSegs = ({ AllSegmentations }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [leftSegment, setLeftSegment] = useState('');
  const [rightSegment, setRightSegment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNumber = value => {
    if (value === null || value === undefined) {
      return '';
    }
    if (Array.isArray(value)) {
      return value.map(handleNumber).join(', ');
    }
    if (typeof value === 'number') {
      return Number(value).toFixed(2);
    }
    return String(value);
  };

  const statPreferences = {
    min: 'smaller',
    max: 'larger',
    mean: 'smaller',
    stdDev: 'smaller',
    median: 'smaller',
    skewness: 'smallerAbs',
    kurtosis: 'smaller',
    count: 'larger',
    volume: 'larger',
    maxLPS: 'none',
    minLPS: 'none',
    center: 'none',
  };

  // const allSegments = useMemo(() => {
  //   setIsLoading(true);
  //   const segments = AllSegmentations.flatMap((entry, segIndex) =>
  //     Object.entries(entry.segments).map(([key, segment]) => ({
  //       key: `${segIndex}-${key}`,
  //       label: `${entry.label}: ${segment.label || `Segment ${key}`}`,
  //       segment,
  //       segmentationId: entry.segmentationId,
  //     }))
  //   );
  //   setIsLoading(false);
  //   return segments;
  // }, [AllSegmentations]);

  const allSegments = AllSegmentations.flatMap((entry, segIndex) =>
    Object.entries(entry.segments).map(([key, segment]) => ({
      key: `${segIndex}-${key}`,
      label: `${entry.label}: ${segment.label || `Segment ${key}`}`,
      segment,
      segmentationId: entry.segmentationId,
    }))
  );

  const leftSelected = allSegments.find(seg => seg.key === leftSegment)?.segment;
  const rightSelected = allSegments.find(seg => seg.key === rightSegment)?.segment;

  const handleLeftSegmentChange = value => {
    if (value === rightSegment) {
      return;
    }
    setLeftSegment(value);
  };

  const handleRightSegmentChange = value => {
    if (value === leftSegment) {
      return;
    }
    setRightSegment(value);
  };

  const forceHUStats = ['min', 'max', 'mean'];

  return (
    <>
      <div className="m-4 flex flex-col items-center justify-center gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-main hover:bg-primary-main/50 w-full rounded p-2 text-white"
        >
          Compare Stats
        </button>
      </div>
      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Compare Segments Statistics"
      >
        <div
          className="rounded-lg p-6"
          style={{ backgroundColor: 'rgb(9, 12, 42)' }}
        >
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="mb-2 text-sm text-gray-400">
                Bold/green indicates better values (e.g., smaller for Std. Dev., larger for Volume).
                Red indicates worse values. Yellow indicates a tie.
              </div>
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
                    onChange={e => handleLeftSegmentChange(e.target.value)}
                    className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                  >
                    <option value="">Select a segment</option>
                    {allSegments.map(seg => (
                      <option
                        key={seg.key}
                        value={seg.key}
                        className="text-black"
                        disabled={seg.key === rightSegment}
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
                    onChange={e => handleRightSegmentChange(e.target.value)}
                    className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                  >
                    <option value="">Select a segment</option>
                    {allSegments.map(seg => (
                      <option
                        key={seg.key}
                        value={seg.key}
                        className="text-black"
                        disabled={seg.key === leftSegment}
                      >
                        {seg.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  {leftSelected ? (
                    <StatDisplay
                      segment={leftSelected}
                      otherSegment={rightSelected}
                      statPreferences={statPreferences}
                      forceHUStats={forceHUStats}
                      handleNumber={handleNumber}
                    />
                  ) : (
                    <p className="text-gray-500">Select a segment to compare</p>
                  )}
                </div>
                <div>
                  {rightSelected ? (
                    <StatDisplay
                      segment={rightSelected}
                      otherSegment={leftSelected}
                      statPreferences={statPreferences}
                      forceHUStats={forceHUStats}
                      handleNumber={handleNumber}
                    />
                  ) : (
                    <p className="text-gray-500">Select a segment to compare</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default CompareSegs;
