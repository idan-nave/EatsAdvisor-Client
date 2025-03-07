import { createBrowserRouter } from 'react-router'
import { ROUTES } from '@constants'
import { ApiDocs, Home, NotFound, UserProfile } from '@pages'
import { Login, MenuResultsTable, PrivateRoute, ScanAnimation } from '@components'
import { BaseLayout } from '@layouts'

export const router = createBrowserRouter([
  {
    path: ROUTES.BASE,
    element: <BaseLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: ROUTES.API_DOCS,
        element: (
          <PrivateRoute>
            <ApiDocs />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.PROFILE,
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.MENU_SCAN,
        element: (
          <PrivateRoute>
            <ScanAnimation />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.RESULTS,
        element: (
          <PrivateRoute>
            <MenuResultsTable />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: ROUTES.LOGIN, element: <Login /> },
  { path: ROUTES.NOT_FOUND, element: <NotFound /> },
])

export default router
