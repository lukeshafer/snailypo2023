interface GalleryPiece {
	name: string;
	src: string;
	width: number;
}

export const gallery = [
	{
		name: "Stars",
		src: "/gallery/stars.jpg",
		width: 8,
	},
	{
		name: "Buy Yourself Flowers",
		src: "/gallery/buy-yourself-flowers.jpg",
		width: 5,
	},
	{
		name: "Raccoon",
		src: "/gallery/raccoon.jpg",
		width: 5,
	},
	{
		name: "Medusa",
		src: "/gallery/medusa.jpg",
		width: 5,
	},
	{
		name: "Tax Frog",
		src: "/gallery/tax-frog.jpg",
		width: 5,
	},
	{
		name: "Venus of Willendorf",
		src: "/gallery/venus-small.jpg",
		width: 3,
	},
	{
		name: "Yarn",
		src: "/gallery/yarn.jpg",
		width: 5,
	},
] satisfies GalleryPiece[];

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
] satisfies Zine[];
