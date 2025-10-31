import { createFileRoute } from "@tanstack/react-router";
import { Vector3 } from "three";
import { ThreeDimensionsCanvas } from "@/components/3d/3d-canvas";
import { Curve } from "@/components/3d/curve";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import type { LoaderData } from "@/lib/router/types";

export const Route = createFileRoute("/learn")({
	component: RouteComponent,
	loader: async (): Promise<LoaderData> => ({
		title: "Learn",
		description: "Learn about neural networks and deep learning",
		breadcrumbs: [
			{
				name: "Learn",
				navigation: {
					to: "/learn",
				},
			},
		],
	}),
});

function RouteComponent() {
	return (
		<ResizablePanelGroup direction="horizontal" className="h-full flex gap-12">
			<ResizablePanel defaultSize={75}>
				<ThreeDimensionsCanvas isRotating={false} isRunning={true}>
					<Curve points={[new Vector3(-1, 0, 0), new Vector3(1, 0, 0)]} />
				</ThreeDimensionsCanvas>
			</ResizablePanel>

			<ResizableHandle />

			<ResizablePanel defaultSize={25}>Foo</ResizablePanel>
		</ResizablePanelGroup>
	);
}
