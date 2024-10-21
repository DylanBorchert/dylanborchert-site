import { GlobalConfig } from "payload";

const Home: GlobalConfig = {
	slug: "home",
	label: "home",
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					label: "Hero",
					description: "The hero section of the home page",
					fields: [
						{
							type: "collapsible",
							admin: {
								initCollapsed: true,
							},
							label: "Hero Image",
							fields: [
								{
									type: "row",
									fields: [
										{
											name: "imageMode",
											label: "Hero Image Mode",
											defaultValue: "general",
											required: true,
											type: "select",
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
											name: "darkImage",
											required: true,
											label: "Dark Mode Image",
											relationTo: "media",
											admin: {
												condition: (_, siblingData) => {
													return (
														siblingData.imageMode ===
														"theme"
													);
												},
											},
										},
										{
											type: "relationship",
											hasMany: false,
											name: "lightImage",
											required: true,
											label: "Light Mode Image",
											relationTo: "media",
											admin: {
												condition: (_, siblingData) => {
													return (
														siblingData.imageMode ===
														"theme"
													);
												},
											},
										},
										{
											type: "relationship",
											hasMany: false,
											required: true,
											name: "generalImage",
											label: "General Image",
											relationTo: "media",
											admin: {
												condition: (_, siblingData) => {
													return (
														siblingData.imageMode ===
														"general"
													);
												},
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
					fields: [
						{
							type: "richText",
							name: "About Me",
						},
					],
				},
				{
					label: "Experience",
					description: "The experience section of the home page",
					fields: [
						{
							name: "experience",
							type: "relationship",
							relationTo: "experience",
							hasMany: true,
						},
					],
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
