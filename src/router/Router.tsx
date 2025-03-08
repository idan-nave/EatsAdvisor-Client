import { createBrowserRouter } from 'react-router'
import { ROUTES } from '@constants'
import { About, ApiDocs, ErrorPage, Home, NotFound, UserProfile, Preferences } from '@pages'
import {
  Login,
  MenuResultsTable,
  PrivateRoute,
  ScanAnimation,
} from '@components'
import { BaseLayout } from '@layouts'
import { AuthProvider } from '@context'

export const router = createBrowserRouter([
  {
    path: ROUTES.BASE,
    element: (
      <AuthProvider>
        <BaseLayout />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.DASHBOARD, element: <Home /> },
      { path: ROUTES.ABOUT, element: <About /> },
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
        path: ROUTES.MENU_TABLE,
        element: (
          <PrivateRoute>
            <MenuResultsTable />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.PREFERENCES,
        element: (
          <PrivateRoute>
            <Preferences />
          </PrivateRoute>
        ),
      },
      { path: ROUTES.LOGIN, element: <Login /> },
    ],
  },
  { path: ROUTES.CATCH_ALL, element: <NotFound /> },
])

export default router
