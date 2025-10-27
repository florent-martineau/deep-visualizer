import { Text3D } from "@react-three/drei";
import type { Vector3 } from "three";
import * as THREE from "three";
import { TomorrowRegular } from "@/fonts/Tomorrow/regular";

export type AxisMetadata = {
	label: string;
	from: Vector3;
	to: Vector3;
	labelOffset: Vector3;
	anchorX?: "left";
	anchorY?: "middle";
};

export const Axis = (props: AxisMetadata) => {
	const direction = props.to.clone().sub(props.from);
	const length = props.from.length() + props.to.length();

	return (
		<>
			<primitive
				object={
					new THREE.ArrowHelper(direction, props.from, length, "gray", 0.2, 0.1)
				}
			/>

			<Text3D
				position={[
					props.to.x + props.labelOffset.x,
					props.to.y + props.labelOffset.y,
					props.to.z + props.labelOffset.z,
				]}
				font={TomorrowRegular}
				size={0.1}
				height={0.01}
			>
				<meshStandardMaterial
					color="#dddddd"
					emissive="#dddddd"
					emissiveIntensity={0.9}
				/>
				{props.label}
			</Text3D>
		</>
	);
};
