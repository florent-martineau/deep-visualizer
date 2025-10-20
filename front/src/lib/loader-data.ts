import type { BreadcrumbMetadata } from "@/components/navigation/breadcrumbs";

export type LoaderData = {
	title: string;
	description: string;
	breadcrumbs?: BreadcrumbMetadata[];
};
