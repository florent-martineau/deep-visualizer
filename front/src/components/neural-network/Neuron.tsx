import type { Vector3 } from "three";

type NeuronProps = {
	position: Vector3;
};

export const Neuron = (props: NeuronProps) => {
	return (
		<mesh position={[0, 1, 0]} castShadow receiveShadow>
			<sphereGeometry args={[1, 64, 64]} />
			<meshStandardMaterial
				color="#4a90e2"
				metalness={0.3}
				roughness={0.4}
				transparent={false}
			/>
		</mesh>
	);
};
