import { useCurrentMatch } from "@/hooks/useCurrentMatch";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";
import type { BreadcrumbMetadata } from "./breadcrumbs";

type HeaderProps = {
	className: string;
};

export default function Header(props: HeaderProps) {
	const currentMatch = useCurrentMatch();

	if (!currentMatch) return;

	const { loaderData } = currentMatch;

	if (!loaderData?.breadcrumbs) return;

	const breadcrumbs: BreadcrumbMetadata[] = [
		{
			name: "Home",
			navigation: {
				to: "/",
			},
		},
		...loaderData.breadcrumbs,
	];

	return (
		<Breadcrumb className={props.className}>
			<BreadcrumbList>
				{breadcrumbs.map((breadcrumb, index) => {
					const isLastItem = index === breadcrumbs.length - 1;

					return (
						<BreadcrumbItem key={breadcrumb.name}>
							{!breadcrumb.navigation && (
								<BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
							)}
							{breadcrumb.navigation && (
								<BreadcrumbLink href={breadcrumb.navigation?.to}>
									{breadcrumb.name}
								</BreadcrumbLink>
							)}
							{!isLastItem && (
								<BreadcrumbSeparator key={`${breadcrumb.name}-separator`} />
							)}
						</BreadcrumbItem>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
