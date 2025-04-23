import { ToolbarService } from '@ohif/core';
import { toolGroupIds } from './initToolGroups';

const setToolActiveToolbar = {
  commandName: 'setToolActiveToolbar',
  commandOptions: {
    toolGroupIds: [toolGroupIds.CT, toolGroupIds.PT, toolGroupIds.Fusion],
  },
};

const toolbarButtons = [
  {
    id: 'Capture',
    uiType: 'ohif.radioGroup',
    props: {
      icon: 'tool-capture',
      label: 'Capture',
      commands: 'showDownloadViewportModal',
      evaluate: 'evaluate.action',
    },
  },
  {
    id: 'Layout',
    uiType: 'ohif.layoutSelector',
    props: {
      rows: 3,
      columns: 4,
      evaluate: 'evaluate.action',
      commands: 'setViewportGridLayout',
    },
  },
  {
    id: '3dView',
    uiType: 'ohif.radioGroup',
    props: {
      icon: 'tool-3d-rotate',
      label: '3d view',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'MeasurementTools',
    uiType: 'ohif.toolButtonList',
    props: {
      buttonSection: 'measurementSection',
      groupId: 'MeasurementTools',
    },
  },
  {
    id: 'MoreTools',
    uiType: 'ohif.toolButtonList',
    props: {
      buttonSection: 'moreToolsSection',
      groupId: 'MoreTools',
    },
  },
  {
    id: 'SegmentationTools',
    uiType: 'ohif.toolBoxButton',
    props: {
      groupId: 'SegmentationTools',
      buttonSection: 'segmentationToolboxToolsSection',
    },
  },
  {
    id: 'BrushTools',
    uiType: 'ohif.toolBoxButtonGroup',
    props: {
      buttonSection: 'brushToolsSection',
      groupId: 'BrushTools',
    },
  },
  {
    id: 'Length',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-length',
      label: 'Length',
      tooltip: 'Length Tool',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'Bidirectional',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-bidirectional',
      label: 'Bidirectional',
      tooltip: 'Bidirectional Tool',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'ArrowAnnotate',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-annotate',
      label: 'Arrow Annotate',
      tooltip: 'Arrow Annotate Tool',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'EllipticalROI',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-ellipse',
      label: 'Ellipse',
      tooltip: 'Ellipse Tool',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'CircleROI',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-circle',
      label: 'Circle',
      tooltip: 'Circle Tool',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'RectangleROI',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-rectangle',
      label: 'Rectangle',
      tooltip: 'Rectangle',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'SplineROI',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'icon-tool-spline-roi',
      label: 'Spline ROI',
      tooltip: 'Spline ROI',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'LivewireContour',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'icon-tool-livewire',
      label: 'Livewire tool',
      tooltip: 'Livewire tool',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'Angle',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-angle',
      label: 'Angle',
      tooltip: 'Angle',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'PlanarFreehandROI',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'icon-tool-freehand-roi',
      label: 'Freehand ROI',
      tooltip: 'Freehand ROI',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },

  {
    id: 'Zoom',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-zoom',
      label: 'Zoom',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'WindowLevel',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-window-level',
      label: 'Window Level',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'Crosshairs',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-crosshair',
      label: 'Crosshairs',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'Pan',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-move',
      label: 'Pan',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'RectangleROIStartEndThreshold',
    uiType: 'ohif.toolBoxButton',
    props: {
      icon: 'tool-create-threshold',
      label: 'Rectangle ROI Threshold',
      commands: setToolActiveToolbar,
      evaluate: [
        'evaluate.cornerstone.segmentation',
        {
          name: 'evaluate.cornerstoneTool',
          disabledText: 'Select the PT Axial to enable this tool',
        },
      ],
      options: 'tmtv.RectangleROIThresholdOptions',
    },
  },
  {
    id: 'Brush',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'icon-tool-brush',
      label: 'Brush',
      evaluate: {
        name: 'evaluate.cornerstone.segmentation',
        toolNames: ['CircularBrush', 'SphereBrush'],
        disabledText: 'Create new segmentation to enable this tool.',
      },
      options: [
        {
          name: 'Radius (mm)',
          id: 'brush-radius',
          type: 'range',
          min: 0.5,
          max: 99.5,
          step: 0.5,
          value: 25,
          commands: {
            commandName: 'setBrushSize',
            commandOptions: { toolNames: ['CircularBrush', 'SphereBrush'] },
          },
        },
        {
          name: 'Shape',
          type: 'radio',
          id: 'brush-mode',
          value: 'CircularBrush',
          values: [
            { value: 'CircularBrush', label: 'Circle' },
            { value: 'SphereBrush', label: 'Sphere' },
          ],
          commands: 'setToolActiveToolbar',
        },
      ],
    },
  },
  {
    id: 'Eraser',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'icon-tool-eraser',
      label: 'Eraser',
      evaluate: {
        name: 'evaluate.cornerstone.segmentation',
        toolNames: ['CircularEraser', 'SphereEraser'],
      },
      options: [
        {
          name: 'Radius (mm)',
          id: 'eraser-radius',
          type: 'range',
          min: 0.5,
          max: 99.5,
          step: 0.5,
          value: 25,
          commands: {
            commandName: 'setBrushSize',
            commandOptions: { toolNames: ['CircularEraser', 'SphereEraser'] },
          },
        },
        {
          name: 'Shape',
          type: 'radio',
          id: 'eraser-mode',
          value: 'CircularEraser',
          values: [
            { value: 'CircularEraser', label: 'Circle' },
            { value: 'SphereEraser', label: 'Sphere' },
          ],
          commands: 'setToolActiveToolbar',
        },
      ],
    },
  },
  {
    id: 'Threshold',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'icon-tool-threshold',
      label: 'Threshold Tool',
      evaluate: {
        name: 'evaluate.cornerstone.segmentation',
        toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush'],
      },
      options: [
        {
          name: 'Radius (mm)',
          id: 'threshold-radius',
          type: 'range',
          min: 0.5,
          max: 99.5,
          step: 0.5,
          value: 25,
          commands: {
            commandName: 'setBrushSize',
            commandOptions: {
              toolNames: [
                'ThresholdCircularBrush',
                'ThresholdSphereBrush',
                'ThresholdCircularBrushDynamic',
              ],
            },
          },
        },
        {
          name: 'Threshold',
          type: 'radio',
          id: 'dynamic-mode',
          value: 'ThresholdRange',
          values: [
            { value: 'ThresholdDynamic', label: 'Dynamic' },
            { value: 'ThresholdRange', label: 'Range' },
          ],
          commands: ({ value, commandsManager }) => {
            if (value === 'ThresholdDynamic') {
              commandsManager.run('setToolActive', {
                toolName: 'ThresholdCircularBrushDynamic',
              });
            } else {
              commandsManager.run('setToolActive', {
                toolName: 'ThresholdCircularBrush',
              });
            }
          },
        },
        {
          name: 'Shape',
          type: 'radio',
          id: 'eraser-mode',
          value: 'ThresholdCircularBrush',
          values: [
            { value: 'ThresholdCircularBrush', label: 'Circle' },
            { value: 'ThresholdSphereBrush', label: 'Sphere' },
          ],
          condition: ({ options }) =>
            options.find(option => option.id === 'dynamic-mode').value === 'ThresholdRange',
          commands: 'setToolActiveToolbar',
        },
        {
          name: 'ThresholdRange',
          type: 'double-range',
          id: 'threshold-range',
          min: 0,
          max: 50,
          step: 0.5,
          value: [2.5, 50],
          condition: ({ options }) =>
            options.find(option => option.id === 'dynamic-mode').value === 'ThresholdRange',
          commands: {
            commandName: 'setThresholdRange',
            commandOptions: {
              toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush'],
            },
          },
        },
      ],
    },
  },
  {
    id: 'Reset',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-reset',
      tooltip: 'Reset View',
      label: 'Reset',
      commands: 'resetViewport',
      evaluate: 'evaluate.action',
    },
  },

  // More Tools
  {
    id: 'Reset',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-reset',
      label: 'Reset View',
      tooltip: 'Reset View',
      commands: 'resetViewport',
      evaluate: 'evaluate.action',
    },
  },
  {
    id: 'rotate-right',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-rotate-right',
      label: 'Rotate Right',
      tooltip: 'Rotate +90',
      commands: 'rotateViewportCW',
      evaluate: 'evaluate.action',
    },
  },
  {
    id: 'flipHorizontal',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-flip-horizontal',
      label: 'Flip Horizontal',
      tooltip: 'Flip Horizontally',
      commands: 'flipViewportHorizontal',
      evaluate: 'evaluate.viewportProperties.toggle',
    },
  },
  // {
  //   id: 'ImageSliceSync',
  //   uiType: 'ohif.toolButton',
  //   props: {
  //     icon: 'link',
  //     label: 'Image Slice Sync',
  //     tooltip: 'Enable position synchronization on stack viewports',
  //     commands: {
  //       commandName: 'toggleSynchronizer',
  //       commandOptions: {
  //         type: 'imageSlice',
  //       },
  //     },
  //     listeners: {
  //       [EVENTS.STACK_VIEWPORT_NEW_STACK]: {
  //         commandName: 'toggleImageSliceSync',
  //         commandOptions: { toggledState: true },
  //       },
  //     },
  //     evaluate: ['evaluate.cornerstone.synchronizer', 'evaluate.not3D'],
  //   },
  // },
  // {
  //   id: 'ReferenceLines',
  //   uiType: 'ohif.toolButton',
  //   props: {
  //     icon: 'tool-referenceLines',
  //     label: 'Reference Lines',
  //     tooltip: 'Show Reference Lines',
  //     commands: 'toggleEnabledDisabledToolbar',
  //     listeners: {
  //       [ViewportGridService.EVENTS.ACTIVE_VIEWPORT_ID_CHANGED]: ReferenceLinesListeners,
  //       [ViewportGridService.EVENTS.VIEWPORTS_READY]: ReferenceLinesListeners,
  //     },
  //     evaluate: 'evaluate.cornerstoneTool.toggle',
  //   },
  // },
  // {
  //   id: 'ImageOverlayViewer',
  //   uiType: 'ohif.toolButton',
  //   props: {
  //     icon: 'toggle-dicom-overlay',
  //     label: 'Image Overlay',
  //     tooltip: 'Toggle Image Overlay',
  //     commands: 'toggleEnabledDisabledToolbar',
  //     evaluate: 'evaluate.cornerstoneTool.toggle',
  //   },
  // },
  // {
  //   id: 'StackScroll',
  //   uiType: 'ohif.toolButton',
  //   props: {
  //     icon: 'tool-stack-scroll',
  //     label: 'Stack Scroll',
  //     tooltip: 'Stack Scroll',
  //     commands: setToolActiveToolbar,
  //     evaluate: 'evaluate.cornerstoneTool',
  //   },
  // },
  {
    id: 'invert',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-invert',
      label: 'Invert',
      tooltip: 'Invert Colors',
      commands: 'invertViewport',
      evaluate: 'evaluate.viewportProperties.toggle',
    },
  },
  {
    id: 'Probe',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-probe',
      label: 'Probe',
      tooltip: 'Probe',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'Cine',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'tool-cine',
      label: 'Cine',
      tooltip: 'Cine',
      commands: 'toggleCine',
      evaluate: 'evaluate.cine',
    },
  },
  // {
  //   id: 'Angle',
  //   uiType: 'ohif.toolButton',
  //   props: {
  //     icon: 'tool-angle',
  //     label: 'Angle',
  //     tooltip: 'Angle',
  //     commands: setToolActiveToolbar,
  //     evaluate: 'evaluate.cornerstoneTool',
  //   },
  // },
  // {
  //   id: 'Magnify',
  //   uiType: 'ohif.toolButton',
  //   props: {
  //     icon: 'tool-magnify',
  //     label: 'Zoom-in',
  //     tooltip: 'Zoom-in',
  //     commands: setToolActiveToolbar,
  //     evaluate: 'evaluate.cornerstoneTool',
  //   },
  // },
  // {
  //   id: 'CalibrationLine',
  //   uiType: 'ohif.toolButton',
  //   props: {
  //     icon: 'tool-calibration',
  //     label: 'Calibration',
  //     tooltip: 'Calibration Line',
  //     commands: setToolActiveToolbar,
  //     evaluate: 'evaluate.cornerstoneTool',
  //   },
  // },
  {
    id: 'TagBrowser',
    uiType: 'ohif.toolButton',
    props: {
      icon: 'dicom-tag-browser',
      label: 'Dicom Tag Browser',
      tooltip: 'Dicom Tag Browser',
      commands: 'openDICOMTagViewer',
    },
  },
  // {
  //   id: 'AdvancedMagnify',
  //   uiType: 'ohif.toolButton',
  //   props: {
  //     icon: 'icon-tool-loupe',
  //     label: 'Magnify Probe',
  //     tooltip: 'Magnify Probe',
  //     commands: 'toggleActiveDisabledToolbar',
  //     evaluate: 'evaluate.cornerstoneTool.toggle.ifStrictlyDisabled',
  //   },
  // },
  // {
  //   id: 'UltrasoundDirectionalTool',
  //   uiType: 'ohif.toolButton',
  //   props: {
  //     icon: 'icon-tool-ultrasound-bidirectional',
  //     label: 'Ultrasound Directional',
  //     tooltip: 'Ultrasound Directional',
  //     commands: setToolActiveToolbar,
  //     evaluate: ['evaluate.cornerstoneTool', 'evaluate.isUS'],
  //   },
  // },
];

export default toolbarButtons;
