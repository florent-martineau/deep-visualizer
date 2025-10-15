import { Bloom, EffectComposer } from "@react-three/postprocessing";
import type { RefObject } from "react";
import type { Mesh } from "three";

type GlowingBallRef = {
	ref: RefObject<Mesh | null>;
	radius: number;
};

export const GlowingBall = (props: GlowingBallRef) => {
	const pulseColor = "#00ffff";

	return (
		<>
			<mesh ref={props.ref}>
				<sphereGeometry args={[props.radius, 16, 16]} />
				<meshStandardMaterial
					color={pulseColor}
					emissive={pulseColor}
					emissiveIntensity={2}
					toneMapped={false}
				/>
			</mesh>

			<EffectComposer>
				<Bloom
					intensity={5}
					luminanceThreshold={0.9}
					luminanceSmoothing={0.9}
					radius={0.9}
				/>
			</EffectComposer>
		</>
	);
};
