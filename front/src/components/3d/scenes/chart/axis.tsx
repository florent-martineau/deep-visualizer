import { Line, Text } from "@react-three/drei";
import type { Vector3 } from "three";

export type AxisMetadata = {
	label: string;
	from: Vector3;
	to: Vector3;
	labelOffset: Vector3;
};

export const Axis = (props: AxisMetadata) => {
	return (
		<>
			<Line points={[props.from, props.to]} color="gray" lineWidth={1} />
			<Text
				position={[
					props.to.x + props.labelOffset.x,
					props.to.y + props.labelOffset.y,
					props.to.z + props.labelOffset.z,
				]}
				fontSize={0.2}
				color="white"
			>
				{props.label}
			</Text>
		</>
	);
};
