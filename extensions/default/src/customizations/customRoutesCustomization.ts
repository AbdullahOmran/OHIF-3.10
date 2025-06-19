import { HomePage } from '../Components/HomePage';
import { SignupPage } from '../Components/SignupPage';
import { LoginPage } from '../Components/LoginPage';
import { NavigatePage } from '../Components/NavigatePage';
import { NotFoundPage } from '../Components/NotFoundPage';
import notFound from 'platform/cli/src/commands/constants/notFound';

export default {
  'routes.customRoutes': {
    routes: [
      {
        path: '/',
        children: NavigatePage,
        private: false,
      },
      {
        path: '/login',
        children: LoginPage,
        private: false,
      },
      {
        path: '/signup',
        children: SignupPage,
        private: false,
      },
      {
        path: '/home',
        children: HomePage,
        private: false,
      },
    ],
    notFoundRoute: { component: NotFoundPage },
  },
};
