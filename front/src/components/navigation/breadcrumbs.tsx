import type { FileRoutesByPath } from "@tanstack/react-router";

export type BreadcrumbMetadata = {
	name: string;
	navigation?: {
		to: keyof FileRoutesByPath;
	};
};
