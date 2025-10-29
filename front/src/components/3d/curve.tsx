import { Line } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Line3, Vector3 } from "three";
import { colors } from "@/lib/colors";
import type { WithHighlight } from "@/lib/highlight/types";
import { isNonEmpty } from "@/utils/arrays/is-non-empty";

type CurveProps = {
	points: Vector3[];
	onHover?: (position: Vector3) => void;
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
					lineWidth={lineWidth * 7}
					onPointerMove={(e) =>
						props.onHover?.(
							getPositionAlongCurve({
								curvePoints: points,
								point: e.point,
							}),
						)
					}
				/>
			)}

			{/* Curve to be displayed to the user */}
			<Line points={props.points} color={color} lineWidth={lineWidth} />
		</group>
	);
});

/**
 * This function's goal is, given a curve and a point P, to find the point on the curve closest
 * to the point P
 */
const getPositionAlongCurve = (args: {
	curvePoints: [Vector3, ...Vector3[]];
	point: Vector3;
}): Vector3 => {
	const [firstPoint, ...otherPoints] = args.curvePoints;

	// There is only one point, it has to be the closest
	if (otherPoints.length === 0) {
		return firstPoint;
	}

	/**
	 * For each pair of points on the curve, we compute the distance of the point P to the segment
	 * defined by this pair of points.
	 *
	 * We return the best match.
	 */
	let closestPoint: Vector3 = firstPoint.clone();
	let lowestDistance: number = +Infinity;
	let previousPoint: Vector3 = firstPoint.clone();
	for (const point of otherPoints) {
		const line = new Line3(previousPoint, point);
		const closestPointOnLine = new Vector3(0, 0, 0);
		line.closestPointToPoint(args.point, true, closestPointOnLine);
		const distance = closestPointOnLine.distanceTo(args.point);

		if (distance < lowestDistance) {
			closestPoint = closestPointOnLine.clone();
			lowestDistance = distance;
		}

		previousPoint = point.clone();
	}

	return closestPoint;
};
