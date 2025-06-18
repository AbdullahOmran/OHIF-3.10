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
  fusionCompareAXIAL,
  fusionCompareSAGITTAL,
  fusionCompareCORONAL,
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
          x: 1 / 3,
          y: 0,
          width: 1 / 3,
          height: 1 / 2,
        },
        {
          x: 2 / 3,
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
          y: 1 / 2,
          width: 1 / 3,
          height: 1 / 2,
        },
        {
          x: 2 / 3,
          y: 1 / 2,
          width: 1 / 3,
          height: 1 / 2,
        },
      ],
    },
    //   layoutOptions: [
    //     {
    //       x: 0,
    //       y: 0,
    //       width: 1 / 3,
    //       height: 1 / 2,
    //     },
    //     {
    //       x: 0,
    //       y: 1 / 2,
    //       width: 1 / 3,
    //       height: 1 / 2,
    //     },
    //     {
    //       x: 1 / 3,
    //       y: 0,
    //       width: 1 / 3,
    //       height: 1 / 2,
    //     },
    //     {
    //       x: 1 / 3,
    //       y: 1 / 2,
    //       width: 1 / 3,
    //       height: 1 / 2,
    //     },
    //     {
    //       x: 2 / 3,
    //       y: 0,
    //       width: 1 / 3,
    //       height: 1 / 2,
    //     },
    //     {
    //       x: 2 / 3,
    //       y: 1 / 2,
    //       width: 1 / 3,
    //       height: 1 / 2,
    //     },
    //   ],
    // },
  },
  viewports: [
    fusionAXIAL,
    fusionSAGITTAL,
    fusionCORONAL,
    fusionCompareAXIAL,
    fusionCompareSAGITTAL,
    fusionCompareCORONAL,
  ],
  createdDate: '2021-02-23T18:32:42.850Z',
};

export const comparison = {
  id: '@ohif/extension-tmtv.hps.comparison',
  locked: true,
  name: 'Compare',
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
    {
      id: 'Two Studies',
      weight: 1000,
      // This will generate 1.3.6.1.4.1.25403.345050719074.3824.20170125095722.1
      // since that is study instance UID in the prior from instance.
      attribute: 'StudyInstanceUID',
      // The 'from' attribute says where to get the 'attribute' value from.  In this case
      // prior means the second study in the study list.
      from: 'prior',
      required: true,
      constraint: {
        notNull: true,
      },
    },
    {
      // The priorInstance is a study counter that indicates what position this study is in
      // and the value comes from the options parameter.
      attribute: 'studyInstanceUIDsIndex',
      from: 'options',
      required: true,
      constraint: {
        equals: { value: 1 },
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
  numberOfPriorsReferenced: 1,
};
