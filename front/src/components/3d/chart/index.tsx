import type { Vector3 } from "three";
import { Curve } from "../curve";
import { Axis, type AxisMetadata } from "./axis";

type ThreeDimensionsChartProps = {
	points: Vector3[];
	axes: {
		x: AxisMetadata;
		y: AxisMetadata;
		z?: AxisMetadata;
	};
};

export const ThreeDimensionsChart = (props: ThreeDimensionsChartProps) => {
	return (
		<group>
			<Curve
				points={props.points}
				onHover={(position) => console.log("Hovering", position)}
			/>

			{Object.values(props.axes).map((axisMetadata) => (
				<Axis key={axisMetadata.label} {...axisMetadata} />
			))}
		</group>
	);
};
