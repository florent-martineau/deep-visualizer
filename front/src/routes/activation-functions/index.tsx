import { createFileRoute } from "@tanstack/react-router";
import { useListActivationFunctions } from "@/api";
import type { BreadcrumbMetadata } from "@/components/navigation/breadcrumbs";
import { NavigationCard } from "@/components/navigation/navigation-card";
import { H1, Muted } from "@/components/ui/typography";
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
	const { data } = useListActivationFunctions();

	return (
		<div className="flex flex-col gap-8 py-32">
			<div className="flex flex-col items-center">
				<H1>{route.staticData.title}</H1>
				<Muted>{route.staticData.description}</Muted>
			</div>

			<div className="grid grid-cols-4 gap-4">
				{data?.data.activation_functions.map((activationFunction) => (
					<NavigationCard
						key={activationFunction.id}
						navigation={{
							to: "/activation-functions/$activationFunctionId",
							params: {
								activationFunctionId: activationFunction.id,
							},
						}}
					>
						{JSON.stringify(activationFunction)}
					</NavigationCard>
				))}
			</div>
		</div>
	);
}
