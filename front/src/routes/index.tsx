import { createFileRoute } from "@tanstack/react-router";
import { H1 } from "@/components/ui/typography";
import { PROJECT_NAME } from "@/constants";

export const Route = createFileRoute("/")({
	staticData: {
		showHeader: false,
	},
	component: App,
});

function App() {
	return (
		<div className="flex items-center justify-center h-full">
			<H1>{PROJECT_NAME}</H1>
		</div>
	);
}
