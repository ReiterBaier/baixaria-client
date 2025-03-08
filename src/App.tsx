import LayoutBase from './components/LayoutBase/LayoutBase';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';

export default function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
          <LayoutBase>
            <Home/>
          </LayoutBase>
      )
    },
    {
      path: '/dashboard',
      element: (
          <LayoutBase>
            <Dashboard/>
          </LayoutBase>
      )
    }
  ]);

  return (
      <div>
        <RouterProvider router={router} />
      </div>
  )
}
