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
									type: "group",
									label: "Hero Image",
									name: "Hero Image",
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
											filterOptions: () => {
												return {
													mimeType: {
														like: "image",
													},
												};
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
											filterOptions: () => {
												return {
													mimeType: {
														like: "image",
													},
												};
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
											filterOptions: () => {
												return {
													mimeType: {
														like: "image",
													},
												};
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
							type: "textarea",
							name: "AboutMeText",
							label: "About Me Text",
							required: true,
						},
						{
							type: "relationship",
							hasMany: false,
							name: "AboutMeImage",
							required: true,
							label: "About Me Image",
							relationTo: "media",
							filterOptions: () => {
								return {
									mimeType: {
										like: "image",
									},
								};
							},
						},
						{
							type: "json",
							name: "prettyGoodAt",
							label: "I'm Pretty Good At",
							required: true,
							defaultValue: ["List of things I am good at"],
						},
					],
				},
				{
					label: "Experience",
					description: "The experience section of the home page",
					fields: [
						{
							name: "Resume",
							type: "relationship",
							relationTo: "media",
							hasMany: false,
							filterOptions: () => {
								return {
									mimeType: {
										equals: "application/pdf",
									},
								};
							},
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
