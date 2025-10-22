import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useListActivationFunctions } from "@/api";
import { ActivationFunctionNavigationCard } from "@/components/navigation/card/activation-function";
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

	const activationFunctionsSortedByDisplayName =
		data?.data.activation_functions.sort((a, b) =>
			a.display_name.localeCompare(b.display_name),
		);

	return (
		<div className="flex flex-col gap-8 py-32 items-center">
			<div className="flex flex-col items-center">
				<H1>{loaderData.title}</H1>
				<Muted>{loaderData.description}</Muted>
			</div>

			<div className="grid grid-cols-4 gap-0 w-fit border-l-[0.5px] border-t-[0.5px]">
				{activationFunctionsSortedByDisplayName?.map((activationFunction) => (
					<ActivationFunctionNavigationCard
						activationFunctionMetadata={activationFunction}
						key={activationFunction.id}
						className="border-r-[0.5px] border-b-[0.5px] border-l-0 border-t-0"
					/>
				))}
			</div>
		</div>
	);
}
