import { useState } from "react";
import type { Vector3 } from "three";
import { Curve } from "../curve";
import { GlowingBall } from "../glowing-ball";
import { Axis, type AxisMetadata } from "./axis";

type ThreeDimensionsChartProps = {
	points: Vector3[];
	axes: {
		x: AxisMetadata;
		y: AxisMetadata;
		z?: AxisMetadata;
	};
};

export const ThreeDimensionsChart = (props: ThreeDimensionsChartProps) => {
	const [hoveredPosition, setHoveredPosition] = useState<Vector3 | null>(null);

	return (
		<group>
			<Curve
				points={props.points}
				onHover={(position) => setHoveredPosition(position)}
				onHoverEnd={() => setHoveredPosition(null)}
			/>

			{hoveredPosition && (
				<GlowingBall
					position={hoveredPosition}
					radius={0.02}
					glowIntensity={15}
				/>
			)}

			{Object.values(props.axes).map((axisMetadata) => (
				<Axis key={axisMetadata.label} {...axisMetadata} />
			))}
		</group>
	);
};
