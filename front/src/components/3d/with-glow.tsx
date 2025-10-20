import { Bloom, EffectComposer } from "@react-three/postprocessing";

type WithGlowProps = {
	children: React.ReactNode;
};

export const WithGlow = (props: WithGlowProps) => {
	return (
		<>
			{props.children}
			<EffectComposer>
				<Bloom
					intensity={1.5}
					luminanceThreshold={1.0}
					luminanceSmoothing={0.9}
				/>
			</EffectComposer>
		</>
	);
};
