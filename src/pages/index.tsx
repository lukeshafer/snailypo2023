import { pages } from "./+Router";

export const title = "SnailyPo";

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
			<MainNav
				links={pages.map(({ slug, meta }) => ({
					name: meta.title,
					size: meta.size,
					bg: meta.bg_class,
					href: slug,
				}))}
			/>
		</main>
	);
}

import { createMemo, createSignal, For } from "solid-js";
import { A } from "@solidjs/router";

const [hoveredLink, setHoveredLink] = createSignal<null | string>(null);

interface Link {
	href: string;
	name: string;
	bg: string;
	size: number;
}

function MainNav(props: { links: Link[] }) {
	const GRID_SIZE = "10px";
	return (
		<div class="bg-purple-50 rounded-[50%] min-h-[45rem] w-[45rem] grid place-items-center shadow-[0_0_10px] shadow-black/10">
			<nav
				class="grid place-content-center place-items-center gap-4 p-20 h-full grid-flow-dense"
				style={{
					"grid-auto-rows": GRID_SIZE,
					"grid-template-columns": `repeat(auto-fit, ${GRID_SIZE})`,
					width: "min(100%, 100vw)",
				}}>
				<For each={props.links}>{(link) => <NavLink {...link} />}</For>
			</nav>
		</div>
	);
}

function NavLink(props: {
	bg: string;
	href: string;
	name: string;
	size: number;
}) {
	const size = () => 4 + (props.size ?? 1);
	const [isMouseOver, setIsMouseOver] = createSignal(false);

	const scale = createMemo(() =>
		isMouseOver() ? 1.1 : hoveredLink() !== null ? 0.9 : 1
	);

	return (
		<A
			href={props.href}
			class="flex rounded-[50%] transition-all items-center justify-center lowercase text-2xl h-full w-full"
			classList={{ [props.bg]: true }}
			onMouseOver={() => {
				setIsMouseOver(true);
				setHoveredLink(props.name);
			}}
			onMouseOut={() => {
				setIsMouseOver(false);
				setHoveredLink(null);
			}}
			onClick={() => {
				//setClicked(true);
			}}
			style={{
				"grid-row": `span ${size()}`,
				"grid-column": `span ${size()}`,
				scale: scale(),
			}}>
			{props.name}
		</A>
	);
}
