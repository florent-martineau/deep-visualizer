import { createFileRoute } from "@tanstack/react-router";
import { useGetActivationFunctionActivationFunctionActivationFunctionNameGet } from "@/api";

export const Route = createFileRoute("/activation-function")({
	component: ActivationFunction,
});

function ActivationFunction() {
	const { data } =
		useGetActivationFunctionActivationFunctionActivationFunctionNameGet(
			"gelu",
			{ min: -1, max: 1, step: 0.5 },
		);

	return <div>{JSON.stringify(data)}</div>;
}
