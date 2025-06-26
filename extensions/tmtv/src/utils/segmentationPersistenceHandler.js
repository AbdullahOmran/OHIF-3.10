// // Capture segmentation state before protocol/layout change
// export function setupCaptureBeforeProtocolChange(servicesManager) {
//   const { viewportGridService, segmentationService } = servicesManager.services;

//   // Listen for the protocol about to change

//   // Get current viewports
//   const { viewports } = viewportGridService.getState();

//   // Store presentations in a temp map

//   const presentationsMap = new Map();

//   viewports.forEach(viewport => {
//     const presentationList = segmentationService.getPresentation(viewport.viewportId);
//     presentationList.forEach(presentation => {
//       if (!presentationsMap.has(presentation.segmentationId)) {
//         presentationsMap.set(presentation.segmentationId, presentation);
//       }
//     });
//   });

//   const segmentationIds = Array.from(presentationsMap.values());

//   // Save tempStore in the extension state
//   servicesManager.services.tmtvState.tempSegmentationStore = segmentationIds;
// }
// // Rehydrate segmentation state after layout change
// export function setupRehydrateAfterLayout(servicesManager) {
//   const { viewportGridService, segmentationService } = servicesManager.services;

//   // Listen for layout changed event
//   viewportGridService.subscribe(viewportGridService.EVENTS.LAYOUT_CHANGED, async ({ layout }) => {
//     // Retrieve saved presentations
//     const tempStore = servicesManager.services.tmtvState.tempSegmentationStore || [];
//     const { viewports } = servicesManager.services.viewportGridService.getState();
//     // Iterate new viewports and reapply
//     for (const viewport of viewports) {
//       for (const { segmentationId, type, config } of tempStore) {
//         await segmentationService.addSegmentationRepresentation(viewport.id, {
//           segmentationId,
//           type,
//           config,
//         });
//       }
//     }
//   });
// }
