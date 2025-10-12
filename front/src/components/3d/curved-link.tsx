import { QuadraticBezierLine } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type Mesh, QuadraticBezierCurve3, Vector3 } from "three";
import { GlowingBall } from "./glowing-ball";

type CurvedLinkProps = {
	start: Vector3;
	end: Vector3;
	lineWidth: number;
	midOffset: number;
	isPulsing: boolean;
};

export const CurvedLink = (props: CurvedLinkProps) => {
	const pulseRef = useRef<Mesh>(null);

	const mid = new Vector3(
		(props.start.x + props.end.x) / 2,
		(props.start.y + props.end.y) / 2 + props.midOffset,
		(props.start.z + props.end.z) / 2,
	);

	const curve = new QuadraticBezierCurve3(props.start, mid, props.end);

	useFrame((state) => {
		if (props.isPulsing && pulseRef.current) {
			// Set position of the glowing ball along the curve
			const t = state.clock.elapsedTime % 1;
			const position = curve.getPoint(t);
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

			<GlowingBall ref={pulseRef} />
		</group>
	);
};
