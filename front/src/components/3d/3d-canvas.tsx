import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { WithGlow } from "./with-glow";
import { WithPause } from "./with-pause";
import { WithRotation } from "./with-rotation";

type ThreeDimensionsCanvasProps = {
	children: React.ReactNode;
	onLoaded?: () => void;
	isRotating: boolean;
	isRunning: boolean;
};

export const ThreeDimensionsCanvas = (props: ThreeDimensionsCanvasProps) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (loaded) {
			props.onLoaded?.();
		}
	}, [loaded, props.onLoaded]);

	return (
		<div className="relative h-full w-full">
			<Canvas
				camera={{ position: [0, 0, 10], fov: 50 }}
				onCreated={() => setLoaded(true)}
				className="cursor-pointer"
			>
				<ambientLight intensity={0.3} />
				<directionalLight
					position={[5, 5, 5]}
					intensity={1}
					castShadow
					shadow-mapSize-width={2048}
					shadow-mapSize-height={2048}
				/>
				<pointLight position={[-5, 5, -5]} intensity={0.5} />

				<WithPause isRunning={props.isRunning}>
					<WithGlow>
						<WithRotation
							isRotating={props.isRotating}
							timeForFullRotationInSeconds={2}
						>
							{props.children}
						</WithRotation>
					</WithGlow>
				</WithPause>
				<OrbitControls />
			</Canvas>

			{!loaded && <Skeleton className="absolute inset-0 w-full h-full" />}
		</div>
	);
};
