import { useEffect } from 'react';
import { useShepherd } from 'react-shepherd';
import { StepOptions, TourOptions } from 'shepherd.js';
import { useLocation } from 'react-router';
import 'shepherd.js/dist/css/shepherd.css';
import './Onboarding.css';

import { hasTourBeenShown, markTourAsShown, defaultShowHandler, middleware } from './utilities';

// Define the props interface
interface OnboardingProps {
  tours?: Array<{
    id: string;
    route: string;
    tourOptions: TourOptions;
    steps: StepOptions[];
  }>;
  // Add other props here if needed, e.g.:
  // someOtherProp?: string;
}

const Onboarding: React.FC<OnboardingProps> = ({
  tours,
}: {
  tours?: Array<{
    id: string;
    route: string;
    tourOptions: TourOptions;
    steps: StepOptions[];
  }>;
}) => {
  console.log('Onboarding component rendered with tours:', tours);
  const Shepherd = useShepherd();
  const location = useLocation();

  useEffect(() => {
    console.log('tours.length ', tours.length);
    console.log('location.pathname ', location.pathname);

    if (!tours.length) {
      return;
    }

    const matchingTour = tours.find(
      tour => location.pathname.startsWith(tour.route) || location.pathname.includes(tour.route)
    );
    console.log('matchingTour', matchingTour);

    // if (!matchingTour || hasTourBeenShown(matchingTour.id)) {
    //   return;
    // }
    if (!matchingTour) {
      return;
    }

    const tourInstance = new Shepherd.Tour({
      ...matchingTour.tourOptions,
      defaultStepOptions: {
        ...matchingTour.tourOptions?.defaultStepOptions,
        floatingUIOptions: matchingTour.tourOptions?.defaultStepOptions?.floatingUIOptions || {
          middleware,
        },
        when: {
          ...matchingTour.tourOptions?.defaultStepOptions?.when,
          show:
            matchingTour.tourOptions?.defaultStepOptions?.when?.show ||
            (() => defaultShowHandler(Shepherd)),
        },
      },
    });
    matchingTour.steps.forEach(step => tourInstance.addStep(step));
    tourInstance.start();
    markTourAsShown(matchingTour.id);
  }, [Shepherd, tours, location.pathname]);

  return null;
};

export { Onboarding };
