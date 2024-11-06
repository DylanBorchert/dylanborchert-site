import { getPayload } from "payload";
import config from "@payload-config";
import { Media } from "#/payload/payload-types";

const PAYLOAD = getPayload({ config });

export const CMS = {
	async getHome() {
		const home = await (
			await PAYLOAD
		).findGlobal({
			slug: "home",
			showHiddenFields: true,
		});
		return home;
	},
	async getResumeURL() {
		const home = await this.getHome();
		const resume = home?.Resume as Media;
		if (!resume || typeof resume === "string") return null;
		return resume.url;
	},
	async getExperience() {
		const experience = await (
			await PAYLOAD
		).find({
			collection: "experience",
			depth: 1,
			pagination: false,
			sort: "-endDate",
		});
		return experience.docs;
	},
};
