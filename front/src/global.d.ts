import "@tanstack/react-router";

declare module "@tanstack/react-router" {
	interface StaticDataRouteOption {
		showBreadcrumb?: boolean;
		title: string;
		description: string;
	}
}
