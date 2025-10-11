import { QuadraticBezierLine } from "@react-three/drei";
import { Vector3 } from "three";

type CurvedLinkProps = {
	start: Vector3;
	end: Vector3;
	lineWidth: number;

	// Controls the curvature of the curve
	midOffset: number;
};

export const CurvedLink = (props: CurvedLinkProps) => {
	const mid = new Vector3(
		(props.start.x + props.end.x) / 2,
		(props.start.y + props.end.y) / 2 + props.midOffset,
		(props.start.z + props.end.z) / 2,
	);

	return (
		<QuadraticBezierLine
			start={props.start}
			end={props.end}
			mid={mid}
			color="white"
			lineWidth={props.lineWidth}
		/>
	);
};
