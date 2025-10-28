import { Center, Text3D } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useState } from "react";
import type { Vector3 } from "three";
import * as THREE from "three";
import { TomorrowRegular } from "@/fonts/Tomorrow/regular";
import { colors } from "@/lib/colors";
import type { WithHighlight } from "@/lib/highlight/types";

export type AxisMetadata = {
	label: string;
	from: Vector3;
	to: Vector3;
	labelOffset: Vector3;
	alignLeft?: true;
};

export type AxisHandle = WithHighlight<{}>;

export const Axis = forwardRef<AxisHandle, AxisMetadata>((props, ref) => {
	const [isHighlighted, setIsHighlighted] = useState(false);
	const direction = props.to.clone().sub(props.from);
	const length = props.from.length() + props.to.length();

	useImperativeHandle(ref, () => ({
		toggleHighlight: (highlighted) => setIsHighlighted(highlighted),
	}));

	const color = isHighlighted ? colors.accent : "gray";

	return (
		<group>
			<primitive
				object={
					new THREE.ArrowHelper(direction, props.from, length, color, 0.2, 0.1)
				}
			/>

			<Center
				position={props.to.add(props.labelOffset)}
				right={props.alignLeft}
			>
				<Text3D font={TomorrowRegular} size={0.1} height={0.01}>
					<meshStandardMaterial
						color={color}
						emissive={color}
						emissiveIntensity={0.9}
					/>
					{props.label}
				</Text3D>
			</Center>
		</group>
	);
});
