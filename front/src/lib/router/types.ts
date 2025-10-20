import type { LinkProps } from "@tanstack/react-router";
import type { BreadcrumbMetadata } from "@/components/navigation/breadcrumbs";
import type { FileRoutesById } from "@/routeTree.gen";

// Route identifiers
export type RouteTo = Exclude<LinkProps["to"], undefined | "." | "..">;
export type RouteId = keyof FileRoutesById;

export type LoaderData = {
	title: string;
	description: string;
	breadcrumbs?: BreadcrumbMetadata[];
};
