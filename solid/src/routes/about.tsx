import Page from "~/components/Page";
import { links } from "~/data";

export default function About() {
	const { bg, title } = links.about;

	return (
		<Page title={title} bg={bg}>
			<h1 class="lowercase text-3xl">About</h1>
		</Page>
	);
}
