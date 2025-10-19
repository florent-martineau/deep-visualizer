import Plot from "react-plotly.js";
import type { Vector3 } from "three";

type ThreeDimensionsChartProps = {
	points: Vector3[];
};

export const Scene3dChart = (props: ThreeDimensionsChartProps) => {
	return (
		<Plot
			data={[
				{
					x: props.points.map((point) => point.x),
					y: props.points.map((point) => point.y),
				},
			]}
			layout={{}}
		/>
	);
};
