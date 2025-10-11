import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

type WithRotationProps = {
	isRotating: boolean;
	timeForFullRotationInSeconds: number;
	children: React.ReactNode;
};

export const WithRotation = (props: WithRotationProps) => {
	const groupRef = useRef<Group>(null);

	useFrame((_, delta) => {
		if (
			props.isRotating &&
			groupRef.current &&
			props.timeForFullRotationInSeconds > 0
		) {
			groupRef.current.rotation.y += delta / props.timeForFullRotationInSeconds;
		}
	});

	return <group ref={groupRef}>{props.children}</group>;
};
