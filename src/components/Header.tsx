import type { pages } from "@/pages/+Router";
import { A, useBeforeLeave, useLocation } from "@solidjs/router";
import { createSignal, For, onMount, Show, type JSX } from "solid-js";
import { Portal } from "solid-js/web";

const [bubbleContainer, setBubbleContainer] = createSignal<HTMLDivElement>();
const [wrapper, setWrapper] = createSignal<HTMLDivElement>();
const [height, setHeight] = createSignal(0);
export const headerHeight = height;

export default function Header(props: { pages: typeof pages }) {
	onMount(() => {
		setHeight(wrapper()!.clientHeight);
	});

	return (
		<div class="fixed top-0 w-full z-20" ref={setWrapper}>
			<div ref={setBubbleContainer} />
			<header class="z-10 bg-purple-50 flex-wrap justify-center place-items-center gap-4 flex p-4 relative">
				<A href="/">
					<h2 class="lowercase text-5xl text-indigo-500">
						Snaily<span class="text-red-400">Po</span>
					</h2>
				</A>
				<Nav>
					<For
						each={props.pages.map(({ slug, meta }) => ({
							name: meta.title,
							size: meta.size,
							bg: meta.bg_class,
							href: slug,
						}))}>
						{(link) => <NavLink {...link} />}
					</For>
				</Nav>
			</header>
		</div>
	);
}

function Nav(props: { children?: JSX.Element }) {
	return (
		<nav class="flex flex-wrap place-content-center place-items-center gap-4 flex-1 w-full transition-all grid-flow-dense">
			{props.children}
		</nav>
	);
}

interface Link {
	href: string;
	name: string;
	bg: string;
	size: number;
}

function NavLink(props: Link) {
	const [position, setPosition] = createSignal<DOMRect>();
	const [bgCircle, setBgCircle] = createSignal<HTMLElement>();
	const [linkRef, setLinkRef] = createSignal<HTMLAnchorElement>();

	onMount(() => {
		const el = linkRef();
		if (!el) return;
		setPosition(el.getBoundingClientRect());
	});

	useBeforeLeave((e) => {
		const bg = bgCircle();
		if (!e.to.toString().includes(props.href) || !bg) return;
		e.preventDefault();

		const a = bg.animate(
			[{ transform: "scale(1)" }, { transform: "scale(50)" }],
			{ duration: 300 }
		);
		a.finished.then(() => e.retry(true)).catch(() => e.retry(true));
	});

	return (
		<>
			<A
				href={props.href}
				ref={setLinkRef}
				class="flex p-3 transition-all items-center justify-center lowercase text-2xl h-full hover:scale-110 hover:mx-1 rounded-xl w-min"
				classList={{ [props.bg]: true }}>
				{props.name}
			</A>
			<Portal mount={bubbleContainer()}>
				<div
					ref={setBgCircle}
					class="absolute rounded-[50%]"
					classList={{ [props.bg]: true }}
					style={{
						top: `${position()?.top ?? 0}px`,
						left: `${position()?.left ?? 0}px`,
						width: `${position()?.width ?? 0}px`,
						height: `${position()?.height ?? 0}px`,
					}}
				/>
			</Portal>
		</>
	);
}
