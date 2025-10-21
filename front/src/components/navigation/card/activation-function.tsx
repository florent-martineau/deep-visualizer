import { Bounds } from "@react-three/drei";
import { Vector3 } from "three";
import {
	type ActivationFunctionMetadata,
	useGetActivationFunction,
} from "@/api";
import { Curve } from "@/components/3d/curve";
import { Skeleton } from "@/components/ui/skeleton";
import { NavigationCard } from ".";

type ActivationFunctionNavigationCardProps = {
	activationFunctionMetadata: ActivationFunctionMetadata;
};

export const ActivationFunctionNavigationCard = (
	props: ActivationFunctionNavigationCardProps,
) => {
	const { data } = useGetActivationFunction(
		props.activationFunctionMetadata.id,
		{
			min: -2,
			max: 2,
			step: 0.01,
		},
	);

	if (data) {
		const points = data.data.activations.map(
			(activation) =>
				new Vector3(activation.pre_activation, activation.activation, 0),
		);
		const Ys = points.map((point) => point.y);
		const centerY = (Math.max(...Ys) - Math.min(...Ys)) / 2;
		const centeredPoints = points.map(
			(point) => new Vector3(point.x, point.y - centerY, point.z),
		);

		return (
			<NavigationCard
				navigation={{
					to: "/activation-functions/$activationFunctionId",
					params: {
						activationFunctionId: props.activationFunctionMetadata.id,
					},
				}}
				title={props.activationFunctionMetadata.display_name}
				description={`Learn more about ${props.activationFunctionMetadata.display_name}`}
			>
				<Curve points={centeredPoints} />
			</NavigationCard>
		);
	}

	return <Skeleton className="w-full h-full" />;
};
