import { useFrame, useThree } from "@react-three/fiber";
import {
	forwardRef,
	type RefObject,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import type { Vector3 } from "three";
import { colors } from "@/lib/colors";
import type { WithHighlight } from "@/lib/highlight/types";
import { GlowingBall } from "../3d/glowing-ball";
import type { NeuralConnectionHandle } from "./neural-connection";

export type NeuronHandle = WithHighlight<{
	activate: () => void;
	registerConnection: (
		type: "input" | "output",
		handle: RefObject<NeuralConnectionHandle>,
	) => void;
	position: Vector3;
	neuralConnections: {
		input: NeuralConnectionHandle[];
		output: NeuralConnectionHandle[];
	};
}>;

type NeuronProps = {
	position: Vector3;
	onActivationEnd?: () => void;
};

const ANIMATION_DURATION_IN_SECONDS = 0.5;

export const Neuron = forwardRef<NeuronHandle, NeuronProps>((props, ref) => {
	const [isHighlighted, setIsHighlighted] = useState(false);
	const three = useThree();
	const [frameWhenActivated, setFrameWhenActivated] = useState<number | null>(
		null,
	);
	const [glowIntensity, setGlowIntensity] = useState(0);
	const connectionsRef = useRef<{
		input: NeuralConnectionHandle[];
		output: NeuralConnectionHandle[];
	}>({
		input: [],
		output: [],
	});

	const onActivationEnd = () => {
		props.onActivationEnd?.();

		for (const neuralConnection of connectionsRef.current.output) {
			neuralConnection.activate();
		}
	};

	useImperativeHandle(ref, () => ({
		activate: () => {
			setFrameWhenActivated(three.clock.elapsedTime);
		},
		registerConnection: (type, handle) => {
			if (!connectionsRef.current[type].includes(handle.current)) {
				connectionsRef.current[type].push(handle.current);
			}
		},
		toggleHighlight: (highlighted) => setIsHighlighted(highlighted),
		position: props.position,
		neuralConnections: connectionsRef.current,
	}));

	useFrame((state) => {
		if (frameWhenActivated === null) return;

		const currentFrame = state.clock.elapsedTime;
		const secondsSinceActivation = currentFrame - frameWhenActivated;
		if (secondsSinceActivation > ANIMATION_DURATION_IN_SECONDS) {
			setGlowIntensity(0);
			setFrameWhenActivated(null);
			onActivationEnd();
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
			glowIntensity={isHighlighted ? 1 : glowIntensity}
			radius={1}
			color={
				frameWhenActivated !== null || isHighlighted ? colors.accent : "gray"
			}
		/>
	);
});
