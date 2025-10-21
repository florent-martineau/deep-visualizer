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
				const elapsedTime = three.clock.getElapsedTime();
				three.clock.start();
				three.clock.elapsedTime = elapsedTime;
			}
		} else {
			three.clock.stop();
		}
	}, [props.isRunning, three.clock]);

	return <>{props.children}</>;
};
