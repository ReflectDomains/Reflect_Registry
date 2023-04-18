import { lazy } from 'react';

import Layout from '../components/Layout';
// const Layout = lazy(() => import("../components/Layout"));
const Home = lazy(() => import('../pages/Home'));
const OthersPages = lazy(() => import('../pages/OthersPages'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));
const Profile = lazy(() => import('../pages/Profile'));
const Setting = lazy(() => import('../pages/Setting'));
const Register = lazy(() => import('../pages/Register'));

const routes = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
				needConnected: false,
			},
			{
				path: 'profile',
				element: <Profile />,
				needConnected: true,
			},
			{
				path: 'setting',
				element: <Setting />,
				needConnected: true,
			},
			{
				path: 'register/:name',
				element: <Register />,
				needConnected: true,
			},
			{
				path: 'other',
				element: <OthersPages />,
				needConnected: false,
			},
			// { path: "error", element: <ErrorPage /> },
			{ path: '*', element: <ErrorPage /> },
		],
	},
];

export default routes;
