import {
	OrbitControls,
	PerspectiveCamera,
	type PerspectiveCameraProps,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { Skeleton } from "../ui/skeleton";
import { WithGlow } from "./with-glow";
import { WithPause } from "./with-pause";
import { WithRotation } from "./with-rotation";

type ThreeDimensionsCanvasProps = {
	children: React.ReactNode;
	onLoaded?: () => void;
	isRotating: boolean;
	isRunning: boolean;
	camera?: PerspectiveCameraProps;
};

export const ThreeDimensionsCanvas = (props: ThreeDimensionsCanvasProps) => {
	const [hasLoadedCanvas, setHasLoadedCanvas] = useState(false);

	useEffect(() => {
		if (hasLoadedCanvas) {
			props.onLoaded?.();
		}
	}, [hasLoadedCanvas, props.onLoaded]);

	const cameraProps: PerspectiveCameraProps = {
		position: new Vector3(0, 0, 10),
		fov: 50,
		...props.camera,
	};

	return (
		<div className="relative h-full w-full">
			<Canvas
				onCreated={() => setHasLoadedCanvas(true)}
				className="cursor-pointer"
			>
				<PerspectiveCamera makeDefault {...cameraProps} />
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

			{!hasLoadedCanvas && (
				<Skeleton className="absolute inset-0 w-full h-full" />
			)}
		</div>
	);
};
