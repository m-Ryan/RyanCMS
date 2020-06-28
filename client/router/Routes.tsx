import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '@/client/assets/style/responsive.css';
import '@/client/assets/style/reset.scss';
import '@/client/assets/style/public.scss';

import { AuthLayout } from '../layouts/Auth';
import { BlogLayout } from '../layouts/Blog';
import { FrameLayout } from '../layouts';
import { AdminLayout } from '../layouts/Admin';
import { useConfig } from '../selector/useConfig';
import { getBlogRoutes } from './blog';
import { getAuthRoutes } from './auth';
import { getAdminRoutes } from './admin';

export const getRoutesMap = (hasDomain: boolean = false) => {
	const blogPrefix = hasDomain ? '/' : '/u/:user/';
	return {
		blog: getBlogRoutes({ blogPrefix }),
		auth: getAuthRoutes(),
		admin: getAdminRoutes(),
	};
};

export function Routes() {
	const { configState } = useConfig();
	const routesMap = getRoutesMap(!!configState.acceptHost);
	return (
		<FrameLayout>
			<Switch>
				{
					routesMap.blog.map(route => (
						<Route key={route.path} {...route} component={undefined}>
							<BlogLayout><route.component /></BlogLayout>
						</Route>

					))
				}
				{
					routesMap.admin.map(route => (
						<Route key={route.path} {...route} component={undefined}>
							<AdminLayout><route.component /></AdminLayout>
						</Route>

					))
				}
				{
					routesMap.auth.map(route => (
						<Route key={route.path} {...route} component={undefined}>
							<AuthLayout><route.component /></AuthLayout>
						</Route>
					))
				}

			</Switch>
		</FrameLayout>
	);
}

