import { createFileRoute } from "@tanstack/react-router";
import { Player } from "@/components/player";
import type { LoaderData } from "@/lib/router/types";

export const Route = createFileRoute("/learn")({
	component: RouteComponent,
	ssr: false,
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
	return <Player />;
}
