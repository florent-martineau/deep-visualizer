import { forwardRef, useImperativeHandle, useState } from "react";
import type { Vector3 } from "three";
import { colors } from "@/lib/colors";
import type { WithHighlight } from "@/lib/highlight/types";

type GlowingBallProps = {
	radius: number;
	glowIntensity: number;
	position: Vector3;
};

export type GlowingBallHandle = WithHighlight<{}>;

export const GlowingBall = forwardRef<GlowingBallHandle, GlowingBallProps>(
	(props, ref) => {
		const [isHighlighted, setIsHighlighted] = useState(false);

		useImperativeHandle(ref, () => ({
			toggleHighlight: (highlighted) => setIsHighlighted(highlighted),
		}));

		const color =
			isHighlighted || props.glowIntensity > 0 ? colors.accent : "gray";

		return (
			<mesh position={props.position}>
				<sphereGeometry args={[props.radius, 32, 32]} />
				<meshStandardMaterial
					color={color}
					emissive={color}
					emissiveIntensity={isHighlighted ? 1 : props.glowIntensity}
				/>
			</mesh>
		);
	},
);
