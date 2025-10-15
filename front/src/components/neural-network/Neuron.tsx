import { useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useState } from "react";
import type { Vector3 } from "three";
import { GlowingBall } from "../3d/glowing-ball";

export interface NeuronHandle {
	activate: () => void;
}

type NeuronProps = {
	position: Vector3;
};

export const Neuron = forwardRef<NeuronHandle, NeuronProps>((props, ref) => {
	const three = useThree();
	const [frameWhenActivated, setFrameWhenActivated] = useState<number | null>(
		null,
	);

	useImperativeHandle(ref, () => ({
		activate: () => {
			setFrameWhenActivated(three.clock.elapsedTime);
		},
	}));

	useFrame((state) => {
		if (frameWhenActivated === null) return;

		const animationDurationInSeconds = 1;
		const currentFrame = state.clock.elapsedTime;
		const secondsSinceActivation = currentFrame - frameWhenActivated;
		if (secondsSinceActivation > animationDurationInSeconds) {
			setFrameWhenActivated(null);
		}
	});

	return (
		<GlowingBall
			position={props.position}
			glowIntensity={frameWhenActivated !== null ? 5 : 0}
			radius={1}
			color={"#525252"}
		/>
	);
});
