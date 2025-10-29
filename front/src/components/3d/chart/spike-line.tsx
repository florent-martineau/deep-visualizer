import { Line } from "@react-three/drei";
import type { Vector3 } from "three";
import { colors } from "@/lib/colors";
import { getProjectionOnCurve } from "@/utils/3d/project-on-curve";
import type { AxisMetadata } from "./axis";

type SpikeLineProps = {
	point: Vector3;
	axis: Pick<AxisMetadata, "from" | "to">;
};

export const SpikeLine = (props: SpikeLineProps) => {
	const pointOnAxis = getProjectionOnCurve({
		curvePoints: [props.axis.from, props.axis.to],
		point: props.point,
	});

	return (
		<Line
			points={[pointOnAxis, props.point]}
			color={colors.accent}
			dashed={true}
			dashScale={1}
			dashSize={0.02}
			gapSize={0.02}
		/>
	);
};
