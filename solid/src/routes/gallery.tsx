import { gallery, links } from "~/data";
import { For } from "solid-js";
import Page from "~/components/Page";

export default function Gallery() {
	const { bg, title } = links.gallery;

	return (
		<Page title={title} bg={bg}>
			<h1 class="lowercase text-3xl">Gallery</h1>
			<ul class="flex flex-wrap justify-center gap-4">
				<For each={gallery}>
					{({ name, src, width }) => (
						<li class="flex flex-col items-center justify-center ">
							<img
								src={src}
								alt={name}
								class="max-w-xs shadow-md shadow-black/25"
								style={{ width: `${width * 50}px` }}
							/>
							<p class="text-center">{name}</p>
						</li>
					)}
				</For>
			</ul>
		</Page>
	);
}
