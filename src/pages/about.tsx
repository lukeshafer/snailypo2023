import type { PageHead } from "@/types";

export const meta: PageHead = {
	title: "About",
	size: 4,
	bg_class: "bg-fuchsia-300",
};

export default function About() {
	return (
		<>
			<h1 class="lowercase text-3xl">About</h1>
		</>
	);
}
