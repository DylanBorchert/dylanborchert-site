import { Block } from "payload";
import { languages } from "../components/code/languages";

export const CodeBlock: Block = {
	slug: "Code",
	fields: [
		{
			type: "select",
			name: "language",
			options: Object.entries(languages).map(([key, value]) => ({
				label: value,
				value: key,
			})),
			defaultValue: "ts",
		},
		{
			admin: {
				components: {
					Field: "@/payload/components/code/CodeBlock#Code",
				},
			},
			name: "code",
			type: "code",
		},
	],
};
