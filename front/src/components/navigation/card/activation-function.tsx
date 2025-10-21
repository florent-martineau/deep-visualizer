import {
	type ActivationFunctionMetadata,
	useGetActivationFunction,
} from "@/api";
import { ActivationFunctionChart } from "@/components/neural-network/activation-function-chart";
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
				<ActivationFunctionChart activations={data.data.activations} />
			</NavigationCard>
		);
	}

	return <Skeleton className="w-full h-full" />;
};
