import { Line } from "@react-three/drei";
import type { Vector3 } from "three";
import { colors } from "@/lib/colors";
import { getProjectionOnCurve } from "@/utils/3d/project-on-curve";
import type { AxisMetadata } from "./axis";

type SpikeLineProps = {
	point: Vector3;
	axis: Pick<AxisMetadata, "from" | "to">;
};

/**
 * A Spike Line is a line orthogonal to an axis, generally used when hovering on a point.
 *
 * You can look at the definition on [Plotly's website](https://plotly.com/python/v3/3d-hover/)
 * or on [this permalink](https://github.com/plotly/graphing-library-docs/blob/master/_posts/python-v3/3d/3d-hover/2015-06-30-3d-hover-options.html#L46) in case their website changes.
 */
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
