import type { RefObject } from "react";
import type { Mesh, Vector3 } from "three";

type GlowingBallRef = {
	radius: number;
	glowIntensity: number;
	color: string;
	ref?: RefObject<Mesh | null>;
	position?: Vector3;
};

export const GlowingBall = (props: GlowingBallRef) => {
	return (
		<mesh ref={props.ref} position={props.position ?? undefined}>
			<sphereGeometry args={[props.radius, 32, 32]} />
			<meshStandardMaterial
				color={props.color}
				emissive={props.color}
				emissiveIntensity={props.glowIntensity}
			/>
		</mesh>
	);
};
