// @ts-ignore
import parse from "@js-bits/dom-parser";

interface melker {
	title?: string;
	link?: string;
	description?: string;
	pubDate?: string;
}

function stripHtmlTags(input: string) {
	return input.replace(/<\/?[^>]+(>|$)/g, "");
}

export function parseRSS(xmlString: string) {
	const xmlDoc = parse(xmlString);

	// Extract channel information
	const channel = xmlDoc.querySelector("channel");
	const channelInfo = {
		title: channel?.querySelector("title")?.textContent,
		link: channel?.querySelector("link")?.textContent,
		description: channel?.querySelector("description")?.textContent,
	};

	// Extract item information
	let items: melker[] = [];
	const itemNodes = channel?.querySelectorAll("item");

	// @ts-ignore
	itemNodes?.forEach((item) => {
		const title = item.querySelector("title")?.textContent;
		const link = item.querySelector("link")?.textContent;
		const description = item.querySelector("description")?.textContent;
		const pubDate = item.querySelector("pubDate")?.textContent;

		items.push({
			title: title,
			link: link,
			description: description,
			pubDate: pubDate,
		} as melker);
	});

	// Return the JSON structure
	return {
		channel: channelInfo,
		items: items,
	};
}
