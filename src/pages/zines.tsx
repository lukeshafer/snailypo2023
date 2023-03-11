import type { PageHead } from "@/types";
import Zines from "../components/Zines";

export const meta: PageHead = {
	title: "Zines",
	size: 4,
	bg_class: "bg-indigo-300",
	order: 2,
};

export default function () {
	return (
		<>
			<h1 class="lowercase text-3xl">Zines</h1>
			<Zines />
		</>
	);
}
