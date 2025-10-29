import { QuadraticBezierLine } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
	forwardRef,
	type RefObject,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { type Group, QuadraticBezierCurve3, Vector3 } from "three";
import { colors } from "@/lib/colors";
import type { WithHighlight } from "@/lib/highlight/types";
import { isNotNullRef } from "@/utils/refs/is-not-null-ref";
import { GlowingBall } from "../3d/glowing-ball";
import type { NeuronHandle } from "./neuron";

export type NeuralConnectionHandle = WithHighlight<{
	activate: () => void;
	start: RefObject<NeuronHandle | null>;
	end: RefObject<NeuronHandle | null>;
}>;

type NeuralConnectionProps = {
	start: RefObject<NeuronHandle | null>;
	end: RefObject<NeuronHandle | null>;
	lineWidth: number;
	midOffset: number;
	ref: RefObject<Group>;
	onActivationEnd?: () => void;
};

const ANIMATION_DURATION_IN_SECONDS = 1;

export const NeuralConnection = forwardRef<
	NeuralConnectionHandle,
	NeuralConnectionProps
>((props, ref) => {
	const [isHighlighted, setIsHighlighted] = useState(false);
	const three = useThree();
	const [frameWhenActivated, setFrameWhenActivated] = useState<number | null>(
		null,
	);
	const [pulsePosition, setPulsePosition] = useState<Vector3>();
	const handleRef = useRef<NeuralConnectionHandle>(null);

	useImperativeHandle(ref, () => {
		const handle: NeuralConnectionHandle = {
			activate: () => {
				setFrameWhenActivated(three.clock.elapsedTime);
			},
			toggleHighlight: (highlighted) => setIsHighlighted(highlighted),
			start: props.start,
			end: props.end,
		};
		handleRef.current = handle;

		return handle;
	});

	useFrame((state) => {
		if (frameWhenActivated === null) return;

		const currentFrame = state.clock.elapsedTime;
		const secondsSinceActivation = currentFrame - frameWhenActivated;
		if (secondsSinceActivation > ANIMATION_DURATION_IN_SECONDS) {
			setFrameWhenActivated(null);
			props.onActivationEnd?.();
		}

		const position = curve.getPoint(
			Math.max(
				Math.min(secondsSinceActivation / ANIMATION_DURATION_IN_SECONDS, 1),
				0,
			),
		);
		setPulsePosition(position);
	});

	useEffect(() => {
		if (!props.start.current || !props.end.current) return;
		if (!isNotNullRef(handleRef)) return;

		props.start.current.registerConnection("output", handleRef);
		props.end.current.registerConnection("input", handleRef);
	}, [props.start, props.end]);

	if (props.start.current === null) return;
	if (props.end.current === null) return;

	const mid = new Vector3(
		(props.start.current.position.x + props.end.current.position.x) / 2,
		(props.start.current.position.y + props.end.current.position.y) / 2 +
			props.midOffset,
		(props.start.current.position.z + props.end.current.position.z) / 2,
	);

	const curve = new QuadraticBezierCurve3(
		props.start.current.position,
		mid,
		props.end.current.position,
	);

	const color = isHighlighted ? colors.accent : colors.neutral;

	return (
		<group>
			<QuadraticBezierLine
				start={props.start.current.position}
				end={props.end.current.position}
				mid={mid}
				color={color}
				opacity={isHighlighted ? 1 : 0.3}
				dashed={true}
				dashScale={100}
				dashSize={80}
				gapSize={20}
				lineWidth={props.lineWidth}
			/>

			{frameWhenActivated && pulsePosition && (
				<GlowingBall position={pulsePosition} radius={0.2} glowIntensity={10} />
			)}
		</group>
	);
});
