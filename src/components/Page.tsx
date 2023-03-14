import { Title } from "solid-start";
import type { JSX } from "solid-js";

export default function Page(props: {
	bg: string;
	title: string;
	children: JSX.Element;
}) {
	return (
		<>
			<Title>{props.title}</Title>
			<main
				style={{
					animation: "fadein 0.4s ease-in-out forwards",
				}}
				class="min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-20 items-center p-4 transition-opacity pt-28">
				{props.children}
			</main>
		</>
	);
}
