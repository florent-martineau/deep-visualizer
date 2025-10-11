import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Link } from "@tanstack/react-router";
import { Vector3 } from "three";
import { Neuron } from "@/components/neural-network/Neuron";
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
						<ambientLight intensity={0.3} />
						<directionalLight
							position={[5, 5, 5]}
							intensity={1}
							castShadow
							shadow-mapSize-width={2048}
							shadow-mapSize-height={2048}
						/>
						<pointLight position={[-5, 5, -5]} intensity={0.5} />

						<Neuron position={new Vector3(1, 2, 3)} />

						<OrbitControls />
					</Canvas>
				</CardContent>
			</Card>
		</Link>
	);
};
