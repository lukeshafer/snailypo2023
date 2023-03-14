import { A, useBeforeLeave } from "@solidjs/router";
import { createSignal, For, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { useLocation } from "solid-start";
import { Transition } from "solid-transition-group";

const [bubbleContainer, setBubbleContainer] = createSignal<HTMLDivElement>();

interface Link {
	href: string;
	title: string;
	bg: string;
}

const easeOutQuad = "cubic-bezier(0.5, 1, 0.89, 1)";

export default function Header(props: { links: Link[] }) {
	const [wrapper, setWrapper] = createSignal<HTMLDivElement>();
	const location = useLocation();

	onMount(() => {
		const observer = new MutationObserver((e) => {
			e.forEach((mutation) => {
				const el = mutation.target as HTMLElement;
				console.log(el.className);
			});
		});

		// observe class changes
		observer.observe(wrapper()!, {
			attributes: true,
			attributeFilter: ["class"],
		});

		wrapper();
	});

	return (
		<div
			class="fixed top-0 w-full z-20 transition-all ease-[cubic-bezier(0.5,1,0.89,1)]"
			ref={setWrapper}
			style={{
				transform:
					location.pathname === "/" ? "translateY(-100%)" : "translateY(0%)",
			}}>
			<div ref={setBubbleContainer} />
			<header class="z-10 bg-purple-50 flex-wrap justify-center place-items-center gap-4 flex p-4 relative">
				<A href="/">
					<h2 class="lowercase text-5xl text-indigo-500">
						Snaily<span class="text-red-400">Po</span>
					</h2>
				</A>
				<nav class="flex flex-wrap place-content-center place-items-center gap-4 flex-1 w-full transition-all grid-flow-dense">
					<For each={props.links}>{(link) => <NavLink {...link} />}</For>
				</nav>
			</header>
		</div>
	);
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
			[
				{ transform: "scale(1)", easing: "cubic-bezier(0.5, 1, 0.89, 1)" },
				{ transform: "scale(200)" },
			],
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
				{props.title}
			</A>
			<Portal mount={bubbleContainer()}>
				<div
					ref={setBgCircle}
					class="absolute rounded-[50%]"
					classList={{ [props.bg]: true }}
					style={{
						top: `${position()?.top ?? 0}px`,
						left: `${position()?.left ?? 0}px`,
						width: `1vmax`,
						height: `1vmax`,
					}}
				/>
			</Portal>
		</>
	);
}
