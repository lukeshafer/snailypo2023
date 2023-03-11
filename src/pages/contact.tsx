import { gallery } from "@/data";
import { For } from "solid-js";
import type { PageHead } from "@/types";

export const meta: PageHead = {
	title: "Contact",
	size: 2,
	bg_class: "bg-orange-300",
};

export default function Contact() {
	return (
		<>
			<h1 class="lowercase text-3xl">Contact</h1>
		</>
	);
}
