import { createMemo, createSignal } from "solid-js";

const [hoveredLink, setHoveredLink] = createSignal<null | string>(null);

export default function MainNav() {
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
				<NavLink href="/zines" text="Zines" bg="bg-indigo-300" size={4} />
				<NavLink href="/gallery" text="Gallery" bg="bg-red-300" size={5} />
				<NavLink href="/contact" text="Contact" bg="bg-orange-300" size={2} />
				<NavLink href="/about" text="About" bg="bg-fuchsia-300" size={4} />
				{
					//<NavLink href="/shop" text="Shop" bg="bg-emerald-200" size={3} />
					//<NavLink href="/social" text="Social" bg="bg-amber-200" size={1} />
				}
			</nav>
		</div>
	);
}

function NavLink(props: {
	bg: string;
	href: string;
	text: string;
	size: number;
}) {
	const size = () => 4 + (props.size ?? 1);
	const [isMouseOver, setIsMouseOver] = createSignal(false);

	const scale = createMemo(() =>
		isMouseOver() ? 1.1 : hoveredLink() !== null ? 0.9 : 1
	);

	return (
		<a
			href={props.href}
			class="flex rounded-[50%] transition-all items-center justify-center lowercase text-2xl h-full w-full"
			classList={{ [props.bg]: true }}
			onMouseOver={() => {
				setIsMouseOver(true);
				setHoveredLink(props.text);
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
			{props.text}
		</a>
	);
}
