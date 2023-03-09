import { createSignal } from "solid-js";
import { Portal } from "solid-js/web";

export default function MainNav() {
	return (
		<nav class="flex flex-wrap justify-center justify-items-center gap-4 w-full flex-1">
			<NavLink href="/zines" text="Zines" bg="bg-indigo-300" size={4} />
			<NavLink href="/gallery" text="Gallery" bg="bg-red-300" size={5} />
			<NavLink href="/contact" text="Contact" bg="bg-orange-300" size={2} />
			<NavLink href="/about" text="About" bg="bg-fuchsia-300" size={4} />
			{
				//<NavLink href="/shop" text="Shop" bg="bg-emerald-200" size={3} />
				//<NavLink href="/social" text="Social" bg="bg-amber-200" size={1} />
			}
		</nav>
	);
}

function NavLink(props: {
	bg: string;
	href: string;
	text: string;
	size: number;
}) {
	const size = () => 4 + (props.size ?? 1);
	const [clicked, setClicked] = createSignal(false);
	return (
		<>
			<a
				href={props.href}
				class="flex rounded-xl p-3 transition-all items-center justify-center lowercase text-2xl h-full w-min hover:scale-110 hover:mx-1"
				classList={{ [props.bg]: true }}
				onClick={() => {
					setClicked(true);
				}}
				style={{
					"grid-row": `span ${size()}`,
					"grid-column": `span ${size()}`,
					color: clicked() ? "transparent" : "default",
				}}>
				{props.text}
			</a>
			<Portal>
				<div class="" classList={{ [props.bg]: true }} />
			</Portal>
		</>
	);
}
