import PageNav from "../components/PageNav";
import { A } from "@solidjs/router";
import type { JSX } from "solid-js";

export default function PageLayout(props: {
	bg: string;
	title: string;
	children: JSX.Element;
}) {
	return (
		<>
			<header class="bg-purple-50 flex flex-wrap justify-center place-items-center gap-4 p-4 w-full">
				<A href="/">
					<h2 class="flex-[0] lowercase text-5xl text-indigo-500">
						Snaily<span class="text-red-400">Po</span>
					</h2>
				</A>
				<PageNav />
			</header>
			<main
				classList={{ [props.bg]: true }}
				class={`min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-20 items-center p-4`}>
				{props.children}
			</main>
		</>
	);
}
