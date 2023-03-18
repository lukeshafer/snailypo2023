import type { APIRoute } from "astro";

export const get: APIRoute = async () => {
	return {
		body: JSON.stringify(gallery),
	}
}

export interface GalleryPiece {
	name: string;
	src: string;
	width: number;
	height: number;
}

export const gallery = [
	{
		name: "Stars",
		src: "/gallery/stars.jpg",
		width: 7,
		height: 5,
	},
	{
		name: "Buy Yourself Flowers",
		src: "/gallery/buy-yourself-flowers.jpg",
		width: 5,
		height: 7,
	},
	{
		name: "Raccoon",
		src: "/gallery/raccoon.jpg",
		width: 5,
		height: 5,
	},
	{
		name: "Medusa",
		src: "/gallery/medusa.jpg",
		width: 3,
		height: 3,
	},
	{
		name: "Tax Frog",
		src: "/gallery/tax-frog.jpg",
		width: 7,
		height: 5,
	},
	{
		name: "Venus of Willendorf (Small)",
		src: "/gallery/venus-small.jpg",
		width: 2,
		height: 2,
	},
	{
		name: "Yarn",
		src: "/gallery/yarn.jpg",
		width: 5,
		height: 5,
	},
	{
		name: "Abstract",
		src: "/gallery/abstract.jpg",
		width: 7,
		height: 10,
	},
	{
		name: "beach",
		src: "/gallery/beach.jpg",
		width: 10,
		height: 13,
	},
	{
		name: "card",
		src: "/gallery/card.jpg",
		width: 3,
		height: 6,
	},
	{
		name: "devil",
		src: "/gallery/devil.jpg",
		width: 3,
		height: 5,
	},
	{
		name: "fairy 1",
		src: "/gallery/fairy-1.jpg",
		width: 7,
		height: 9,
	},
	{
		name: "fairy 2",
		src: "/gallery/fairy-2.jpg",
		width: 5,
		height: 7,
	},
	{
		name: "Flowers",
		src: "/gallery/flowers.jpg",
		width: 5,
		height: 7,
	},
	{
		name: "Ink Body",
		src: "/gallery/ink-body.jpg",
		width: 5,
		height: 7,
	},
	{
		name: "Oranges",
		src: "/gallery/oranges.jpg",
		width: 7,
		height: 9,
	},
	{
		name: "Pears",
		src: "/gallery/pears.jpg",
		width: 5,
		height: 7,
	},
	{
		name: "Sad",
		src: "/gallery/sad.jpg",
		width: 4,
		height: 6,
	},
	{
		name: "Snake Hand",
		src: "/gallery/snake-hand.png",
		width: 4,
		height: 6,
	},
	{
		name: "Venus of Willendorf (Large)",
		src: "/gallery/venus-large.jpg",
		width: 5,
		height: 7,
	},
]satisfies GalleryPiece[];
