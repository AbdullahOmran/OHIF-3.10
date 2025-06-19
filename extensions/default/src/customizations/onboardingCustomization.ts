function waitForElement(selector, maxAttempts = 20, interval = 25) {
  return new Promise(resolve => {
    let attempts = 0;

    const checkForElement = setInterval(() => {
      const element = document.querySelector(selector);

      if (element || attempts >= maxAttempts) {
        clearInterval(checkForElement);
        resolve();
      }

      attempts++;
    }, interval);
  });
}

export default {
  'ohif.tours': [
    {
      id: 'basicViewerTour',
      route: '/study-list',
      steps: [
        {
          id: 'scroll',
          title: 'Scrolling Through Images',
          text: 'You can scroll through the images using the mouse wheel or scrollbar.',
          attachTo: {
            element: '.viewport-element',
            on: 'top',
          },
          advanceOn: {
            selector: '.cornerstone-viewport-element',
            event: 'CORNERSTONE_TOOLS_MOUSE_WHEEL',
          },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'tryScroll',
          title: 'Try Scrolling',
          text: 'Now try scrolling through the images using your mouse wheel.',
          attachTo: {
            element: '.viewport-element',
            on: 'right',
          },
          advanceOn: {
            selector: '.cornerstone-viewport-element',
            event: 'CORNERSTONE_TOOLS_MOUSE_WHEEL',
          },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'zoom',
          title: 'Zoom Tool',
          text: 'Use the Zoom tool to zoom in and out of the images.',
          attachTo: {
            element: '[data-cy="Zoom"]',
            on: 'bottom',
          },
          advanceOn: {
            selector: '[data-cy="Zoom"]',
            event: 'click',
          },
          beforeShowPromise: () => waitForElement('[data-cy="Zoom"]'),
        },
        {
          id: 'tryZoom',
          title: 'Try Zooming',
          text: 'Now try zooming in or out on the image using the mouse wheel while holding the Zoom tool.',
          attachTo: {
            element: '.viewport-element',
            on: 'right',
          },
          advanceOn: {
            selector: '.cornerstone-viewport-element',
            event: 'CORNERSTONE_TOOLS_MOUSE_DRAG',
          },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'pan',
          title: 'Pan Tool',
          text: 'Use the Pan tool to move the image within the viewport.',
          attachTo: {
            element: '[data-cy="Pan"]',
            on: 'bottom',
          },
          advanceOn: {
            selector: '[data-cy="Pan"]',
            event: 'click',
          },
          beforeShowPromise: () => waitForElement('[data-cy="Pan"]'),
        },
        {
          id: 'tryPan',
          title: 'Try Panning',
          text: 'Now try panning the image by clicking and dragging with the Pan tool.',
          attachTo: {
            element: '.viewport-element',
            on: 'right',
          },
          advanceOn: {
            selector: '.cornerstone-viewport-element',
            event: 'CORNERSTONE_TOOLS_MOUSE_DRAG',
          },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'crosshair',
          title: 'Crosshair Tool',
          text: 'Use the Crosshair tool to synchronize views across multiple viewports.',
          attachTo: {
            element: '[data-cy="Crosshairs"]',
            on: 'bottom',
          },
          advanceOn: {
            selector: '[data-cy="Crosshairs"]',
            event: 'click',
          },
          beforeShowPromise: () => waitForElement('[data-cy="Crosshairs"]'),
        },
        {
          id: 'tryCrosshair',
          title: 'Try Crosshair',
          text: 'Now try using the Crosshair tool by clicking and dragging on the viewport.',
          attachTo: {
            element: '.viewport-element',
            on: 'right',
          },
          advanceOn: {
            selector: '.cornerstone-viewport-element',
            event: 'CORNERSTONE_TOOLS_MOUSE_DRAG',
          },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'captureScreenshot',
          title: 'Capture Screenshot',
          text: 'Use the Capture tool to take a screenshot of the current viewport.',
          attachTo: {
            element: '[data-cy="Capture"]',
            on: 'bottom',
          },
          advanceOn: {
            selector: '[data-cy="Capture"]',
            event: 'click',
          },
          beforeShowPromise: () => waitForElement('[data-cy="Capture"]'),
        },
        // {
        //   id: 'tryCapture',
        //   title: 'Try Capturing',
        //   text: 'Now try capturing a screenshot by clicking the Capture tool again.',
        //   attachTo: {
        //     element: '[data-cy="Capture"]',
        //     on: 'bottom',
        //   },
        //   advanceOn: {
        //     selector: '[data-cy="Capture"]',
        //     event: 'click',
        //   },
        //   beforeShowPromise: () => waitForElement('[data-cy="Capture"]'),
        // },
        {
          id: 'length',
          title: 'Using the Measurement Tools',
          text: 'You can measure the length of a region using the Length tool.',
          attachTo: {
            element: '[data-cy="Length"]',
            on: 'bottom',
          },
          advanceOn: {
            selector: '[data-cy="Length"]',
            event: 'click',
          },
          beforeShowPromise: () => waitForElement('[data-cy="Length"]'),
        },
        {
          id: 'tryLength',
          title: 'Try Measuring Length',
          text: 'Now try measuring a region by clicking and dragging with the Length tool.',
          attachTo: {
            element: '.viewport-element',
            on: 'right',
          },
          advanceOn: {
            selector: 'body',
            event: 'event::measurement_added',
          },
          beforeShowPromise: () => waitForElement('.viewport-element'),
        },
        {
          id: 'changeLayout',
          title: 'Changing Layout',
          text: 'You can change the layout of the viewer using the layout button.',
          attachTo: {
            element: '[data-cy="Layout"]',
            on: 'bottom',
          },
          advanceOn: {
            selector: '[data-cy="Layout"]',
            event: 'click',
          },
          beforeShowPromise: () => waitForElement('[data-cy="Layout"]'),
        },
        // {
        //   id: 'tryLayout',
        //   title: 'Try Changing Layout',
        //   text: 'Now try changing the layout by clicking the Layout button again.',
        //   attachTo: {
        //     element: '[data-cy="Layout"]',
        //     on: 'bottom',
        //   },
        //   advanceOn: {
        //     selector: '[data-cy="Layout"]',
        //     event: 'click',
        //   },
        //   beforeShowPromise: () => waitForElement('[data-cy="Layout"]'),
        // },
        {
          id: 'moreTools',
          title: 'More Tools',
          text: 'Access additional tools via the More Tools menu.',
          attachTo: {
            element: '[data-cy="Reset"]',
            on: 'bottom',
          },
          advanceOn: {
            selector: '[data-cy="Reset"]',
            event: 'click',
          },
          beforeShowPromise: () => waitForElement('[data-cy="Reset"]'),
        },
        // {
        //   id: 'tryReset',
        //   title: 'Try Resetting',
        //   text: 'Now try resetting the view by clicking the Reset button again.',
        //   attachTo: {
        //     element: '[data-cy="Reset"]',
        //     on: 'bottom',
        //   },
        //   advanceOn: {
        //     selector: '[data-cy="Reset"]',
        //     event: 'click',
        //   },
        //   beforeShowPromise: () => waitForElement('[data-cy="Reset"]'),
        // },
        {
          id: 'segmentation',
          title: 'Segmentation Tool',
          text: 'Use the Segmentation tool to create and edit segmentations on the images.',
          attachTo: {
            element: '[data-cy="Brush"]',
            on: 'bottom',
          },
          advanceOn: {
            selector: '[data-cy="Brush"]',
            event: 'click',
          },
          beforeShowPromise: () => waitForElement('[data-cy="Brush"]'),
        },
        // {
        //   id: 'trySegmentation',
        //   title: 'Try Segmentation',
        //   text: 'Now try using the Segmentation tool by painting on the viewport.',
        //   attachTo: {
        //     element: '.viewport-element',
        //     on: 'right',
        //   },
        //   advanceOn: {
        //     selector: '.cornerstone-viewport-element',
        //     event: 'CORNERSTONE_TOOLS_MOUSE_DRAG',
        //   },
        //   beforeShowPromise: () => waitForElement('.viewport-element'),
        // },
      ],
      tourOptions: {
        useModalOverlay: true,
        defaultStepOptions: {
          buttons: [
            {
              text: 'Skip all',
              action() {
                this.complete();
              },
              secondary: true,
            },
          ],
        },
      },
    },
  ],
};
