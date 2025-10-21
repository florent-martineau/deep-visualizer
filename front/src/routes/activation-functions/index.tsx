import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useListActivationFunctions } from "@/api";
import { ThreeDimensionsCanvas } from "@/components/3d/3d-canvas";
import { NavigationCard } from "@/components/navigation/card";
import { ActivationFunctionNavigationCard } from "@/components/navigation/card/activation-function";
import { ActivationFunctionChart } from "@/components/neural-network/activation-function-chart";
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
					<ActivationFunctionNavigationCard
						activationFunctionMetadata={activationFunction}
						key={activationFunction.id}
					/>
				))}
			</div>
		</div>
	);
}
