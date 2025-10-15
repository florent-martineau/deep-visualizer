import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { Vector3 } from "three";

export interface NeuronHandle {
	activate: () => void;
}

type NeuronProps = {
	position: Vector3;
};

export const Neuron = forwardRef<NeuronHandle, NeuronProps>((props, ref) => {
	const [isActivated, setIsActivated] = useState(false);

	useImperativeHandle(ref, () => ({
		activate: () => {
			setIsActivated(true);
		},
	}));

	useEffect(() => {
		alert(isActivated);
	}, [isActivated]);

	return (
		<mesh position={props.position} castShadow receiveShadow>
			<sphereGeometry args={[1, 64, 64]} />
			<meshStandardMaterial
				color="#4a90e2"
				metalness={0.3}
				roughness={0.4}
				transparent={false}
			/>
		</mesh>
	);
});
