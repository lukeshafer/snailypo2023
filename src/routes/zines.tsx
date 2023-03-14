import Page from "~/components/Page";
import { Zine } from "~/components/Zines";
import { For } from "solid-js";
import { zines, links } from "~/data";

export default function() {
	const { bg, title } = links.zines;

	return (
		<Page title={title} bg={bg}>
			<h1 class="lowercase text-3xl">Zines</h1>
			<div class="flex flex-wrap items-center justify-center gap-12">
				<For each={zines}>{(zine) => <Zine zine={zine} />}</For>
			</div>
		</Page>
	);
}
