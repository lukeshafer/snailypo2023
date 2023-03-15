// @refresh reload
import { Suspense } from "solid-js";
import {
	useLocation,
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	Title,
} from "solid-start";
import Header from "~/components/Header";
import { linkList } from "~/data";
import "./root.css";
import "@fontsource/sniglet";

export default function Root() {
	const location = useLocation();

	const currentPage = () =>
		linkList.find((link) => link.href === location.pathname);
	return (
		<Html lang="en">
			<Head>
				<Title>SolidStart - With TailwindCSS</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Body class={`${currentPage()?.bg ?? ""}`}>
				<Suspense>
					<ErrorBoundary>
						<Header links={linkList} />
						<Routes>
							<FileRoutes />
						</Routes>
					</ErrorBoundary>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	);
}
