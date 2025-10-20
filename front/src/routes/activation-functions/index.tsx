import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useListActivationFunctions } from "@/api";
import { NavigationCard } from "@/components/navigation/navigation-card";
import { H1, Muted } from "@/components/ui/typography";
import type { LoaderData } from "@/lib/router/types";

export const Route = createFileRoute("/activation-functions/")({
	component: RouteComponent,
	loader: async (): Promise<LoaderData> => ({
		title: "Activation Functions",
		description: "How does a neuron fire?",
		breadcrumbs: [
			{
				name: "Activation Functions",
				navigation: {
					to: "/activation-functions/",
				},
			},
		],
	}),
});

function RouteComponent() {
	const loaderData = useLoaderData({ from: "/activation-functions/" });

	const { data } = useListActivationFunctions();

	return (
		<div className="flex flex-col gap-8 py-32">
			<div className="flex flex-col items-center">
				<H1>{loaderData.title}</H1>
				<Muted>{loaderData.description}</Muted>
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
						title={activationFunction.display_name}
						description={`Learn more about ${activationFunction.display_name}`}
					>
						{JSON.stringify(activationFunction)}
					</NavigationCard>
				))}
			</div>
		</div>
	);
}
