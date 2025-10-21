import { Line } from "@react-three/drei";
import type { Vector3 } from "three";

type CurveProps = {
	points: Vector3[];
};

export const Curve = (props: CurveProps) => {
	if (props.points.length === 0) return;

	return <Line points={props.points} color="hotpink" lineWidth={3} />;
};
