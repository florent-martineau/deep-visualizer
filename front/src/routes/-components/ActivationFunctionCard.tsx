import { useCallback, useRef, useState } from "react";
import { Vector3 } from "three";
import { NavigationCard } from "@/components/navigation/card";
import {
	NeuralConnection,
	type NeuralConnectionHandle,
} from "@/components/neural-network/neural-connection";
import { Neuron, type NeuronHandle } from "@/components/neural-network/neuron";

export const ActivationFunctionCard = () => {
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
		<NavigationCard
			onLoaded={startAnimation}
			navigation={{ to: "/activation-functions" }}
			title="Activation Functions"
			description="How does a neuron fire?"
		>
			<Neuron position={firstInputNeuronPosition} ref={firstInputNeuronRef} />
			<Neuron position={secondInputNeuronPosition} ref={secondInputNeuronRef} />
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
		</NavigationCard>
	);
};

const randomWeight = () => {
	return 1 + 3 * Math.random();
};
