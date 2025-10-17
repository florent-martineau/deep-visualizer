import { Link } from "@tanstack/react-router";
import { useHover } from "@uidotdev/usehooks";
import { ArrowRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Vector3 } from "three";
import { ThreeDimensionsCanvas } from "@/components/3d/3d-canvas";
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
import { useRoute } from "@/hooks/useRoute";

export const ActivationFunctionCard = () => {
	const { route, staticData } = useRoute("/activation-functions/");
	const [ref, isHovering] = useHover();

	// Neurons
	const firstInputNeuronRef = useRef<NeuronHandle>(null);
	const secondInputNeuronRef = useRef<NeuronHandle>(null);
	const outputNeuronRef = useRef<NeuronHandle>(null);
	const firstInputNeuronPosition = new Vector3(-3, 3, 0);
	const secondInputNeuronPosition = new Vector3(-3, -3, 0);
	const outputNeuronPosition = new Vector3(3, 0, 0);

	// Neural connections
	const [firstInputNeuronToOutputNeuronWeight] = useState(randomWeight());
	const [secondInputNeuronToOutputNeuronWeight] = useState(randomWeight());
	const firstNeuralConnectionRef = useRef<NeuralConnectionHandle>(null);
	const secondNeuralConnectionRef = useRef<NeuralConnectionHandle>(null);

	const startAnimation = useCallback(() => {
		firstInputNeuronRef.current?.activate();
		firstNeuralConnectionRef.current?.activate();
		secondInputNeuronRef.current?.activate();
		secondNeuralConnectionRef.current?.activate();
	}, []);

	return (
		<Card
			className="w-92 hover:bg-primary/10 grayscale hover:grayscale-0 transition-all duration-300"
			ref={ref}
		>
			<Link to={route.fullPath}>
				<CardHeader className="hover:underline">
					<CardTitle>{staticData.title}</CardTitle>
					<CardDescription>{staticData.description}</CardDescription>
					<CardAction>
						<ArrowRight />
					</CardAction>
				</CardHeader>
			</Link>
			<CardContent className="relative w-full h-48">
				<ThreeDimensionsCanvas
					isRotating={isHovering}
					isRunning={isHovering}
					onLoaded={startAnimation}
				>
					<Neuron
						position={firstInputNeuronPosition}
						ref={firstInputNeuronRef}
					/>
					<Neuron
						position={secondInputNeuronPosition}
						ref={secondInputNeuronRef}
					/>
					<Neuron
						position={outputNeuronPosition}
						ref={outputNeuronRef}
						onActivationEnd={startAnimation}
					/>

					<NeuralConnection
						start={firstInputNeuronPosition}
						end={outputNeuronPosition}
						midOffset={-1.5}
						lineWidth={firstInputNeuronToOutputNeuronWeight}
						ref={firstNeuralConnectionRef}
					/>
					<NeuralConnection
						start={secondInputNeuronPosition}
						end={outputNeuronPosition}
						midOffset={1.5}
						lineWidth={secondInputNeuronToOutputNeuronWeight}
						ref={secondNeuralConnectionRef}
						onActivationEnd={() => outputNeuronRef.current?.activate()}
					/>
				</ThreeDimensionsCanvas>
			</CardContent>
		</Card>
	);
};

const randomWeight = () => {
	return 1 + 3 * Math.random();
};
