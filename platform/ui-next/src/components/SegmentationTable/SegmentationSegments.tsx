import React, { useState } from 'react';
import { ScrollArea, DataRow } from '../../components';
import { PopupCard, PopupCardTrigger, PopupCardContent } from '../PopupCard';
import { useSegmentationTableContext, useSegmentationExpanded } from './contexts';
import { SegmentStatistics } from './SegmentStatistics';
import { useDynamicMaxHeight } from '../../hooks/useDynamicMaxHeight';

// Simple Dialog component for the modal
const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-white">
      <div className="bg-bkg-low max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-lg p-6">
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

const CompareSegs = ({ data }) => {
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

  const allSegments = data.flatMap(entry =>
    Object.entries(entry.segmentation.segments).map(([key, segment]) => ({
      key,
      label: segment.label,
      segment,
    }))
  );

  const leftSelected = allSegments.find(seg => seg.key === leftSegment)?.segment;
  const rightSelected = allSegments.find(seg => seg.key === rightSegment)?.segment;
  console.log('leftSelected:', leftSelected);
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
                        {leftSelected.label}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {leftSelected?.cachedStats?.namedStats &&
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
                          ))}
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
                        {rightSelected.label}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {rightSelected?.cachedStats?.namedStats &&
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
                              <div className="flex items-baseline space-x-1 text-lg">
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
                          ))}
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

export const SegmentationSegments = ({ children = null }: { children?: React.ReactNode }) => {
  const {
    activeSegmentationId,
    disableEditing,
    onSegmentColorClick,
    onToggleSegmentVisibility,
    onToggleSegmentLock,
    onSegmentClick,
    onSegmentEdit,
    onSegmentDelete,
    data,
  } = useSegmentationTableContext('SegmentationSegments');

  data.map((entry, entryIndex) => {
    console.log(`\nENTRYYYYYYYY DATA ${entryIndex}:`);
    for (const [key, segment] of Object.entries(entry.segmentation.segments)) {
      const namedStats = segment?.cachedStats?.namedStats;
      console.log(`  Segment ${key} namedStats:`, namedStats || 'No namedStats for this segment.');
    }
  });

  let segmentation;
  let representation;

  try {
    const segmentationInfo = useSegmentationExpanded('SegmentationSegments');
    segmentation = segmentationInfo.segmentation;
    representation = segmentationInfo.representation;
  } catch (e) {
    const segmentationInfo = data.find(
      entry => entry.segmentation.segmentationId === activeSegmentationId
    );
    segmentation = segmentationInfo?.segmentation;
    representation = segmentationInfo?.representation;
  }

  const segments = Object.values(representation.segments);
  const isActiveSegmentation = segmentation.segmentationId === activeSegmentationId;
  console.log('segments: ', segments);

  const { ref: scrollableContainerRef, maxHeight } = useDynamicMaxHeight(segments);

  if (!representation || !segmentation) {
    return null;
  }

  return (
    <div>
      <ScrollArea
        className={`bg-bkg-low space-y-px`}
        showArrows={true}
      >
        <div
          ref={scrollableContainerRef}
          style={{ maxHeight: maxHeight }}
        >
          {segments.map(segment => {
            if (!segment) {
              return null;
            }
            const { segmentIndex, color, visible } = segment as {
              segmentIndex: number;
              color: number[];
              visible: boolean;
            };
            const segmentFromSegmentation = segmentation.segments[segmentIndex];

            if (!segmentFromSegmentation) {
              return null;
            }

            const { locked, active, label, displayText } = segmentFromSegmentation;
            const cssColor = `rgb(${color[0]},${color[1]},${color[2]})`;

            const hasStats = segmentFromSegmentation.cachedStats?.namedStats;
            const DataRowComponent = (
              <DataRow
                key={segmentIndex}
                number={segmentIndex}
                title={label}
                description={displayText}
                colorHex={cssColor}
                isSelected={active}
                isVisible={visible}
                isLocked={locked}
                disableEditing={disableEditing}
                className={!isActiveSegmentation ? 'opacity-80' : ''}
                onColor={() => onSegmentColorClick(segmentation.segmentationId, segmentIndex)}
                onToggleVisibility={() =>
                  onToggleSegmentVisibility(
                    segmentation.segmentationId,
                    segmentIndex,
                    representation.type
                  )
                }
                onToggleLocked={() =>
                  onToggleSegmentLock(segmentation.segmentationId, segmentIndex)
                }
                onSelect={() => onSegmentClick(segmentation.segmentationId, segmentIndex)}
                onRename={() => onSegmentEdit(segmentation.segmentationId, segmentIndex)}
                onDelete={() => onSegmentDelete(segmentation.segmentationId, segmentIndex)}
              />
            );

            return hasStats ? (
              <PopupCard
                key={`hover-${segmentIndex}`}
                modal={false}
              >
                <PopupCardTrigger asChild>
                  <div>{DataRowComponent}</div>
                </PopupCardTrigger>
                <PopupCardContent
                  side="left"
                  align="start"
                  className="w-72 border"
                >
                  <div className="mb-4 flex items-center space-x-2">
                    <div
                      className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: cssColor }}
                    ></div>
                    <h3 className="text-muted-foreground break-words font-semibold">{label}</h3>
                  </div>
                  <SegmentStatistics
                    segment={{
                      ...segmentFromSegmentation,
                      segmentIndex,
                    }}
                    segmentationId={segmentation.segmentationId}
                  >
                    {children}
                  </SegmentStatistics>
                </PopupCardContent>
              </PopupCard>
            ) : (
              DataRowComponent
            );
          })}
        </div>
      </ScrollArea>
      <CompareSegs data={data} />
    </div>
  );
};

SegmentationSegments.displayName = 'SegmentationTable.Segments';
