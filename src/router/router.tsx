import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import App from '../App';
import DetailedCard from '../components/DetailedCard/DetailedCard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <DetailedCard />,
      },
    ],
  },
  {
    path: '*',
    // element: <NotFound />,
    errorElement: <ErrorBoundary />,
  },
]);

export default router;
