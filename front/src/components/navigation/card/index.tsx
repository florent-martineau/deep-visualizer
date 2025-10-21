import { Link, type LinkProps } from "@tanstack/react-router";
import { useHover } from "@uidotdev/usehooks";
import { ArrowRight } from "lucide-react";
import { ThreeDimensionsCanvas } from "@/components/3d/3d-canvas";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type NavigationCardProps = {
	children: React.ReactNode;
	onLoaded?: () => void;
	navigation: Pick<LinkProps, "to" | "params"> & {
		to: "/activation-functions" | "/activation-functions/$activationFunctionId";
	};
	title: string;
	description: string;
};

export const NavigationCard = (props: NavigationCardProps) => {
	const [ref, isHovering] = useHover();

	return (
		<Card
			className="w-92 hover:bg-primary/10 grayscale hover:grayscale-0 transition-all duration-300"
			ref={ref}
		>
			<Link to={props.navigation.to} params={props.navigation.params}>
				<CardHeader className="hover:underline">
					<CardTitle>{props.title}</CardTitle>
					<CardDescription>{props.description}</CardDescription>
					<CardAction>
						<ArrowRight />
					</CardAction>
				</CardHeader>
			</Link>

			<CardContent className="relative w-full h-48">
				<ThreeDimensionsCanvas
					isRotating={isHovering}
					isRunning={isHovering}
					onLoaded={() => props.onLoaded?.()}
				>
					{props.children}
				</ThreeDimensionsCanvas>
			</CardContent>
		</Card>
	);
};
