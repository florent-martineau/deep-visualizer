import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { H1, Lead } from "@/components/ui/typography";
import { PROJECT_DESCRIPTION, PROJECT_NAME } from "@/constants";
import { useRoute } from "@/hooks/useRoute";

export const Route = createFileRoute("/")({
	staticData: {
		showHeader: false,
		title: PROJECT_NAME,
		description: PROJECT_DESCRIPTION,
	},
	component: App,
});

function App() {
	const { route, staticData } = useRoute("/activation-functions");

	return (
		<div className="flex items-center justify-center h-full flex-col gap-8">
			<div className="space-y-2">
				<H1>{PROJECT_NAME}</H1>
				<Lead>{PROJECT_DESCRIPTION}</Lead>
			</div>

			<Link to={route.path}>
				<Card className="w-92">
					<CardHeader>
						<CardTitle>{staticData.title}</CardTitle>
						<CardDescription>{staticData.description}</CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			</Link>
		</div>
	);
}
