"use client";

import { Vector3 } from "three";
import { useMediaQuery } from "usehooks-ts";
import { ThreeDimensionsCanvas } from "../3d/3d-canvas";
import { Curve } from "../3d/curve";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "../ui/resizable";

/**
 * A Player is a component that can take as input, play and synchronize various media, such as:
 * - A 3D scene
 * - Audio
 * - Text
 */
export const Player = () => {
	const isMobile = useMediaQuery("(max-width: 767px)");

	if (isMobile) {
		return (
			<ResizablePanelGroup direction="vertical">
				<ResizablePanel defaultSize={75}>
					<ThreeDimensionsCanvas isRotating={false} isRunning={true}>
						<Curve points={[new Vector3(-1, 0, 0), new Vector3(1, 0, 0)]} />
					</ThreeDimensionsCanvas>
				</ResizablePanel>

				<ResizableHandle />

				<ResizablePanel
					defaultSize={25}
					minSize={15}
					maxSize={75}
					className="pt-6"
				>
					Foo
				</ResizablePanel>
			</ResizablePanelGroup>
		);
	}

	return (
		<ResizablePanelGroup direction="horizontal">
			<ResizablePanel defaultSize={75}>
				<ThreeDimensionsCanvas isRotating={false} isRunning={true}>
					<Curve points={[new Vector3(-1, 0, 0), new Vector3(1, 0, 0)]} />
				</ThreeDimensionsCanvas>
			</ResizablePanel>

			<ResizableHandle />

			<ResizablePanel
				defaultSize={25}
				minSize={15}
				maxSize={75}
				className="pl-6"
			>
				Foo
			</ResizablePanel>
		</ResizablePanelGroup>
	);
};
