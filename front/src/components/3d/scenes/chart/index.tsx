import { Line } from "@react-three/drei";
import type { Vector3 } from "three";
import { Axis, type AxisMetadata } from "./axis";

type ThreeDimensionsChartProps = {
	points: Vector3[];
	axes: {
		x: AxisMetadata;
		y: AxisMetadata;
		z?: AxisMetadata;
	};
};

export const Scene3dChart = (props: ThreeDimensionsChartProps) => {
	return (
		<>
			{props.points.length > 0 && (
				<Line points={props.points} color="hotpink" lineWidth={3} />
			)}

			{Object.values(props.axes).map((axisMetadata) => (
				<Axis key={axisMetadata.label} {...axisMetadata} />
			))}
		</>
	);
};
