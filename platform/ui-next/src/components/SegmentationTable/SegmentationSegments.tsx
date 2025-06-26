import React, { useState } from 'react';
import { ScrollArea, DataRow } from '../../components';
import { PopupCard, PopupCardTrigger, PopupCardContent } from '../PopupCard';
import { useSegmentationTableContext, useSegmentationExpanded } from './contexts';
import { SegmentStatistics } from './SegmentStatistics';
import { useDynamicMaxHeight } from '../../hooks/useDynamicMaxHeight';
import CompareSegs from './CompareSegs';

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
    AllSegmentations,
  } = useSegmentationTableContext('SegmentationSegments');

  console.log('AllSegmentations WASAAAAl: ', AllSegmentations);
  console.log('WHOLE DATA :', data);

  AllSegmentations.forEach((segmentation, index) => {
    console.log(`${segmentation.label}:`);
    const segments = segmentation.segments;

    Object.keys(segments).forEach(segmentKey => {
      const segment = segments[segmentKey];
      if (segment.cachedStats && segment.cachedStats.namedStats) {
        console.log(`  Segment ${segmentKey} nameStats:`, segment.cachedStats.namedStats);
      }
    });
  });

  // data.map((entry, entryIndex) => {
  //   console.log(`\nENTRYYYYYYYY DATA ${entryIndex}:`);
  //   for (const [key, segment] of Object.entries(entry.segmentation.segments)) {
  //     const namedStats = segment?.cachedStats?.namedStats;
  //     console.log(`  Segment ${key} namedStats:`, namedStats || 'No namedStats for this segment.');
  //   }
  // });

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
  // console.log('segments: ', segments);

  // const allSegs = SegmentationService?.getSegmentations();
  // console.log('allSegs: ', allSegs);

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
      <CompareSegs AllSegmentations={AllSegmentations} />
    </div>
  );
};

SegmentationSegments.displayName = 'SegmentationTable.Segments';
