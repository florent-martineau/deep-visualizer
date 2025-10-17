import { Line, OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { createFileRoute, useMatch } from "@tanstack/react-router";
import { useMemo } from "react";
import {
	type ActivationInputOutputPair,
	useGetActivationFunction,
} from "@/api";
import type { BreadcrumbMetadata } from "@/components/Header";

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

function ActivationVisualization({
	data,
}: {
	data: ActivationInputOutputPair[];
}) {
	const points: [number, number, number][] = useMemo(() => {
		if (!data?.values) return [];
		return data.map((point) => [point.pre_activation, point.activation, 0]);
	}, [data]);

	return (
		<>
			{/* Draw the activation function curve */}
			{points.length > 0 && (
				<Line points={points} color="hotpink" lineWidth={3} />
			)}

			{/* Add axes */}
			<Line
				points={[
					[-2, 0, 0],
					[2, 0, 0],
				]}
				color="gray"
				lineWidth={1}
			/>
			<Line
				points={[
					[0, -2, 0],
					[0, 2, 0],
				]}
				color="gray"
				lineWidth={1}
			/>

			{/* Add labels */}
			<Text position={[0, 2.2, 0]} fontSize={0.2} color="white">
				y
			</Text>
			<Text position={[2.2, 0, 0]} fontSize={0.2} color="white">
				x
			</Text>
		</>
	);
}

function RouteComponent() {
	const { activationFunctionId } = Route.useParams();

	const { data } = useGetActivationFunction(activationFunctionId, {
		min: -2,
		max: 2,
		step: 0.01,
	});

	if (data) {
		return (
			<div className="w-full h-screen">
				<Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
					<ambientLight intensity={0.5} />
					<pointLight position={[10, 10, 10]} />

					<ActivationVisualization data={data.data.activations} />

					<OrbitControls enableDamping />
				</Canvas>
			</div>
		);
	}

	return <p>Loading...</p>;
}
