import { classes } from '@ohif/core';
import toolbarButtons from './toolbarButtons';
import { id } from './id.js';
import * as cs from '@cornerstonejs/core';
import initToolGroups from './initToolGroups.js';
import setCrosshairsConfiguration from './utils/setCrosshairsConfiguration.js';
import setFusionActiveVolume from './utils/setFusionActiveVolume.js';
import i18n from 'i18next';
import moreTools from './moreTools';

const { MetadataProvider } = classes;

const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList',
};

const cs3d = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone',
  segPanel: '@ohif/extension-cornerstone.panelModule.panelSegmentationNoHeader',
  measurements: '@ohif/extension-cornerstone.panelModule.measurements',
};

const tmtv = {
  // hangingProtocol: '@ohif/extension-tmtv.hangingProtocolModule.ptCT',
  hangingProtocol: '@ohif/extension-tmtv.hps.mprFusion',
  petSUV: '@ohif/extension-tmtv.panelModule.petSUV',
  tmtv: '@ohif/extension-tmtv.panelModule.tmtv',

  sopClassHandler: '@ohif/extension-cornerstone-dicom-seg.sopClassHandlerModule.dicom-seg',
  viewport: '@ohif/extension-cornerstone-dicom-seg.viewportModule.dicom-seg',
};

const extensionDependencies = {
  // Can derive the versions at least process.env.from npm_package_version
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-seg': '^3.0.0',
  '@ohif/extension-tmtv': '^3.0.0',
};

const unsubscriptions = [];
function modeFactory({ modeConfiguration }) {
  return {
    // TODO: We're using this as a route segment
    // We should not be.
    id,
    routeName: 'tmtv',
    displayName: i18n.t('Theranostics'),
    /**
     * Lifecycle hooks
     */
    onModeEnter: ({ servicesManager, extensionManager, commandsManager }: withAppTypes) => {
      const {
        toolbarService,
        toolGroupService,
        customizationService,
        hangingProtocolService,
        displaySetService,
        segmentationService,
      } = servicesManager.services;

      const utilityModule = extensionManager.getModuleEntry(
        '@ohif/extension-cornerstone.utilityModule.tools'
      );

      const { toolNames, Enums } = utilityModule.exports;

      // Init Default and SR ToolGroups
      initToolGroups(toolNames, Enums, toolGroupService, commandsManager, extensionManager);

      const { unsubscribe } = toolGroupService.subscribe(
        toolGroupService.EVENTS.VIEWPORT_ADDED,
        () => {
          // For fusion toolGroup we need to add the volumeIds for the crosshairs
          // since in the fusion viewport we don't want both PT and CT to render MIP
          // when slabThickness is modified
          const { displaySetMatchDetails } = hangingProtocolService.getMatchDetails();

          setCrosshairsConfiguration(
            displaySetMatchDetails,
            toolNames,
            toolGroupService,
            displaySetService
          );

          setFusionActiveVolume(
            displaySetMatchDetails,
            toolNames,
            toolGroupService,
            displaySetService
          );
        }
      );
      // const { unsubscribe: unsubscribe2 } = hangingProtocolService.subscribe(
      //   hangingProtocolService.EVENTS.PROTOCOL_CHANGED,
      //   () => {
      //     const segs = segmentationService.getSegmentations();
      //     if (segs.length > 0) {
      //       console.log(segs[0]);
      //       const { segmentationId, representationData } = segs[0];
      //       const { Labelmap } = representationData;
      //       const { volumeId } = Labelmap;
      //       segmentationService.remove(segmentationId);
      //       const labelmapVolume = cs.cache.getVolume(volumeId);
      //       cs.cache.removeVolumeLoadObject(volumeId);
      //     }
      //   }
      // );
      unsubscriptions.push(unsubscribe);
      // unsubscriptions.push(unsubscribe2);

      toolbarService.addButtons(toolbarButtons);
      toolbarService.createButtonSection('primary', [
        '3dView',
        'MeasurementTools',
        'Zoom',
        'WindowLevel',
        'Capture',
        'Layout',
        'Crosshairs',
        'Pan',
        'MoreTools',
      ]);
      toolbarService.createButtonSection('measurementSection', [
        'Length',
        'Bidirectional',
        'ArrowAnnotate',
        'EllipticalROI',
        'CircleROI',
        'RectangleROI',
        'SplineROI',
        'LivewireContour',
        'Angle',
        'PlanarFreehandROI',
      ]);
      toolbarService.createButtonSection('moreToolsSection', [
        'Reset',
        'rotate-right',
        'flipHorizontal',
        // 'ImageSliceSync',
        // 'ReferenceLines',
        // 'ImageOverlayViewer',
        // 'StackScroll',
        'invert',
        'Probe',
        'Cine',
        // 'Angle',
        // 'CobbAngle',
        // 'Magnify',
        // 'RectangleROI',
        // 'CalibrationLine',
        'TagBrowser',
        // 'AdvancedMagnify',
        // 'UltrasoundDirectionalTool',
        // 'WindowLevelRegion',
      ]);

      toolbarService.createButtonSection('ROIThresholdToolbox', ['SegmentationTools']);
      toolbarService.createButtonSection('segmentationToolboxToolsSection', [
        'RectangleROIStartEndThreshold',
        'BrushTools',
      ]);

      toolbarService.createButtonSection('brushToolsSection', ['Brush', 'Eraser', 'Threshold']);

      customizationService.setCustomizations({
        'panelSegmentation.tableMode': {
          $set: 'expanded',
        },
        'panelSegmentation.onSegmentationAdd': {
          $set: () => {
            commandsManager.run('createNewLabelmapFromPT');
          },
        },
      });

      // For the hanging protocol we need to decide on the window level
      // based on whether the SUV is corrected or not, hence we can't hard
      // code the window level in the hanging protocol but we add a custom
      // attribute to the hanging protocol that will be used to get the
      // window level based on the metadata
      hangingProtocolService.addCustomAttribute(
        'getPTVOIRange',
        'get PT VOI based on corrected or not',
        props => {
          const ptDisplaySet = props.find(imageSet => imageSet.Modality === 'PT');

          if (!ptDisplaySet) {
            return;
          }

          const { imageId } = ptDisplaySet.images[0];
          const imageIdScalingFactor = MetadataProvider.get('scalingModule', imageId);

          const isSUVAvailable = imageIdScalingFactor && imageIdScalingFactor.suvbw;

          if (isSUVAvailable) {
            return {
              windowWidth: 5,
              windowCenter: 2.5,
            };
          }

          return;
        }
      );
    },
    onModeExit: ({ servicesManager }: withAppTypes) => {
      const {
        toolGroupService,
        syncGroupService,
        segmentationService,
        cornerstoneViewportService,
        uiDialogService,
        uiModalService,
      } = servicesManager.services;

      unsubscriptions.forEach(unsubscribe => unsubscribe());
      uiDialogService.hideAll();
      uiModalService.hide();
      toolGroupService.destroy();
      syncGroupService.destroy();
      segmentationService.destroy();
      cornerstoneViewportService.destroy();
    },
    validationTags: {
      study: [],
      series: [],
    },
    isValidMode: ({ modalities, study }) => {
      const modalities_list = modalities.split('\\');
      const invalidModalities = ['SM'];

      const isValid =
        modalities_list.includes('CT') &&
        study.mrn !== 'M1' &&
        modalities_list.includes('PT') &&
        !invalidModalities.some(modality => modalities_list.includes(modality)) &&
        // This is study is a 4D study with PT and CT and not a 3D study for the tmtv
        // mode, until we have a better way to identify 4D studies we will use the
        // StudyInstanceUID to identify the study
        // Todo: when we add the 4D mode which comes with a mechanism to identify
        // 4D studies we can use that
        study.studyInstanceUid !== '1.3.6.1.4.1.12842.1.1.14.3.20220915.105557.468.2963630849';

      // there should be both CT and PT modalities and the modality should not be SM
      return {
        valid: isValid,
        description: 'The mode requires both PT and CT series in the study',
      };
    },
    routes: [
      {
        path: 'tmtv',
        /*init: ({ servicesManager, extensionManager }) => {
          //defaultViewerRouteInit
        },*/
        layoutTemplate: () => {
          return {
            id: ohif.layout,
            props: {
              leftPanels: [ohif.thumbnailList],
              leftPanelResizable: true,
              leftPanelClosed: true,
              rightPanels: [tmtv.tmtv, tmtv.petSUV],
              rightPanelResizable: true,
              viewports: [
                {
                  namespace: cs3d.viewport,
                  displaySetsToDisplay: [ohif.sopClassHandler],
                },
                {
                  namespace: tmtv.viewport,
                  displaySetsToDisplay: [tmtv.sopClassHandler],
                },
              ],
            },
          };
        },
      },
    ],
    extensions: extensionDependencies,
    hangingProtocol: tmtv.hangingProtocol,
    sopClassHandlers: [ohif.sopClassHandler, tmtv.sopClassHandler],
    ...modeConfiguration,
  };
}

const mode = {
  id,
  modeFactory,
  extensionDependencies,
};

export default mode;
