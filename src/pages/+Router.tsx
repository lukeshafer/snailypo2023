import {
	Route,
	Router as SolidRouter,
	Routes,
	useLocation,
} from "@solidjs/router";
import { For, Show, type JSX } from "solid-js";
import { z } from "astro/zod";
import Header from "@/components/Header";

// PAGE IMPORTS
import Index from ".";
import { Transition } from "solid-transition-group";
const pageFiles = import.meta.glob("./**/*.tsx");
const index = pageFiles["./index.tsx"];
if (!index) throw new Error("Index page not found");
delete pageFiles["./index.tsx"];

export type PageMeta = z.infer<typeof pageMeta>;
const pageMeta = z.object({
	title: z.string(),
	size: z.number(),
	bg_class: z.string(),
	order: z.number().optional(),
});

const pageFilesArr = await Promise.all(
	Object.entries(pageFiles).map(async ([filename, fn]) => {
		const name = filename.replace(/\.tsx$/, "").replace(/^\.\//, "");
		const data = await fn();
		return { name, data };
	})
);

const parsedPages = z
	.array(
		z
			.object({
				name: z.string(),
				data: z.object({
					default: z.function(),
					meta: pageMeta,
				}),
			})
			.transform(({ name, data }) => ({
				meta: data.meta,
				component: data.default as () => JSX.Element,
				slug: name,
			}))
	)
	.safeParse(pageFilesArr);

if (!parsedPages.success) throw parsedPages.error;
export const pages = parsedPages.data.sort(
	({ meta: { order: a } }, { meta: { order: b } }) => (a ?? 99) - (b ?? 99)
);

const easeOutQuad = "cubic-bezier(0.5, 1, 0.89, 1)";

export default function Router(props: { ssrRoute: string }) {
	return (
		<SolidRouter url={props.ssrRoute}>
			<Transition
				// @ts-expect-error - solid-transition-group types are wrong
				onBeforeEnter={(el: HTMLElement) =>
					(el.style.transform = "translateY(-100%)")
				}
				// @ts-expect-error - solid-transition-group types are wrong
				onAfterEnter={(el: HTMLElement) =>
					(el.style.transform = "translateY(0)")
				}
				onEnter={(el, done) => {
					el.animate(
						[
							{
								transform: "translateY(-100%)",
								easing: easeOutQuad,
							},
							{
								transform: "translateY(0)",
							},
						],
						{
							duration: 400,
						}
					)
						.finished.then(done)
						.catch(done);
				}}
				// @ts-expect-error - solid-transition-group types are wrong
				onExit={(el: HTMLElement, done) => {
					el.style.position = "absolute";
					el.style.width = "100%";
					el.animate(
						[
							{
								transform: "translateY(0)",
								easing: easeOutQuad,
							},
							{ transform: "translateY(-100%)" },
						],
						{
							duration: 200,
						}
					)
						.finished.then(done)
						.catch(done);
				}}>
				<Show when={useLocation().pathname !== "/"}>
					<Header pages={pages} />
				</Show>
			</Transition>

			<Routes>
				<For each={pages}>
					{(page) => (
						<Route
							path={page.slug}
							element={<Layout>{page.component()}</Layout>}
						/>
					)}
				</For>
				<Route path="/" element={Index} />
			</Routes>
		</SolidRouter>
	);
}

function Layout(props: { children?: JSX.Element }) {
	const pageName = useLocation().pathname.split("/")[1];

	const page = pages.find((page) => page.slug === pageName);
	if (!page) throw new Error("Page not found");

	if (!import.meta.env.SSR) {
		document.title = page.meta.title;
		document.body.classList.remove(...document.body.classList);
		document.body.classList.add(page.meta.bg_class);
	}

	return (
		<>
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
