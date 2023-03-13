import { createMemo, createSignal, For } from "solid-js";
import { zines, type Zine } from "../data";

export default function Zine(props: { zine: Zine }) {
	const RATIO = 8.5 / 5.5;
	const WIDTH = 300;
	const HEIGHT = WIDTH * RATIO;

	const POSITIONS = [
		"0% 0%",
		"33.333% 0%",
		"66.666% 0%",
		"100% 0%",
		"100% 100%",
		"66.666% 100%",
		"33.333% 100%",
		"0% 100%",
	];

	// eslint-disable-next-line solid/reactivity
	const [position, setPosition] = createSignal(props.zine.startsIn - 1);

	const isRotated = createMemo(() =>
		position() < POSITIONS.length / 2
			? props.zine.reversed
			: !props.zine.reversed
	);

	function next() {
		setPosition((pos) => (pos + 1) % POSITIONS.length);
	}

	function prev() {
		setPosition((pos) => (pos - 1 + POSITIONS.length) % POSITIONS.length);
	}

	return (
		<section
			aria-label={props.zine.name}
			class={`grid place-items-center gap-4 rounded-2xl bg-white py-8 px-12 w-[400px]`}>
			<h2 class="text-2xl text-center font-bold">{props.zine.name}</h2>
			<div class="flex gap-4">
				<Button onClick={props.zine.reversed ? next : prev}>Prev</Button>
				<Button onClick={props.zine.reversed ? prev : next}>Next</Button>
			</div>
			<div
				class="flex flex-col items-center justify-center bg-center bg-no-repeat outline outline-2"
				style={{
					"background-image": `url(${props.zine.src})`,
					width: `${WIDTH}px`,
					height: `${HEIGHT}px`,
					"background-size": "400%",
					"background-position": POSITIONS[position()],
					transform: isRotated() ? "rotate(0.5turn)" : "rotate(0turn)",
				}}
			/>
		</section>
	);
}

function Button(props: { onClick: () => void; children: string }) {
	return (
		<button
			class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
			onClick={() => props.onClick()}>
			{props.children}
		</button>
	);
}
