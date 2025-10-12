import { Bloom, EffectComposer } from "@react-three/postprocessing";
import type { RefObject } from "react";
import type { Mesh } from "three";

type GlowingBallRef = {
	ref: RefObject<Mesh | null>;
};

export const GlowingBall = (props: GlowingBallRef) => {
	const pulseColor = "#00ffff";

	return (
		<>
			<mesh ref={props.ref}>
				<sphereGeometry args={[0.2, 16, 16]} />
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
