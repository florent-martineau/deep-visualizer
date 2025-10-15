import { QuadraticBezierLine } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
	forwardRef,
	type RefObject,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { type Group, type Mesh, QuadraticBezierCurve3, Vector3 } from "three";
import { GlowingBall } from "../3d/glowing-ball";

export interface NeuralConnectionHandle {
	activate: () => void;
}

type NeuralConnectionProps = {
	start: Vector3;
	end: Vector3;
	lineWidth: number;
	midOffset: number;
	ref: RefObject<Group>;
	onActivationEnd: () => void;
};

export const NeuralConnection = forwardRef<
	NeuralConnectionHandle,
	NeuralConnectionProps
>((props, ref) => {
	const three = useThree();
	const [frameWhenConnectionWasActivated, setFrameWhenConnectionWasActivated] =
		useState<number | null>(null);

	useImperativeHandle(ref, () => ({
		activate: () => {
			setFrameWhenConnectionWasActivated(three.clock.elapsedTime);
		},
	}));

	const pulseRef = useRef<Mesh>(null);

	const mid = new Vector3(
		(props.start.x + props.end.x) / 2,
		(props.start.y + props.end.y) / 2 + props.midOffset,
		(props.start.z + props.end.z) / 2,
	);

	const curve = new QuadraticBezierCurve3(props.start, mid, props.end);

	useFrame((state) => {
		if (frameWhenConnectionWasActivated === null) return;

		const animationDurationInSeconds = 1;
		const currentFrame = state.clock.elapsedTime;
		const secondsSinceActivation =
			currentFrame - frameWhenConnectionWasActivated;
		if (secondsSinceActivation > animationDurationInSeconds) {
			setFrameWhenConnectionWasActivated(null);
			props.onActivationEnd();
		}

		// Set position of the glowing ball along the curve
		if (pulseRef.current) {
			const position = curve.getPoint(
				Math.max(
					Math.min(secondsSinceActivation / animationDurationInSeconds, 1),
					0,
				),
			);
			pulseRef.current.position.copy(position);
		}
	});

	return (
		<group>
			<QuadraticBezierLine
				start={props.start}
				end={props.end}
				mid={mid}
				color="gray"
				opacity={0.3}
				dashed={true}
				dashScale={100}
				dashSize={80}
				gapSize={20}
				lineWidth={props.lineWidth}
			/>

			{frameWhenConnectionWasActivated && (
				<GlowingBall ref={pulseRef} radius={0.2} />
			)}
		</group>
	);
});
