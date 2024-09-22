import { CollectionConfig } from "payload";

export const Experience: CollectionConfig = {
	slug: "experience",
	labels: {
		singular: "Experience",
		plural: "Experiences",
	},
	fields: [
		{
			type: "row", // required
			fields: [
				{
					name: "Job Title", // required
					type: "text", // required
					required: true,
				},
				{
					name: "Comapany Name", // required
					type: "text", // required
					required: true,
				},
				{
					name: "Company Link", // required
					type: "text", // required
					validate: async (val, args) => {
						if (val && val.match(/^(https):\/\/[^ "]+$/)) {
							return true;
						}
						return "Please enter a valid URL";
					},
					required: true,
				},
			],
		},
		{
			name: "description", // required
			type: "textarea", // required
			maxLength: 500,
			required: true,
		},
		{
			type: "row", // required
			fields: [
				{
					name: "Start Date",
					type: "date",
					required: true,
					admin: {
						width: "50%",
						date: {
							pickerAppearance: "monthOnly",
							displayFormat: "MMMM yyyy",
						},
					},
				},
				{
					name: "Present", // required
					label: "Present",
					defaultValue: "yes",
					required: true,
					type: "select", // required
					hasMany: false,
					options: [
						{
							label: "yes",
							value: "yes",
						},
						{
							label: "no",
							value: "no",
						},
					],
				},
				{
					name: "End Date?",
					type: "date",
					required: true,
					admin: {
						width: "40%",
						condition: (_, siblingData) =>
							siblingData["Present"] === "no",
						date: {
							pickerAppearance: "monthOnly",
							displayFormat: "MMMM yyyy",
						},
					},
				},
			],
		},
		{
			name: "tags",
			type: "relationship",
			relationTo: ["tags"],
			index: true,
			hasMany: true,
		},
	],
};
