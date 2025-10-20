import { Text } from "@react-three/drei";
import type { Vector3 } from "three";
import * as THREE from "three";

export type AxisMetadata = {
	label: string;
	from: Vector3;
	to: Vector3;
	labelOffset: Vector3;
};

export const Axis = (props: AxisMetadata) => {
	const direction = props.to.clone().sub(props.from);
	const length = props.from.length() + props.to.length();

	console.log(props.from, props.to, direction, length);

	return (
		<>
			<primitive
				object={
					new THREE.ArrowHelper(direction, props.from, length, "gray", 0.2, 0.1)
				}
			/>

			<Text
				position={[
					props.to.x + props.labelOffset.x,
					props.to.y + props.labelOffset.y,
					props.to.z + props.labelOffset.z,
				]}
				fontSize={0.2}
				color="white"
			>
				<meshStandardMaterial
					color="#dddddd"
					emissive="#dddddd"
					emissiveIntensity={0.9}
				/>
				{props.label}
			</Text>
		</>
	);
};
