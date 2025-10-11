import type { Euler, Vector3 } from "three";

type NeuronProps = {
	position: Vector3;
	rotation: Euler;
};

export const Neuron = (props: NeuronProps) => {
	return (
		<mesh visible position={props.position}>
			<sphereGeometry />
			<meshStandardMaterial transparent />
		</mesh>
	);
};
