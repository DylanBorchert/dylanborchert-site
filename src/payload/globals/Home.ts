import { GlobalConfig } from "payload";

const Home: GlobalConfig = {
	slug: "home",
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					label: "Hero",
					description: "The hero section of the home page",
					fields: [],
				},
				{
					label: "About Me",
					description: "The about me section of the home page",
					fields: [],
				},
				{
					label: "Experience",
					description: "The experience section of the home page",
					fields: [],
				},
				{
					label: "Projects",
					description: "The projects section of the home page",
					fields: [],
				},
			],
		},
	],
};

export default Home;
