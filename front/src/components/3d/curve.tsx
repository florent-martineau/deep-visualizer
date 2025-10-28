import { Line } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useState } from "react";
import type { Vector3 } from "three";
import { colors } from "@/lib/colors";
import type { WithHighlight } from "@/lib/highlight/types";

type CurveProps = {
	points: Vector3[];
};

export type CurveHandle = WithHighlight<{}>;

export const Curve = forwardRef<CurveHandle, CurveProps>((props, ref) => {
	const [isHighlighed, setIsHighlighted] = useState(false);

	useImperativeHandle(ref, () => ({
		toggleHighlight: (highlighted) => setIsHighlighted(highlighted),
	}));

	if (props.points.length === 0) return;

	const color = isHighlighed ? colors.accent : "gray";
	return <Line points={props.points} color={color} lineWidth={3} />;
});
