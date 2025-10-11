import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Link } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useRoute } from "@/hooks/useRoute";

export const ActivationFunctionCard = () => {
	const { route, staticData } = useRoute("/activation-functions");

	return (
		<Link to={route.path}>
			<Card className="w-92 hover:bg-primary/10">
				<CardHeader>
					<CardTitle>{staticData.title}</CardTitle>
					<CardDescription>{staticData.description}</CardDescription>
				</CardHeader>
				<CardContent>
					<Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
						<ambientLight intensity={0.5} />
						<pointLight position={[10, 10, 10]} />

						<mesh visible position={[1, 2, 3]} rotation={[Math.PI / 2, 0, 0]}>
							<sphereGeometry args={[1, 16, 16]} />
							<meshStandardMaterial transparent />
						</mesh>

						<OrbitControls enableDamping />
					</Canvas>
				</CardContent>
			</Card>
		</Link>
	);
};
