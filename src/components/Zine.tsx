import { createEffect, createMemo, createSignal, createContext, useContext } from "solid-js";
import type { Zine } from "../config";

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
]

const LAST_PAGE = (POSITIONS.length / 2);
const PositionsContext = createContext(() => POSITIONS);

export default function Zine(props: { zine: Zine }) {
	const startsIn = createMemo(() => props.zine.reversed
		? POSITIONS.length - props.zine.startsIn + 1
		: props.zine.startsIn);

	const positions = createMemo(() => props.zine.reversed
		? POSITIONS.slice().reverse()
		: POSITIONS);

	const [currentPage, setCurrentPage] = createSignal(0);
	const posIndex = createMemo(() =>
		(2 * currentPage() + startsIn() - 1) % positions().length);

	const rightPage = createMemo(() => currentPage() === LAST_PAGE ? -1 : posIndex())
	const leftPage = createMemo(() => currentPage() === 0 ? -1 : (posIndex() - 1 + positions().length) % positions().length)

	createEffect(() => {
		console.log(props.zine.name)
		console.log("Current page", currentPage());
		console.log("Right page", rightPage());
		console.log("Left page", leftPage());
	})

	function next() {
		setCurrentPage((page) => {
			if (page === LAST_PAGE) {
				return 0;
			} else return page + 1;
		})
	}

	function prev() {
		setCurrentPage((page) => {
			if (page === 0) {
				return LAST_PAGE;
			} else return page - 1;
		})
	}

	return (
		<PositionsContext.Provider value={positions}>
			<h2 class="text-2xl text-center font-bold">{props.zine.name}</h2>
			<div class="flex gap-4">
				<Button onClick={prev}>Prev</Button>
				<Button onClick={next}>Next</Button>
			</div>
			<div class="flex">
				<ZinePage
					src={props.zine.src}
					position={leftPage()}
					page={2 * currentPage()}
					type="left"
					reversed={props.zine.reversed ?? false} />
				<ZinePage
					src={props.zine.src}
					position={rightPage()}
					page={2 * currentPage() + 1}
					type="right"
					reversed={props.zine.reversed ?? false} />
			</div>
		</PositionsContext.Provider>
	);
}

function ZinePage(props: {
	src: string;
	position: number;
	page: number;
	reversed: boolean;
	type: "left" | "right";
}) {
	const positions = useContext(PositionsContext);

	const isRotated = createMemo(() =>
		props.position >= positions().length / 2
	);
	return <div>
		<div
			class="flex flex-col items-center justify-center bg-center bg-no-repeat outline outline-2 outline-black/40"
			style={{
				"background-image": `url(${props.src})`,
				width: `${WIDTH}px`,
				height: `${HEIGHT}px`,
				"background-size": "400%",
				"background-position": positions()[Math.abs(props.position)],
				transform: isRotated() ? "rotate(0.5turn)" : "rotate(0turn)",
				opacity: props.position === -1 ? 0 : 1,
			}}
		/>
		{
			props.page > 0 && props.page <= LAST_PAGE * 2 ?
				<p class="text-center">{props.page}</p>
				: null
		}
	</div>
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
