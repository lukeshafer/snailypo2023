import { createMemo, createSignal, createContext, useContext, JSX } from "solid-js";
import type { Zine } from "../config";

const RATIO = 5.5 / 8.5;
const WIDTH = 300;

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

	function next() {
		console.log("next");
		setCurrentPage((page) => {
			if (page === LAST_PAGE) {
				return 0;
			} else return page + 1;
		})
	}

	function prev() {
		console.log("prev");
		setCurrentPage((page) => {
			if (page === 0) {
				return LAST_PAGE;
			} else return page - 1;
		})
	}

	return (
		<PositionsContext.Provider value={positions}>
			<h2 class="text-2xl text-center font-bold">{props.zine.name}</h2>
			<div class="flex pb-3">
				<ZinePage
					src={props.zine.src}
					position={leftPage()}
					page={2 * currentPage()}
					side="left"
					reversed={props.zine.reversed ?? false}>
					<Button onClick={prev} side="left" title="Previous">{'<'}</Button>
				</ZinePage>
				<ZinePage
					src={props.zine.src}
					position={rightPage()}
					page={2 * currentPage() + 1}
					side="right"
					reversed={props.zine.reversed ?? false}>
					<Button onClick={next} side="right" title="Next">{'>'}</Button>
				</ZinePage>
			</div>
		</PositionsContext.Provider>
	);
}

function ZinePage(props: {
	src: string;
	position: number;
	page: number;
	reversed: boolean;
	side: "left" | "right";
	children: JSX.Element;
}) {
	const positions = useContext(PositionsContext);

	const isRotated = createMemo(() =>
		props.position >= positions().length / 2
	);
	return (
		<div class="relative">
			<div
				class="flex flex-col items-center justify-center bg-center bg-no-repeat outline outline-2 outline-black/40 w-[30vw]"
				style={{
					"background-image": `url(${props.src})`,
					"max-width": `${WIDTH}px`,
					"aspect-ratio": `${RATIO}`,
					"background-size": "400%",
					"background-position": positions()[Math.abs(props.position)],
					transform: isRotated() ? "rotate(0.5turn)" : "rotate(0turn)",
					opacity: props.position === -1 ? 0 : 1,
				}}
			>
			</div>
			{props.children}
			{
				props.page > 0 && props.page <= LAST_PAGE * 2 ?
					<p class="text-center absolute w-full">{props.page}</p>
					: null
			}
		</div>
	)
}

function Button(props: {
	onClick: () => void;
	children: string;
	side: "left" | "right"
	title: string;
}) {
	return (
		<button
			class="bg-transparent hover:bg-slate-500/50 transition-all text-white font-bold py-2 px-4 rounded absolute h-full right-0 flex items-center top-0"
			style={{ [props.side]: "0", "justify-content": props.side === "left" ? "flex-start" : "flex-end" }}
			onClick={() => props.onClick()}>
			<span class="text-white bg-slate-500/25 px-2 rounded text-2xl font-bold" aria-hidden="true">
				{props.children}
			</span>
			<span class="visually-hidden">{props.title}</span>
		</button>
	);
}
