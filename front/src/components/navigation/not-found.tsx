import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Euler, Vector3 } from "three";
import { ThreeDimensionsCanvas } from "../3d/3d-canvas";
import {
	NeuralConnection,
	type NeuralConnectionHandle,
} from "../neural-network/neural-connection";
import { Neuron, type NeuronHandle } from "../neural-network/neuron";
import { H1 } from "../ui/typography";

export const NotFound = () => {
	const startAnimation = () => {};

	return (
		<div className="flex flex-col h-full items-center">
			<H1>Not Found</H1>
			<ThreeDimensionsCanvas
				isRotating={true}
				isRunning={true}
				onLoaded={startAnimation}
				camera={{ position: new Vector3(0, 0, 25) }}
			>
				<group>
					<Four position={new Vector3(0, -1.5, 5)} />

					<Zero
						position={new Vector3(4.33, -1.5, -2.5)}
						rotation={new Euler(0, (Math.PI * 2) / 3, 0)}
					/>

					<Four
						position={new Vector3(-4.33, -1.5, -2.5)}
						rotation={new Euler(0, (Math.PI * 4) / 3, 0)}
					/>
				</group>
			</ThreeDimensionsCanvas>
		</div>
	);
};

const Four = (props: { position: Vector3; rotation?: Euler }) => {
	/**
	 * A four is built like this:
	 *
	 *        Top
	 *       /  |
	 *      /   |
	 *    Left--Right
	 *          |
	 *        Bottom
	 */

	const topNeuronRef = useRef<NeuronHandle>(null);
	const leftNeuronRef = useRef<NeuronHandle>(null);
	const rightNeuronRef = useRef<NeuronHandle>(null);
	const bottomNeuronRef = useRef<NeuronHandle>(null);

	const topToLeftNeuralConnectionRef = useRef<NeuralConnectionHandle>(null);
	const leftToRightNeuralConnectionRef = useRef<NeuralConnectionHandle>(null);
	const rightToTopNeuralConnectionRef = useRef<NeuralConnectionHandle>(null);
	const rightToBottomNeuralConnectionRef = useRef<NeuralConnectionHandle>(null);

	useEffect(() => {
		topNeuronRef.current?.activate();
	});

	return (
		<group position={props.position} rotation={props.rotation}>
			<Neuron position={new Vector3(2, 5, 0)} ref={topNeuronRef} />
			<Neuron position={new Vector3(-2, 0, 0)} ref={leftNeuronRef} />
			<Neuron position={new Vector3(2, 0, 0)} ref={rightNeuronRef} />
			<Neuron position={new Vector3(2, -3, 0)} ref={bottomNeuronRef} />

			<NeuralConnection
				start={topNeuronRef}
				end={leftNeuronRef}
				midOffset={0}
				lineWidth={4}
				ref={topToLeftNeuralConnectionRef}
				onActivationEnd={leftNeuronRef.current?.activate}
			/>
			<NeuralConnection
				start={leftNeuronRef}
				end={rightNeuronRef}
				midOffset={0}
				lineWidth={4}
				ref={leftToRightNeuralConnectionRef}
				onActivationEnd={rightNeuronRef.current?.activate}
			/>
			<NeuralConnection
				start={rightNeuronRef}
				end={bottomNeuronRef}
				midOffset={0}
				lineWidth={4}
				ref={rightToBottomNeuralConnectionRef}
			/>
			<NeuralConnection
				start={rightNeuronRef}
				end={topNeuronRef}
				midOffset={0}
				lineWidth={4}
				ref={rightToTopNeuralConnectionRef}
				onActivationEnd={topNeuronRef.current?.activate}
			/>
		</group>
	);
};

const Zero = (props: { position: Vector3; rotation?: Euler }) => {
	/**
	 * A four is built like this:
	 *
	 *    TopLeft--TopRight
	 *      |         |
	 *      |         |
	 *      |         |
	 *      |         |
	 *      |         |
	 *      |         |
	 *  BottomLeft-BottomRight
	 */

	const topLeftNeuronRef = useRef<NeuronHandle>(null);
	const topRightNeuronRef = useRef<NeuronHandle>(null);
	const bottomRightNeuronRef = useRef<NeuronHandle>(null);
	const bottomLeftNeuronRef = useRef<NeuronHandle>(null);

	const topLeftToTopRightNeuralConnectionRef =
		useRef<NeuralConnectionHandle>(null);
	const topRightToBottomRightNeuralConnectionRef =
		useRef<NeuralConnectionHandle>(null);
	const bottomRightToBottomLeftNeuralConnectionRef =
		useRef<NeuralConnectionHandle>(null);
	const bottomLeftToTopLeftNeuralConnectionRef =
		useRef<NeuralConnectionHandle>(null);

	useEffect(() => {
		topLeftNeuronRef.current?.activate();
	});

	return (
		<group position={props.position} rotation={props.rotation}>
			<Neuron position={new Vector3(-2.5, 5, 0)} ref={topLeftNeuronRef} />
			<Neuron position={new Vector3(2.5, 5, 0)} ref={topRightNeuronRef} />
			<Neuron position={new Vector3(2.5, -3, 0)} ref={bottomRightNeuronRef} />
			<Neuron position={new Vector3(-2.5, -3, 0)} ref={bottomLeftNeuronRef} />

			<NeuralConnection
				start={topLeftNeuronRef}
				end={topRightNeuronRef}
				midOffset={0}
				lineWidth={4}
				ref={topLeftToTopRightNeuralConnectionRef}
				onActivationEnd={topRightNeuronRef.current?.activate}
			/>
			<NeuralConnection
				start={topRightNeuronRef}
				end={bottomRightNeuronRef}
				midOffset={0}
				lineWidth={4}
				ref={topRightToBottomRightNeuralConnectionRef}
				onActivationEnd={bottomRightNeuronRef.current?.activate}
			/>
			<NeuralConnection
				start={bottomRightNeuronRef}
				end={bottomLeftNeuronRef}
				midOffset={0}
				lineWidth={4}
				ref={bottomRightToBottomLeftNeuralConnectionRef}
				onActivationEnd={bottomLeftNeuronRef.current?.activate}
			/>
			<NeuralConnection
				start={bottomLeftNeuronRef}
				end={topLeftNeuronRef}
				midOffset={0}
				lineWidth={4}
				ref={bottomLeftToTopLeftNeuralConnectionRef}
				onActivationEnd={topLeftNeuronRef.current?.activate}
			/>
		</group>
	);
};
