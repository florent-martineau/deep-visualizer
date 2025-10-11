import { OrbitControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Link } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { Vector3 } from "three";
import { CurvedLink } from "@/components/3d/curved-link";
import { Neuron } from "@/components/neural-network/Neuron";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoute } from "@/hooks/useRoute";
import { cn } from "@/lib/utils";

export const ActivationFunctionCard = () => {
	const [loaded, setLoaded] = useState(false);
	const { route, staticData } = useRoute("/activation-functions");

	const firstInputNeuronPosition = new Vector3(-3, 3, 0);
	const secondInputNeuronPosition = new Vector3(-3, -3, 0);
	const outputNeuronPosition = new Vector3(3, 0, 0);

	return (
		<Link to={route.path}>
			<Card className="w-92 hover:bg-primary/10">
				<CardHeader>
					<CardTitle>{staticData.title}</CardTitle>
					<CardDescription>{staticData.description}</CardDescription>
				</CardHeader>
				<CardContent className="relative w-full h-48">
					<div className="relative h-full w-full">
						<Canvas
							camera={{ position: [0, 0, 10], fov: 50 }}
							onCreated={() => setLoaded(true)}
						>
							<ambientLight intensity={0.3} />
							<directionalLight
								position={[5, 5, 5]}
								intensity={1}
								castShadow
								shadow-mapSize-width={2048}
								shadow-mapSize-height={2048}
							/>
							<pointLight position={[-5, 5, -5]} intensity={0.5} />

							<Neuron position={firstInputNeuronPosition} />
							<Neuron position={secondInputNeuronPosition} />
							<Neuron position={outputNeuronPosition} />

							<CurvedLink
								start={firstInputNeuronPosition}
								end={outputNeuronPosition}
								midOffset={-1.5}
								lineWidth={2}
							/>
							<CurvedLink
								start={secondInputNeuronPosition}
								end={outputNeuronPosition}
								midOffset={1.5}
								lineWidth={2}
							/>

							<OrbitControls />
						</Canvas>
						{!loaded && <Skeleton className="absolute inset-0 w-full h-full" />}
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};
