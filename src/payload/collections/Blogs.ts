import { CollectionConfig, RichTextField } from "payload";
import {
	HTMLConverterFeature,
	lexicalEditor,
	lexicalHTML,
	LexicalRichTextAdapter,
	SanitizedServerEditorConfig,
	getEnabledNodes,
	$convertFromMarkdownString,
} from "@payloadcms/richtext-lexical";
import { createHeadlessEditor } from "@payloadcms/richtext-lexical/lexical/headless";
import { $convertToMarkdownString } from "@payloadcms/richtext-lexical/lexical/markdown";
import { $getRoot } from "lexical";
import slugify from "slugify";

export const Blogs: CollectionConfig = {
	slug: "blogs",
	admin: {
		useAsTitle: "slug",
	},
	versions: {
		drafts: {
			autosave: true,
		},
	},
	fields: [
		{
			name: "title",
			label: "Title",
			type: "text",
		},
		{
			name: "description",
			label: "Description",
			type: "text",
		},
		{
			name: "slug",
			label: "Slug",
			type: "text",
			unique: true,
			admin: {
				readOnly: true,
			},
		},
		{
			name: "minute_read",
			label: "Minute Read",
			type: "number",
			admin: {
				readOnly: true,
			},
		},
		{
			name: "tags",
			label: "Tags",
			type: "relationship",
			relationTo: "tags",
			hasMany: true,
		},
		{
			name: "content",
			type: "richText",
			label: "Content",
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [
					...defaultFeatures,
					HTMLConverterFeature({}),
				],
			}),
			required: true,
			localized: true,
			admin: {
				width: "100%",
			},
		},
		lexicalHTML("content", { name: "content_html" }),
	],
	hooks: {
		beforeChange: [
			async ({ data }) => {
				try {
					const slug = slugify(data.title || "", {
						lower: true,
						strict: true,
					});
					data.slug = slug;
					return data;
				} catch (error) {
					console.error("Error in slug hook", error);
				}
			},
			async ({ collection, data }) => {
				try {
					const otherRichTextField: RichTextField =
						collection.fields.find(
							(field) =>
								"name" in field && field.name === "content"
						) as RichTextField;

					const lexicalAdapter: LexicalRichTextAdapter =
						otherRichTextField.editor as LexicalRichTextAdapter;

					const sanitizedServerEditorConfig: SanitizedServerEditorConfig =
						lexicalAdapter.editorConfig;

					const headlessEditor = createHeadlessEditor({
						nodes: getEnabledNodes({
							editorConfig: sanitizedServerEditorConfig,
						}),
					});

					const headlessEditorState = JSON.stringify(data.content);

					if (headlessEditorState) {
						try {
							headlessEditor.update(
								() => {
									headlessEditor.setEditorState(
										headlessEditor.parseEditorState(
											headlessEditorState
										)
									);
								},
								{ discrete: true } // This should commit the editor state immediately
							);
						} catch (e) {
							console.error(
								{ err: e },
								"ERROR parsing editor state"
							);
						}

						// Export to plain text
						const plainTextContent =
							headlessEditor.getEditorState().read(() => {
								return $getRoot().getTextContent();
							}) || "";

						const words = plainTextContent
							.replaceAll("\n", " ")
							.split(" ")
							.filter((n) => n);
						const minute_read =
							Math.round(
								(words.length / 200 + Number.EPSILON) * 100
							) / 100;
						console.log(
							"Blog words",
							words.length,
							"Minute read",
							minute_read
						);
						data.minute_read = minute_read;
					}
				} catch (error) {
					console.error("Error in read hook", error);
				}
			},
		],
	},
};
