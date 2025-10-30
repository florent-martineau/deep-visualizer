import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { useListActivationFunctions } from "@/api";
import { ActivationFunctionNavigationCard } from "@/components/navigation/card/activation-function";
import { Button } from "@/components/ui/button";
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

			<Link to={"/learn"}>
				<Button>
					Learn <GraduationCap />
				</Button>
			</Link>

			<div className="flex gap-8 items-center w-fit">
				<div className="w-48 h-px bg-border" />
				<span>OR</span>
				<div className="w-48 h-px bg-border" />
			</div>

			<Muted>Become an expert on a specific activation function</Muted>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 w-fit border-l-[0.5px] border-t-[0.5px]">
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
