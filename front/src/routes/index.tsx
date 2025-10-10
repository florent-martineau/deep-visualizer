import { createFileRoute } from "@tanstack/react-router";
import { H1, Lead } from "@/components/ui/typography";
import { DESCRIPTION, PROJECT_NAME } from "@/constants";

export const Route = createFileRoute("/")({
	staticData: {
		showHeader: false,
	},
	component: App,
});

function App() {
	return (
		<div className="flex items-center justify-center h-full flex-col">
			<div className="space-y-2">
				<H1>{PROJECT_NAME}</H1>
				<Lead>{DESCRIPTION}</Lead>
			</div>
		</div>
	);
}
