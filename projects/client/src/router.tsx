import {
	createBrowserRouter,
	type LazyRouteFunction,
	type RouteObject,
} from "react-router-dom";

interface Route {
	path: string;
	children: Route[];
	lazy?: LazyRouteFunction<RouteObject>;
}

const routes: Route[] = [];

const pages = import.meta.glob("./pages/**/*.tsx") as Record<
	string,
	LazyRouteFunction<RouteObject>
>;

for (const [pagePath, routeImport] of Object.entries(pages)) {
	const name = pagePath.replace(/^\.\/pages\//, "").replace(/\.tsx$/, "");
	const parts = name.split("/");

	const putRoute = (parts: string[], routes: Route[]) => {
		const [part, ...restParts] = parts;
		if (!part || part === "index") {
			routes.push({
				path: "/",
				children: [],
				lazy: routeImport,
			});
			return;
		}

		let route = routes.find((r) => r.path === part);
		if (!route) {
			route = {
				path: part,
				children: [],
			};
			routes.push(route);
		}
		if (
			restParts.length === 0 ||
			(restParts.length === 1 && restParts[0] === "index")
		) {
			route.lazy = routeImport;
		} else {
			putRoute(restParts, route.children);
		}
	};

	putRoute(parts, routes);
}

if (import.meta.env.DEV) {
	console.log(routes);
}

export const router = createBrowserRouter([
	{
		lazy: () => import("./root"),
		children: routes,
	},
]);
