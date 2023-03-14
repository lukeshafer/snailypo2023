import Page from "~/components/Page";
import { links } from "~/data";

export default function Contact() {
	const { bg, title } = links.contact;

	return (
		<Page title={title} bg={bg}>
			<h1 class="lowercase text-3xl">Contact</h1>
		</Page>
	);
}
