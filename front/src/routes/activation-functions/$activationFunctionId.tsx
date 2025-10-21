import { createFileRoute } from "@tanstack/react-router";
import { Vector3 } from "three";
import { useGetActivationFunction } from "@/api";
import { ThreeDimensionsCanvas } from "@/components/3d/3d-canvas";
import { ThreeDimensionsChart } from "@/components/3d/chart";
import { ActivationFunctionChart } from "@/components/neural-network/activation-function-chart";
import { Skeleton } from "@/components/ui/skeleton";
import type { LoaderData } from "@/lib/router/types";

export const Route = createFileRoute(
	"/activation-functions/$activationFunctionId",
)({
	component: RouteComponent,
	loader: async (ctx): Promise<LoaderData> => {
		return {
			title: ctx.params.activationFunctionId,
			description: ctx.params.activationFunctionId,
			breadcrumbs: [
				{
					name: "Activation Functions",
					navigation: {
						to: "/activation-functions/",
					},
				},
				{
					name: ctx.params.activationFunctionId,
					navigation: {
						to: "/activation-functions/$activationFunctionId",
					},
				},
			],
		};
	},
});

function RouteComponent() {
	const { activationFunctionId } = Route.useParams();

	const { data } = useGetActivationFunction(activationFunctionId, {
		min: -2,
		max: 2,
		step: 0.01,
	});

	if (data) {
		return (
			<ThreeDimensionsCanvas isRotating={false} isRunning={true}>
				<ActivationFunctionChart activations={data.data.activations} />
			</ThreeDimensionsCanvas>
		);
	}

	return <Skeleton className="w-full h-full" />;
}
