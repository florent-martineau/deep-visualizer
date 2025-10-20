import { createFileRoute } from "@tanstack/react-router";
import { Vector3 } from "three";
import { useGetActivationFunction } from "@/api";
import { ThreeDimensionsCanvas } from "@/components/3d/3d-canvas";
import { ThreeDimensionsChart } from "@/components/3d/chart";
import type { BreadcrumbMetadata } from "@/components/navigation/breadcrumbs";

export const Route = createFileRoute(
	"/activation-functions/$activationFunctionId",
)({
	component: RouteComponent,
	loader: async (ctx): Promise<{ breadcrumbs: BreadcrumbMetadata[] }> => {
		return {
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
			] as BreadcrumbMetadata[],
		};
	},
	staticData: {
		title: "Activation Functions",
		description: "How does a neuron fire?",
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
				<ThreeDimensionsChart
					points={data.data.activations.map(
						(activation) =>
							new Vector3(activation.pre_activation, activation.activation),
					)}
					axes={{
						x: {
							label: "Pre-activation",
							from: new Vector3(-2, 0, 0),
							to: new Vector3(2, 0, 0),
							labelOffset: new Vector3(0.2, 0, 0),
							anchorX: "left",
						},
						y: {
							label: "Activation",
							from: new Vector3(0, -2, 0),
							to: new Vector3(0, 2, 0),
							labelOffset: new Vector3(0, 0.2, 0),
							anchorY: "middle",
						},
					}}
				/>
			</ThreeDimensionsCanvas>
		);
	}

	return <p>Loading...</p>;
}
