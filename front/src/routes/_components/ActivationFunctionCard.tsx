import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Link } from "@tanstack/react-router";
import { useHover } from "@uidotdev/usehooks";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { WithPause } from "@/components/3d/with-pause";
import { WithRotation } from "@/components/3d/with-rotation";
import { Neuron, type NeuronHandle } from "@/components/neural-network/Neuron";
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
	const canvasRef = useRef<HTMLCanvasElement>(null);
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
	const firstNeuralConnectionRef = useRef<NeuralConnectionHandle>(null);
	const secondNeuralConnectionRef = useRef<NeuralConnectionHandle>(null);

	// Neurons
	const firstInputNeuronRef = useRef<NeuronHandle>(null);
	const secondInputNeuronRef = useRef<NeuronHandle>(null);
	const outputNeuronRef = useRef<NeuronHandle>(null);
	const firstInputNeuronPosition = new Vector3(-3, 3, 0);
	const secondInputNeuronPosition = new Vector3(-3, -3, 0);
	const outputNeuronPosition = new Vector3(3, 0, 0);

	// Links
	useEffect(() => {
		setFirstInputNeuronToOutputNeuronWeight(randomWeight());
		setSecondInputNeuronToOutputNeuronWeight(randomWeight());
	}, []);

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
			<CardContent
				className="relative w-full h-48"
				onClick={() => firstNeuralConnectionRef.current?.activate()}
			>
				<div className="relative h-full w-full">
					<Canvas
						ref={canvasRef}
						camera={{ position: [0, 0, 10], fov: 50 }}
						onCreated={() => setLoaded(true)}
						className="cursor-pointer"
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
						<WithPause isRunning={isHovering}>
							<WithRotation
								isRotating={isHovering}
								timeForFullRotationInSeconds={2}
							>
								<Neuron
									position={firstInputNeuronPosition}
									ref={firstInputNeuronRef}
								/>
								<Neuron
									position={secondInputNeuronPosition}
									ref={secondInputNeuronRef}
								/>
								<Neuron position={outputNeuronPosition} ref={outputNeuronRef} />

								<NeuralConnection
									start={firstInputNeuronPosition}
									end={outputNeuronPosition}
									midOffset={-1.5}
									lineWidth={firstInputNeuronToOutputNeuronWeight}
									ref={firstNeuralConnectionRef}
									onActivationEnd={() => alert("Neuron 1 activation is over")}
								/>
								<NeuralConnection
									start={secondInputNeuronPosition}
									end={outputNeuronPosition}
									midOffset={1.5}
									lineWidth={secondInputNeuronToOutputNeuronWeight}
									ref={secondNeuralConnectionRef}
									onActivationEnd={() => alert("Neuron 2 activation is over")}
								/>
							</WithRotation>
						</WithPause>
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
