import tailwindcss from "@tailwindcss/vite";
import Plotly from "plotly.js";
import Plot from "react-plotly.js";
import type { Vector3 } from "three";
import config from "vite.config";

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
					z: props.points.map((point) => point.z),
				},
			]}
			layout={{
				paper_bgcolor: "transparent",
				plot_bgcolor: "transparent",
				font: { color: "#dddddd" },
				xaxis: {
					gridcolor: "transparent",
					zerolinecolor: "#283442",
				},
				yaxis: {
					gridcolor: "transparent",
					zerolinecolor: "#283442",
				},
			}}
		/>
	);
};
