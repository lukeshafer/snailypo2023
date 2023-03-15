import { A } from "solid-start";
import { createMemo, createSignal, For } from "solid-js";
import { linkList } from "~/data";
import { createStore } from "solid-js/store";

export default function Index() {
	return (
		<main
			class={`min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-20 items-center p-10 bg-indigo-200 bg-gradient-to-b from-indigo-200 to-violet-200`}>
			<header
				class="flex flex-wrap gap-4 items-center justify-start w-full"
				style={{ "text-shadow": "0 4px 8px rgb(0 0 0 / .15)" }}>
				<img src="/logo.png" alt="SnailyPo Logo" class="w-60" />
				<h1
					class="lowercase text-7xl text-indigo-500 text-left"
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
		{ x: 24, y: 15 },
		{ x: 49, y: 11 },
		{ x: 72, y: 28 },
		{ x: 69, y: 57 },
		{ x: 54, y: 72 },
		{ x: 30, y: 70 },
	];

	return (
		<>
			<div
				class="min-h-[45rem] w-[768px] grid place-items-center drop-shadow-[0_0_8px_#00000022] bg-no-repeat bg-center bg-clip-content"
				style={{
					"background-image": "url('/palette.svg')",
					"background-size": "100% 100%",
					"background-position": "center",
				}}>
				<nav
					class="relative place-content-center place-items-center gap-4 p-20 h-full transition-all flex flex-col"
					style={{ width: "min(100%, 100vw)" }}>
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
			<svg>
				<defs>
					<clipPath id="palette" clipPathUnits="objectBoundingBox">
						<path d="m1,0.538 c-0.013,-0.147,-0.086,-0.271,-0.177,-0.356 c-0.08,-0.075,-0.181,-0.105,-0.278,-0.117 c-0.102,-0.013,-0.211,-0.003,-0.303,0.058 c-0.04,0.026,-0.073,0.066,-0.096,0.115 c-0.014,0.03,-0.044,0.116,-0.02,0.148 c0.022,0.06,0.091,0.098,0.129,0.136 c0.025,0.025,0.052,0.059,0.009,0.078 c-0.035,0.015,-0.081,-0.006,-0.116,-0.011 c-0.061,-0.01,-0.137,-0.001,-0.146,0.097 c-0.009,0.1,0.062,0.172,0.119,0.221 c0.173,0.146,0.4,0.194,0.598,0.119 c0.168,-0.063,0.3,-0.254,0.279,-0.487 m-0.711,-0.257" />
					</clipPath>
				</defs>
			</svg>
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
			class={`flex rounded-[50%] transition-all items-center justify-center lowercase text-2xl h-36 w-36 md:absolute md:translate-x-0`}
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
			{props.name}
		</A>
	);
}
