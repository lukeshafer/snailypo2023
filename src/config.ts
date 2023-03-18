interface Link {
	name: string;
	href: string;
	title: string;
	bg: string;
	size: number;
}

export const links = {
	gallery: {
		name: "gallery",
		href: "/gallery",
		title: "Gallery",
		bg: "bg-red-300",
		size: 5,
	},
	zines: {
		name: "zines",
		href: "/zines",
		title: "Zines",
		bg: "bg-indigo-300",
		size: 4,
	},
	about: {
		name: "about",
		href: "/about",
		title: "About",
		bg: "bg-fuchsia-300",
		size: 3,
	},
	contact: {
		name: "contact",
		href: "/contact",
		title: "Contact",
		bg: "bg-orange-300",
		size: 3,
	},
} satisfies Record<string, Link>;

export const linkList = [
	links.gallery,
	links.zines,
	links.about,
	links.contact,
];

export interface Zine {
	name: string;
	src: string;
	startsIn: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
	reversed?: boolean;
}

export const zines = [
	{
		name: "Body Affirmations",
		src: "/zines/body-affirmations.jpg",
		startsIn: 5,
		reversed: true,
	},
	{
		name: "Being Fat is Cool and Great",
		src: "/zines/being-fat-is-cool-and-great.jpg",
		startsIn: 2,
	},
	{
		name: "The Best and Worst of Harry Styles: Music and Fashion",
		src: "/zines/best-and-worst-harry-styles.jpg",
		startsIn: 2,
	},
]satisfies Zine[];
