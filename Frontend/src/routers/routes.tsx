import ROUTERS_PATHS from 'consts/router-paths';
import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen/index';

import AuthGuard from 'components/AuthGuard';
import GuestGuard from 'components/GuestGuard';
import MainLayout from 'layouts/MainLayout';
import Permission from 'components/Permission';

interface IAuthGuardProps {
    children: React.ReactNode;
    routes: IRoutesState[];
}

interface IGuestGuardProps {
    children: React.ReactNode;
    routes: IRoutesState[];
}

export interface IRoutesState {
    exact?: boolean;
    path?: string;
    guard?: React.FC<IAuthGuardProps | IGuestGuardProps>;
    layout?: any;
    component?: any;
    routes?: IRoutesState[];
    role?: string;
}

export const renderRoutes = (routes: IRoutesState[]) => (
    <Suspense fallback={<LoadingScreen />}>
        <Routes>
            {routes.map((route, i) => {
                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Component = route.component;
                return (
                    <Route
                        key={i}
                        path={route.path}
                        element={
                            <Guard routes={routes}>
                                <Permission role={route.role}>
                                    <Layout>
                                        {route.routes ? (
                                            renderRoutes(route.routes)
                                        ) : (
                                            <Component screenName={route.role} />
                                        )}
                                    </Layout>
                                </Permission>
                            </Guard>
                        }
                    />
                );
            })}
        </Routes>
    </Suspense>
);

const routes: IRoutesState[] = [
    {
        exact: true,
        path: ROUTERS_PATHS.NOT_FOUND,
        component: lazy(() => import('pages/NotFoundView'))
    },
    {
        exact: true,
        path: ROUTERS_PATHS.AUTHORIZATION,
        component: lazy(() => import('pages/AuthorizationView'))
    },
    {
        guard: GuestGuard,
        path: ROUTERS_PATHS.LOGIN,
        component: lazy(() => import('pages/Login'))
    },
    {
        path: ROUTERS_PATHS.ALL,
        guard: AuthGuard,
        layout: MainLayout,
        routes: [
            {
                path: ROUTERS_PATHS.DASHBOARD,
                component: lazy(() => import('pages/Products')),
            },
            {
                path: ROUTERS_PATHS.PRODUCTS,
                component: lazy(() => import('pages/Products')),
            },
            {
                path: ROUTERS_PATHS.PRODUCT_DETAIL,
                component: lazy(() => import('pages/Products/components/ProductDetail')),
            },
            {
                path: '*',
                component: () => <Navigate to={ROUTERS_PATHS.NOT_FOUND} replace />
            }
        ]
    }
];

export default routes;
