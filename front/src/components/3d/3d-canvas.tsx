import { Bounds, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { WithGlow } from "./with-glow";
import { WithPause } from "./with-pause";
import { WithRotation } from "./with-rotation";

type ThreeDimensionsCanvasProps = {
	children: React.ReactNode;
	onLoaded?: () => void;
	fitCamera?: boolean;
	isRotating: boolean;
	isRunning: boolean;
};

export const ThreeDimensionsCanvas = (props: ThreeDimensionsCanvasProps) => {
	const [loaded, setLoaded] = useState(false);
	const [hasLoadedCanvas, setHasLoadedCanvas] = useState(false);
	const [hasRanFirstFrame, setHasRanFirstFrame] = useState(false);

	useEffect(() => {
		setLoaded(hasLoadedCanvas && hasRanFirstFrame);
	}, [hasLoadedCanvas, hasRanFirstFrame]);

	useEffect(() => {
		if (loaded) {
			props.onLoaded?.();
		}
	}, [loaded, props.onLoaded]);

	return (
		<div className="relative h-full w-full">
			<Canvas
				onCreated={() => setHasLoadedCanvas(true)}
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
				<Bounds fit={props.fitCamera} margin={1} maxDuration={0} clip>
					<WithPause
						isRunning={props.isRunning}
						onFirstFrameRan={() => setHasRanFirstFrame(true)}
					>
						<WithGlow>
							<WithRotation
								isRotating={props.isRotating}
								timeForFullRotationInSeconds={2}
							>
								{props.children}
							</WithRotation>
						</WithGlow>
					</WithPause>
				</Bounds>

				<OrbitControls />
			</Canvas>

			{/* {!loaded && <Skeleton className="absolute inset-0 w-full h-full" />} */}
		</div>
	);
};
