import { createFileRoute } from "@tanstack/react-router";
import { H1, Lead } from "@/components/ui/typography";
import { PROJECT_DESCRIPTION, PROJECT_NAME } from "@/constants";
import type { LoaderData } from "@/lib/loader-data";
import { ActivationFunctionCard } from "./-components/ActivationFunctionCard";

export const Route = createFileRoute("/")({
	loader: async (): Promise<LoaderData> => ({
		title: PROJECT_NAME,
		description: PROJECT_DESCRIPTION,
	}),
	component: App,
});

function App() {
	return (
		<div className="flex items-center justify-center h-full flex-col gap-8">
			<div className="space-y-2">
				<H1>{PROJECT_NAME}</H1>
				<Lead>{PROJECT_DESCRIPTION}</Lead>
			</div>

			<ActivationFunctionCard />
		</div>
	);
}
