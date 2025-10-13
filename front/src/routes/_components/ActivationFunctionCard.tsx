import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Link } from "@tanstack/react-router";
import { useHover } from "@uidotdev/usehooks";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { WithRotation } from "@/components/3d/with-rotation";
import { Neuron } from "@/components/neural-network/Neuron";
import {
	NeuralConnection,
	type NeuralConnectionHandle,
} from "@/components/neural-network/neural-connection";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoute } from "@/hooks/useRoute";

export const ActivationFunctionCard = () => {
	const [loaded, setLoaded] = useState(false);
	const { route, staticData } = useRoute("/activation-functions");
	const [ref, isHovering] = useHover();
	const [
		firstInputNeuronToOutputNeuronWeight,
		setFirstInputNeuronToOutputNeuronWeight,
	] = useState(1);
	const [
		secondInputNeuronToOutputNeuronWeight,
		setSecondInputNeuronToOutputNeuronWeight,
	] = useState(1);
	const firstNeuronRef = useRef<NeuralConnectionHandle>(null);
	const secondNeuronRef = useRef<NeuralConnectionHandle>(null);

	// Neurons
	const firstInputNeuronPosition = new Vector3(-3, 3, 0);
	const secondInputNeuronPosition = new Vector3(-3, -3, 0);
	const outputNeuronPosition = new Vector3(3, 0, 0);

	// Links
	useEffect(() => {
		setFirstInputNeuronToOutputNeuronWeight(randomWeight());
		setSecondInputNeuronToOutputNeuronWeight(randomWeight());
	}, []);

	useEffect(() => {
		if (isHovering && firstNeuronRef) {
			firstNeuronRef.current?.activate();
		}
	});

	return (
		<Card
			className="w-92 hover:bg-primary/10 grayscale hover:grayscale-0 transition-all duration-300"
			ref={ref}
		>
			<Link to={route.path}>
				<CardHeader className="hover:underline">
					<CardTitle>{staticData.title}</CardTitle>
					<CardDescription>{staticData.description}</CardDescription>
					<CardAction>
						<ArrowRight />
					</CardAction>
				</CardHeader>
			</Link>
			<CardContent className="relative w-full h-48">
				<div className="relative h-full w-full">
					<Canvas
						camera={{ position: [0, 0, 10], fov: 50 }}
						onCreated={() => setLoaded(true)}
						className="cursor-pointer"
						frameloop={isHovering ? "always" : "demand"}
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

						<WithRotation
							isRotating={isHovering}
							timeForFullRotationInSeconds={2}
						>
							<Neuron position={firstInputNeuronPosition} />
							<Neuron position={secondInputNeuronPosition} />
							<Neuron position={outputNeuronPosition} />

							<NeuralConnection
								start={firstInputNeuronPosition}
								end={outputNeuronPosition}
								midOffset={-1.5}
								lineWidth={firstInputNeuronToOutputNeuronWeight}
								ref={firstNeuronRef}
							/>
							<NeuralConnection
								start={secondInputNeuronPosition}
								end={outputNeuronPosition}
								midOffset={1.5}
								lineWidth={secondInputNeuronToOutputNeuronWeight}
								ref={secondNeuronRef}
							/>
						</WithRotation>

						<OrbitControls />
					</Canvas>

					{!loaded && <Skeleton className="absolute inset-0 w-full h-full" />}
				</div>
			</CardContent>
		</Card>
	);
};

const randomWeight = () => {
	return 1 + 3 * Math.random();
};
