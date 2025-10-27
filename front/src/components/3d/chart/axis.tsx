import { Center, Text3D } from "@react-three/drei";
import type { Vector3 } from "three";
import * as THREE from "three";
import { TomorrowRegular } from "@/fonts/Tomorrow/regular";

export type AxisMetadata = {
	label: string;
	from: Vector3;
	to: Vector3;
	labelOffset: Vector3;
	alignLeft?: true;
};

export const Axis = (props: AxisMetadata) => {
	const direction = props.to.clone().sub(props.from);
	const length = props.from.length() + props.to.length();

	return (
		<group>
			<primitive
				object={
					new THREE.ArrowHelper(direction, props.from, length, "gray", 0.2, 0.1)
				}
			/>

			<Center
				position={props.to.add(props.labelOffset)}
				right={props.alignLeft}
			>
				<Text3D font={TomorrowRegular} size={0.1} height={0.01}>
					<meshStandardMaterial
						color="#dddddd"
						emissive="#dddddd"
						emissiveIntensity={0.9}
					/>
					{props.label}
				</Text3D>
			</Center>
		</group>
	);
};
