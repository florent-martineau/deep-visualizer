import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

type WithPauseProps = {
	isRunning: boolean;
	children: React.ReactNode;
};

export const WithPause = (props: WithPauseProps) => {
	const three = useThree();

	useEffect(() => {
		if (props.isRunning) {
			if (!three.clock.running) {
				three.clock.start();
			}
		} else {
			if (three.clock.running) {
				three.clock.stop();
			}
		}
	}, [props.isRunning, three.clock.start, three.clock.stop, three.clock]);

	return props.children;
};
