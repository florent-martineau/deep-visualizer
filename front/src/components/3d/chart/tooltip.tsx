import { Center, Line, Text3D } from "@react-three/drei";
import { Vector3 } from "three";
import { TomorrowRegular } from "@/fonts/Tomorrow/regular";
import { colors } from "@/lib/colors";

type TooltipProps = {
	point: Vector3;
	lines: string[];
};

/**
 * The Tooltip looks like this:
 *
 *     Line 1               }
 *     Line 2               } <- Content
 *     Line 3               }
 *   ____________________   <--- Horizontal Line
 *            |
 *            |
 *            |  <---- Vertical Line
 *            |
 *            |
 *   Point P of interest
 */
export const Tooltip = (props: TooltipProps) => {
	const offset = new Vector3(0, 0.3, 0);
	const offsettedPoint = props.point.clone().add(offset);
	const textSize = 0.1;
	const lineHeight = 1.5 * textSize;

	return (
		<group>
			{/* Vertical Line */}
			<Line
				points={[props.point, offsettedPoint]}
				color={colors.accent}
				lineWidth={0.5}
			/>

			{/* Horizontal Line */}
			<Line
				points={[
					new Vector3(
						offsettedPoint.x - 0.2,
						offsettedPoint.y,
						offsettedPoint.z,
					),
					new Vector3(
						offsettedPoint.x + 0.2,
						offsettedPoint.y,
						offsettedPoint.z,
					),
				]}
				color={colors.accent}
				lineWidth={0.5}
			/>

			{/* Content */}
			<Center
				position={offsettedPoint
					.clone()
					.add(new Vector3(0, 0.33 * lineHeight, 0))}
				top={true}
			>
				{props.lines.map((line, idx) => (
					<Text3D
						key={line}
						font={TomorrowRegular}
						size={textSize}
						height={0.01}
						position={
							new Vector3(0, (props.lines.length - idx) * lineHeight, 0)
						}
					>
						<meshStandardMaterial
							color={colors.accent}
							emissive={colors.accent}
							emissiveIntensity={2}
						/>
						{line}
					</Text3D>
				))}
			</Center>
		</group>
	);
};
