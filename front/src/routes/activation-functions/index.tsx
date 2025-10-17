import { createFileRoute } from "@tanstack/react-router";
import type { BreadcrumbMetadata } from "@/components/Header";

export const Route = createFileRoute("/activation-functions/")({
	component: RouteComponent,
	loader: async () => ({
		breadcrumbs: [
			{
				name: "Activation Functions",
				navigation: {
					to: "/activation-functions/",
				},
			},
		] as BreadcrumbMetadata[],
	}),

	staticData: {
		title: "Activation Functions",
		description: "How does a neuron fire?",
	},
});

function RouteComponent() {
	return <div>Hello "/activation-functions/"!</div>;
}
