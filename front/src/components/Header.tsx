import { useRouterState } from "@tanstack/react-router";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./ui/breadcrumb";

export default function Header() {
	const matches = useRouterState({ select: (state) => state.matches });

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{matches.map((match, index) => {
					const isLastItem = index === matches.length - 1;

					const name = match.staticData.title;
					if (isLastItem) {
						return (
							<BreadcrumbItem>
								<BreadcrumbPage>{name}</BreadcrumbPage>
							</BreadcrumbItem>
						);
					}

					return (
						<>
							<BreadcrumbItem key={match.id}>
								<BreadcrumbLink href={match.fullPath}>{name}</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
