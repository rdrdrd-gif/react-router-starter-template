import GithubSlugger from "github-slugger";

export type TocEntry = {
	id: string;
	text: string;
	depth: number;
};

/**
 * Extract a table of contents from a markdown string.
 *
 * Walks the raw markdown line by line, skipping fenced code blocks, and
 * collects ATX-style headings (`#`, `##`, ...). Slugs are generated with
 * `github-slugger` so they match the `id` attributes produced by `rehype-slug`.
 */
export function extractToc(markdown: string, maxDepth = 3): TocEntry[] {
	const slugger = new GithubSlugger();
	const entries: TocEntry[] = [];
	const lines = markdown.split("\n");

	let inFence = false;
	let fenceMarker: string | null = null;

	for (const rawLine of lines) {
		const line = rawLine.trimEnd();
		const fenceMatch = line.match(/^(\s*)(```+|~~~+)/);
		if (fenceMatch) {
			const marker = fenceMatch[2];
			if (!inFence) {
				inFence = true;
				fenceMarker = marker;
			} else if (fenceMarker && marker.startsWith(fenceMarker[0])) {
				inFence = false;
				fenceMarker = null;
			}
			continue;
		}
		if (inFence) continue;

		const headingMatch = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
		if (!headingMatch) continue;
		const depth = headingMatch[1].length;
		if (depth > maxDepth) continue;
		const text = stripInlineMarkdown(headingMatch[2]);
		if (!text) continue;
		const id = slugger.slug(text);
		entries.push({ id, text, depth });
	}

	return entries;
}

function stripInlineMarkdown(text: string): string {
	return text
		.replace(/`([^`]+)`/g, "$1")
		.replace(/\*\*([^*]+)\*\*/g, "$1")
		.replace(/\*([^*]+)\*/g, "$1")
		.replace(/__([^_]+)__/g, "$1")
		.replace(/_([^_]+)_/g, "$1")
		.replace(/~~([^~]+)~~/g, "$1")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.trim();
}
