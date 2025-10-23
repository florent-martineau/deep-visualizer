import { useRef } from "react";
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
	const topNeuronPosition = new Vector3(2, 5, 0);
	const leftNeuronPosition = new Vector3(-2, 0, 0);
	const rightNeuronPosition = new Vector3(2, 0, 0);
	const bottomNeuronPosition = new Vector3(2, -3, 0);

	const topToLeftNeuralConnectionRef = useRef<NeuralConnectionHandle>(null);
	const leftToRightNeuralConnectionRef = useRef<NeuralConnectionHandle>(null);
	const rightToBottomNeuralConnectionRef = useRef<NeuralConnectionHandle>(null);
	const rightToTopNeuralConnectionRef = useRef<NeuralConnectionHandle>(null);

	return (
		<group position={props.position} rotation={props.rotation}>
			<Neuron position={topNeuronPosition} ref={topNeuronRef} />
			<Neuron position={leftNeuronPosition} ref={leftNeuronRef} />
			<Neuron position={rightNeuronPosition} ref={rightNeuronRef} />
			<Neuron position={bottomNeuronPosition} ref={bottomNeuronRef} />

			<NeuralConnection
				start={topNeuronPosition}
				end={leftNeuronPosition}
				midOffset={0}
				lineWidth={4}
				ref={topToLeftNeuralConnectionRef}
			/>
			<NeuralConnection
				start={leftNeuronPosition}
				end={rightNeuronPosition}
				midOffset={0}
				lineWidth={4}
				ref={leftToRightNeuralConnectionRef}
			/>
			<NeuralConnection
				start={rightNeuronPosition}
				end={bottomNeuronPosition}
				midOffset={0}
				lineWidth={4}
				ref={rightToBottomNeuralConnectionRef}
			/>
			<NeuralConnection
				start={rightNeuronPosition}
				end={topNeuronPosition}
				midOffset={0}
				lineWidth={4}
				ref={rightToTopNeuralConnectionRef}
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
	const bottomLeftNeuronReft = useRef<NeuronHandle>(null);
	const topLeftNeuronPosition = new Vector3(-2.5, 5, 0);
	const topRightNeuronPosition = new Vector3(2.5, 5, 0);
	const bottomRightNeuronPosition = new Vector3(2.5, -3, 0);
	const bottomLeftNeuronPosition = new Vector3(-2.5, -3, 0);

	const topLeftToTopRightNeuralConnectionRef =
		useRef<NeuralConnectionHandle>(null);
	const topRightToBottomRightNeuralConnectionRef =
		useRef<NeuralConnectionHandle>(null);
	const bottomRightToBottomLeftNeuralConnectionRef =
		useRef<NeuralConnectionHandle>(null);
	const bottomLeftToTopLeftNeuralConnectionRef =
		useRef<NeuralConnectionHandle>(null);

	return (
		<group position={props.position} rotation={props.rotation}>
			<Neuron position={topLeftNeuronPosition} ref={topLeftNeuronRef} />
			<Neuron position={topRightNeuronPosition} ref={topRightNeuronRef} />
			<Neuron position={bottomRightNeuronPosition} ref={bottomRightNeuronRef} />
			<Neuron position={bottomLeftNeuronPosition} ref={bottomLeftNeuronReft} />

			<NeuralConnection
				start={topLeftNeuronPosition}
				end={topRightNeuronPosition}
				midOffset={0}
				lineWidth={4}
				ref={topLeftToTopRightNeuralConnectionRef}
			/>
			<NeuralConnection
				start={topRightNeuronPosition}
				end={bottomRightNeuronPosition}
				midOffset={0}
				lineWidth={4}
				ref={topRightToBottomRightNeuralConnectionRef}
			/>
			<NeuralConnection
				start={bottomRightNeuronPosition}
				end={bottomLeftNeuronPosition}
				midOffset={0}
				lineWidth={4}
				ref={bottomRightToBottomLeftNeuralConnectionRef}
			/>
			<NeuralConnection
				start={bottomLeftNeuronPosition}
				end={topLeftNeuronPosition}
				midOffset={0}
				lineWidth={4}
				ref={bottomLeftToTopLeftNeuralConnectionRef}
			/>
		</group>
	);
};
