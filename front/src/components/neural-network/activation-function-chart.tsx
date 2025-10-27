import { Vector3 } from "three";
import type { ActivationInputOutputPair } from "@/api";
import { ThreeDimensionsChart } from "../3d/chart";

type ActivationFunctionChartProps = {
	activations: ActivationInputOutputPair[];
};

export const ActivationFunctionChart = (
	props: ActivationFunctionChartProps,
) => {
	return (
		<ThreeDimensionsChart
			points={props.activations.map(
				(activation) =>
					new Vector3(activation.pre_activation, activation.activation),
			)}
			axes={{
				x: {
					label: "Pre-activation",
					from: new Vector3(-2, 0, 0),
					to: new Vector3(2, 0, 0),
					labelOffset: new Vector3(0.1, 0, 0),
					alignLeft: true,
				},
				y: {
					label: "Activation",
					from: new Vector3(0, -2, 0),
					to: new Vector3(0, 2, 0),
					labelOffset: new Vector3(0, 0.1, 0),
				},
			}}
		/>
	);
};
