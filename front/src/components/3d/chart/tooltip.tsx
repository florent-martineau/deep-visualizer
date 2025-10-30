import { Center, Line, Text3D } from "@react-three/drei";
import { Vector3 } from "three";
import { TomorrowRegular } from "@/fonts/Tomorrow/regular";
import { colors } from "@/lib/colors";

type TooltipProps = {
	point: Vector3;
	lines: string[];
};
export const Tooltip = (props: TooltipProps) => {
	const offset = new Vector3(0, 0.3, 0);
	const offsettedPoint = props.point.clone().add(offset);

	return (
		<group>
			<Line
				points={[props.point, offsettedPoint]}
				color={colors.accent}
				lineWidth={0.5}
			/>
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

			<Center
				position={offsettedPoint.clone().add(new Vector3(0, 0.05, 0))}
				top={true}
			>
				{props.lines.map((line, idx) => (
					<Text3D
						key={line}
						font={TomorrowRegular}
						size={0.1}
						height={0.01}
						position={new Vector3(0, (props.lines.length - idx) * 0.15, 0)}
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
