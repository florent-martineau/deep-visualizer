import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

type WithPauseProps = {
	isRunning: boolean;
	onFirstFrameRan?: () => void;
	children: React.ReactNode;
};

export const WithPause = (props: WithPauseProps) => {
	const three = useThree();
	const hasRunFirstFrame = useRef(false);

	useEffect(() => {
		// We need a first frame to run in order for the Bounds component to
		// properly set the camera
		if (!hasRunFirstFrame.current) {
			three.clock.start();
			requestAnimationFrame(() => {
				hasRunFirstFrame.current = true;
				props.onFirstFrameRan?.();

				if (!props.isRunning) {
					three.clock.stop();
				}
			});
			return;
		}

		// Sync clock with isRunning property (apart from first frame)
		if (props.isRunning) {
			if (!three.clock.running) {
				const elapsedTime = three.clock.getElapsedTime();
				three.clock.start();
				three.clock.elapsedTime = elapsedTime;
			}
		} else {
			three.clock.stop();
		}
	}, [props.isRunning, props.onFirstFrameRan, three.clock]);

	return <>{props.children}</>;
};
