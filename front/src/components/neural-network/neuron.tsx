import { useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useState } from "react";
import type { Vector3 } from "three";
import { GlowingBall } from "../3d/glowing-ball";

export interface NeuronHandle {
	activate: () => void;
	position: Vector3;
}

type NeuronProps = {
	position: Vector3;
	onActivationEnd?: () => void;
};

const ANIMATION_DURATION_IN_SECONDS = 0.5;

export const Neuron = forwardRef<NeuronHandle, NeuronProps>((props, ref) => {
	const three = useThree();
	const [frameWhenActivated, setFrameWhenActivated] = useState<number | null>(
		null,
	);
	const [glowIntensity, setGlowIntensity] = useState(0);

	useImperativeHandle(ref, () => ({
		activate: () => {
			setFrameWhenActivated(three.clock.elapsedTime);
		},
		position: props.position,
	}));

	useFrame((state) => {
		if (frameWhenActivated === null) return;

		const currentFrame = state.clock.elapsedTime;
		const secondsSinceActivation = currentFrame - frameWhenActivated;
		if (secondsSinceActivation > ANIMATION_DURATION_IN_SECONDS) {
			setGlowIntensity(0);
			setFrameWhenActivated(null);
			props.onActivationEnd?.();
		} else {
			const animationProgress =
				secondsSinceActivation / ANIMATION_DURATION_IN_SECONDS;
			setGlowIntensity(
				2 *
					(animationProgress > 0.5 ? 1 - animationProgress : animationProgress),
			);
		}
	});

	return (
		<GlowingBall
			position={props.position}
			glowIntensity={glowIntensity}
			radius={1}
			color={"#525252"}
		/>
	);
});
