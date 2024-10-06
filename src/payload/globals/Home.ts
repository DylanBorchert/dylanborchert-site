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
					fields: [
						{
							type: "group",
							name: "Images",
							fields: [
								{
									type: "row",
									fields: [
										{
											name: "Hero Image", // required
											label: "Hero Image name",
											defaultValue: "general",
											type: "select", // required
											hasMany: false,
											options: [
												{
													label: "theme",
													value: "theme",
												},
												{
													label: "general",
													value: "general",
												},
											],
										},
										{
											type: "relationship",
											hasMany: false,
											name: "Dark Mode Image",
											label: "Dark Mode Image",
											relationTo: "media",
											admin: {
												condition: (_, siblingData) =>
													siblingData[
														"Hero Image"
													] === "theme",
											},
										},
										{
											type: "relationship",
											hasMany: false,
											name: "Light Mode Image",
											label: "Light Mode Image",
											relationTo: "media",
											admin: {
												condition: (_, siblingData) =>
													siblingData[
														"Hero Image"
													] === "theme",
											},
										},
										{
											type: "relationship",
											hasMany: false,
											name: "General Image",
											label: "General Image",
											relationTo: "media",
											admin: {
												condition: (_, siblingData) =>
													siblingData[
														"Hero Image"
													] === "general",
											},
										},
									],
								},
							],
						},
					],
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
