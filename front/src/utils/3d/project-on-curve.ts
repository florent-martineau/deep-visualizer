import { Line3, Vector3 } from "three";

/**
 * This function's goal is, given a curve and a point P, to find the point on the curve closest
 * to the point P
 */
export const getProjectionOnCurve = (args: {
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
