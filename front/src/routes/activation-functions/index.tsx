import { createFileRoute } from "@tanstack/react-router";
import { useListActivationFunctions } from "@/api";
import type { BreadcrumbMetadata } from "@/components/Header";
import { H1, Lead, Muted, P } from "@/components/ui/typography";
import { useRoute } from "@/hooks/useRoute";

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
	const route = useRoute("/activation-functions/");
	const { data, isLoading } = useListActivationFunctions();

	return (
		<div className="flex flex-col gap-8 py-32">
			<div className="flex flex-col items-center">
				<H1>{route.staticData.title}</H1>
				<Muted>{route.staticData.description}</Muted>
			</div>
			<p>{JSON.stringify(data)}</p>
		</div>
	);
}
