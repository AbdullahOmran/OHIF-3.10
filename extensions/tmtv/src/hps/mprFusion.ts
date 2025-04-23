import {
  ctAXIAL,
  ctCORONAL,
  ctSAGITTAL,
  fusionAXIAL,
  fusionCORONAL,
  fusionSAGITTAL,
  mipSAGITTAL,
  ptAXIAL,
  ptCORONAL,
  ptSAGITTAL,
} from '../utils/hpViewports';

const stage1 = {
  name: 'default',
  viewportStructure: {
    layoutType: 'grid',
    properties: {
      rows: 2,
      columns: 3,
      layoutOptions: [
        {
          x: 0,
          y: 0,
          width: 1 / 3,
          height: 1 / 2,
        },
        {
          x: 0,
          y: 1 / 2,
          width: 1 / 3,
          height: 1 / 2,
        },
        {
          x: 1 / 3,
          y: 0,
          width: 1 / 3,
          height: 1,
        },
        {
          x: 2 / 3,
          y: 0,
          width: 1 / 3,
          height: 1,
        },
      ],
    },
  },
  viewports: [fusionAXIAL, mipSAGITTAL, fusionCORONAL, fusionSAGITTAL],
  createdDate: '2021-02-23T18:32:42.850Z',
};

export const mprFusion = {
  id: '@ohif/extension-tmtv.hps.mprFusion',
  locked: true,
  name: 'Fusion',
  icon: 'layout-advanced-mpr',
  isPreset: true,
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2022-10-04T19:22:08.894Z',
  availableTo: {},
  editableBy: {},
  imageLoadStrategy: 'interleaveTopToBottom', // "default" , "interleaveTopToBottom",  "interleaveCenter"
  protocolMatchingRules: [
    {
      attribute: 'ModalitiesInStudy',
      constraint: {
        contains: ['CT', 'PT'],
      },
    },
    {
      attribute: 'StudyDescription',
      constraint: {
        contains: 'PETCT',
      },
    },
    {
      attribute: 'StudyDescription',
      constraint: {
        contains: 'PET/CT',
      },
    },
  ],
  displaySetSelectors: {
    ctDisplaySet: {
      seriesMatchingRules: [
        {
          attribute: 'Modality',
          constraint: {
            equals: 'CT',
          },
          required: true,
        },

        {
          attribute: 'isReconstructable',
          constraint: {
            equals: {
              value: true,
            },
          },
          required: true,
        },
        {
          attribute: 'SeriesDescription',
          constraint: {
            contains: 'CT',
          },
        },
        {
          attribute: 'SeriesDescription',
          constraint: {
            contains: 'CT WB',
          },
        },
      ],
    },
    ptDisplaySet: {
      seriesMatchingRules: [
        {
          attribute: 'Modality',
          constraint: {
            equals: 'PT',
          },
          required: true,
        },

        {
          attribute: 'isReconstructable',
          constraint: {
            equals: {
              value: true,
            },
          },
          required: true,
        },
        {
          attribute: 'SeriesDescription',
          constraint: {
            contains: 'Corrected',
          },
        },
        {
          weight: 2,
          attribute: 'SeriesDescription',
          constraint: {
            doesNotContain: {
              value: 'Uncorrected',
            },
          },
        },
      ],
    },
  },

  stages: [stage1],
  numberOfPriorsReferenced: -1,
};
