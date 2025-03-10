import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from 'react-router';
import { ROUTES } from '@constants';
import { About, ApiDocs, ErrorPage, Home, NotFound, UserProfile, } from '@pages';
import { Login, MenuResultsTable, PrivateRoute, ScanAnimation, } from '@components';
import { BaseLayout } from '@layouts';
import { AuthProvider, UserProfileProvider } from '@context';
export var router = createBrowserRouter([
    {
        path: ROUTES.BASE,
        element: (_jsx(UserProfileProvider, { children: _jsx(AuthProvider, { children: _jsx(BaseLayout, {}) }) })),
        errorElement: _jsx(ErrorPage, {}),
        children: [
            { index: true, element: _jsx(Home, {}) },
            { path: ROUTES.DASHBOARD, element: _jsx(Home, {}) },
            { path: ROUTES.ABOUT, element: _jsx(About, {}) },
            {
                path: ROUTES.API_DOCS,
                element: (_jsx(PrivateRoute, { children: _jsx(ApiDocs, {}) })),
            },
            {
                path: ROUTES.PROFILE,
                element: (_jsx(PrivateRoute, { children: _jsx(UserProfile, {}) })),
            },
            {
                path: ROUTES.MENU_SCAN,
                element: (_jsx(PrivateRoute, { children: _jsx(ScanAnimation, {}) })),
            },
            {
                path: ROUTES.MENU_TABLE,
                element: (_jsx(PrivateRoute, { children: _jsx(MenuResultsTable, {}) })),
            },
            { path: ROUTES.LOGIN, element: _jsx(Login, {}), errorElement: _jsx(ErrorPage, {}) },
            {
                path: ROUTES.CATCH_ALL,
                element: _jsx(NotFound, {}),
                errorElement: _jsx(ErrorPage, {}),
            },
        ],
    },
]);
export default router;
