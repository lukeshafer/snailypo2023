import { z } from "astro/zod";

export type Page = Awaited<ReturnType<typeof getPages>>[number];

export function getNameFromTitle(title: string) {
	return title.toLowerCase().replace(" ", "-");
}

export async function getPages() {
	const navLinks = ["gallery", "zines", "about", "contact"];

	const pageSchema = z
		.object({
			title: z.string(),
			size: z.coerce.number(),
			bg: z.string(),
		})
		.transform((page) => ({
			...page,
		}));

	const results = await Promise.allSettled(
		navLinks.map((link) =>
			import(`./pages/${link}.astro`)
				.then((p) => ({ ...pageSchema.parse(p), href: `/${link}` }))
				.catch((e) => {
					console.error(e);
					throw e;
				})
		)
	);

	function isFulfilled<T>(
		result: PromiseSettledResult<T>
	): result is PromiseFulfilledResult<T> {
		return result.status === "fulfilled";
	}

	return results.filter(isFulfilled).map((r) => r.value);
}

export async function getRoutes() {
	const pages = await getPages();

	return [
		...pages.map((page) => ({
			name: page.href.replace("/", ""),
			path: page.href,
		})),
		{
			name: "index",
			path: "/",
		},
	];
}
