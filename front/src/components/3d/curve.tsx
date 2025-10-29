import { Line } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useState } from "react";
import type { Vector3 } from "three";
import { colors } from "@/lib/colors";
import type { WithHighlight } from "@/lib/highlight/types";
import { getProjectionOnCurve } from "@/utils/3d/project-on-curve";
import { isNonEmpty } from "@/utils/arrays/is-non-empty";

type CurveProps = {
	points: Vector3[];
	onHover?: (position: Vector3) => void;
	onHoverEnd?: () => void;
};

export type CurveHandle = WithHighlight<{}>;

export const Curve = forwardRef<CurveHandle, CurveProps>((props, ref) => {
	const [isHighlighted, setIsHighlighted] = useState(false);

	useImperativeHandle(ref, () => ({
		toggleHighlight: (highlighted) => setIsHighlighted(highlighted),
	}));

	const { points } = props;
	if (!isNonEmpty(points)) return;

	const lineWidth = 3;
	const color = isHighlighted ? colors.accent : colors.neutral;
	return (
		<group>
			{/* This is purely to handle hovering. 
				If we were to hover exactly on the curve, it would hard to precisely point the cursor
				to the curve.
				We build a larger but invisible curve to ease hovering. */}
			{props.onHover && (
				<Line
					points={props.points}
					visible={false}
					lineWidth={lineWidth * 20}
					onPointerMove={(e) =>
						props.onHover?.(
							getProjectionOnCurve({
								curvePoints: points,
								point: e.point,
							}),
						)
					}
					onPointerOut={() => props.onHoverEnd?.()}
				/>
			)}

			{/* Curve to be displayed to the user */}
			<Line points={props.points} color={color} lineWidth={lineWidth} />
		</group>
	);
});
