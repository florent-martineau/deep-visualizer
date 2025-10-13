import { QuadraticBezierLine } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
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
};

export const NeuralConnection = forwardRef<
	NeuralConnectionHandle,
	NeuralConnectionProps
>((props, ref) => {
	const [activatedAt, setActivatedAt] = useState<Date | null>(null);

	useImperativeHandle(ref, () => ({
		activate: () => {
			setActivatedAt(new Date());
		},
	}));

	const pulseRef = useRef<Mesh>(null);

	const mid = new Vector3(
		(props.start.x + props.end.x) / 2,
		(props.start.y + props.end.y) / 2 + props.midOffset,
		(props.start.z + props.end.z) / 2,
	);

	const curve = new QuadraticBezierCurve3(props.start, mid, props.end);

	useFrame(() => {
		if (!activatedAt) return;

		const animationDurationInSeconds = 0.75;

		// Reset activatedAt when animation has finished
		const currentTimeInMilliseconds = Date.now();
		const activatedAtInMilliseconds = activatedAt.getTime();
		const timeSinceActivationInSeconds =
			(currentTimeInMilliseconds - activatedAtInMilliseconds) / 1_000;
		if (timeSinceActivationInSeconds > animationDurationInSeconds) {
			setActivatedAt(null);
		}

		// Set position of the glowing ball along the curve
		if (pulseRef.current) {
			const position = curve.getPoint(
				timeSinceActivationInSeconds / animationDurationInSeconds,
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

			{activatedAt && <GlowingBall ref={pulseRef} />}
		</group>
	);
});
