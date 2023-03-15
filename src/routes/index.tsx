import { A } from "solid-start";
import { createMemo, createSignal, For } from "solid-js";
import { linkList } from "~/data";
import { createStore } from "solid-js/store";

export default function Index() {
	return (
		<main class="min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-4 items-center p-10 bg-indigo-200 bg-gradient-to-b from-indigo-200 to-violet-200">
			<header
				class="flex flex-wrap gap-4 items-center justify-center w-full max-w-xl self-start"
				style={{ "text-shadow": "0 4px 8px rgb(0 0 0 / .15)" }}>
				<img src="/logo.png" alt="SnailyPo Logo" class="w-32 sm:w-44" />
				<h1
					class="lowercase text-4xl sm:text-5xl text-indigo-500 text-left"
					style={{ "text-shadow": "0 4px 8px rgb(0 0 0 / .10)" }}>
					Snaily<span class="text-red-400">Po</span>
				</h1>
			</header>
			<MainNav links={linkList} />
		</main>
	);
}

const [hoveredLink, setHoveredLink] = createSignal<null | string>(null);

interface Link {
	href: string;
	name: string;
	bg: string;
	size: number;
}

function MainNav(props: { links: Link[] }) {
	const positions = [
		{ x: 22, y: 18 },
		{ x: 49, y: 11 },
		{ x: 72, y: 34 },
		{ x: 63, y: 64 },
		{ x: 54, y: 72 },
		{ x: 30, y: 70 },
	];

	return (
		<>
			<div
				class="h-[45rem] max-h-[110vw] w-[45rem] max-w-[110vw] grid place-items-center drop-shadow-[0_0_8px_#00000022] bg-no-repeat bg-center"
				style={{
					"background-image": "url('/palette.svg')",
					"background-size": "100% 100%",
					"background-position": "center",
				}}>
				<nav
					class="relative place-content-center place-items-center gap-4 p-20 h-full transition-all flex flex-col"
					style={{ width: "100%" }}>
					<For each={props.links.slice(0, positions.length)}>
						{(link, index) => (
							<NavLink
								{...link}
								x={positions[index() % positions.length].x}
								y={positions[index() % positions.length].y}
							/>
						)}
					</For>
				</nav>
			</div>
		</>
	);
}

function NavLink(props: {
	bg: string;
	href: string;
	name: string;
	size: number;
	x: number;
	y: number;
}) {
	const size = () => 4 + (props.size ?? 1);
	const [isMouseOver, setIsMouseOver] = createSignal(false);

	const scale = createMemo(() =>
		isMouseOver() ? 1.1 : hoveredLink() !== null ? 0.9 : 1
	);

	return (
		<A
			href={props.href}
			class={`flex rounded-[50%] transition-all items-center justify-center lowercase text-2xl h-[18%] w-[18%] absolute`}
			classList={{ [props.bg]: true }}
			onMouseOver={() => {
				setIsMouseOver(true);
				setHoveredLink(props.name);
			}}
			onMouseOut={() => {
				setIsMouseOver(false);
				setHoveredLink(null);
			}}
			style={{
				"grid-row": `span ${size()}`,
				"grid-column": `span ${size()}`,
				scale: scale(),
				"transform-origin": "center center",
				top: `${props.y}%`,
				left: `${props.x}%`,
			}}>
			<svg
				viewBox="0 0 100 100"
				class="w-[120%] absolute -top-[30%] text-center">
				<def>
					<path id="curve" d="M 10 45 C 25 10 95 10 100 50" />
				</def>
				<text>
					<textPath href="#curve">{props.name}</textPath>
				</text>
			</svg>
		</A>
	);
}
