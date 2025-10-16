import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/activation-functions/")({
	component: RouteComponent,
	staticData: {
		title: "Activation Functions",
		description: "How does a neuron fire?",
	},
});

function RouteComponent() {
	return <div>Hello "/activation-functions/"!</div>;
}
