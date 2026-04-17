export type BlogPost = {
	slug: string;
	title: string;
	description: string;
	date: string;
	author: string;
	content: string;
};

const gettingStartedContent = `# Getting Started with React Router and Cloudflare Workers

Welcome to this sample blog post! This page demonstrates **Markdown rendering**,
**syntax highlighting**, and an auto-generated **table of contents**. Every
heading in this post is added to the TOC on the side so you can jump to any
section with a click.

## Introduction

React Router is a fully featured routing library for React. When paired with
the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/),
you get a production-ready stack for building full-stack React apps that run on
the edge.

> This blog post is rendered at request time on the server. The markdown is
> parsed with [\`react-markdown\`](https://github.com/remarkjs/react-markdown),
> extended with [\`remark-gfm\`](https://github.com/remarkjs/remark-gfm) for
> GitHub-flavored markdown, and highlighted with
> [\`rehype-highlight\`](https://github.com/rehypejs/rehype-highlight).

## Features

- GitHub-flavored markdown (tables, task lists, strikethrough)
- Syntax highlighting for fenced code blocks
- Automatic heading anchors (click a heading to copy its link)
- Sticky table of contents that tracks the visible section

### Task list example

- [x] Render markdown
- [x] Add syntax highlighting
- [x] Generate a table of contents
- [ ] Write more posts

## Code samples

### TypeScript

Here is a small React component written in TypeScript:

\`\`\`tsx
import { useState } from "react";

type CounterProps = {
  initial?: number;
};

export function Counter({ initial = 0 }: CounterProps) {
  const [count, setCount] = useState(initial);
  return (
    <button
      type="button"
      onClick={() => setCount((value) => value + 1)}
      className="rounded-md border px-3 py-1"
    >
      Count: {count}
    </button>
  );
}
\`\`\`

### A React Router loader

Loaders run on the server and provide data to your components:

\`\`\`ts
import type { Route } from "./+types/blog.$slug";

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    throw new Response("Not found", { status: 404 });
  }
  return { post };
}
\`\`\`

### Bash

\`\`\`bash
npm install
npm run dev
\`\`\`

## Tables

GitHub-flavored markdown supports tables out of the box:

| Feature            | Package                 | Notes                           |
| ------------------ | ----------------------- | ------------------------------- |
| Markdown rendering | \`react-markdown\`        | Component-based renderer        |
| GFM extensions     | \`remark-gfm\`            | Tables, task lists, autolinks   |
| Syntax highlight   | \`rehype-highlight\`      | Uses highlight.js grammars      |
| Heading anchors    | \`rehype-slug\`           | Generates \`id\` attributes       |

## Conclusion

That's it! You now have a blog post page with rich markdown rendering. Edit
\`app/blog/posts.ts\` to add your own posts, and they will automatically appear in
the blog index and on their own dedicated page.
`;

const typescriptTipsContent = `# Five TypeScript Tips for Cleaner React Code

A short collection of patterns I reach for when building React apps with
TypeScript. These are small but impactful.

## 1. Prefer \`type\` for component props

\`\`\`ts
type ButtonProps = {
  label: string;
  onClick: () => void;
};
\`\`\`

\`type\` aliases compose well with unions and intersections and read nicely in
editor tooltips.

## 2. Use discriminated unions for async state

\`\`\`ts
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };
\`\`\`

The compiler will narrow the type inside each branch, eliminating the need for
non-null assertions.

## 3. Let React infer event types

\`\`\`tsx
<input
  onChange={(event) => {
    // event is inferred as React.ChangeEvent<HTMLInputElement>
    console.log(event.target.value);
  }}
/>
\`\`\`

## 4. Extract constants with \`as const\`

\`\`\`ts
const ROLES = ["admin", "editor", "viewer"] as const;
type Role = (typeof ROLES)[number];
\`\`\`

## 5. Prefer \`unknown\` over \`any\`

When you don't know the type of a value yet, use \`unknown\` and narrow it
explicitly. This keeps your type system honest.

## Further reading

- The [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Effective TypeScript](https://effectivetypescript.com/) by Dan Vanderkam
`;

export const posts: BlogPost[] = [
	{
		slug: "getting-started",
		title: "Getting Started with React Router and Cloudflare Workers",
		description:
			"A tour of this starter template's blog page, showcasing markdown, syntax highlighting, and a live table of contents.",
		date: "2026-04-17",
		author: "React Router Starter Team",
		content: gettingStartedContent,
	},
	{
		slug: "typescript-tips",
		title: "Five TypeScript Tips for Cleaner React Code",
		description:
			"Small patterns that pay off: discriminated unions, as const, unknown, and more.",
		date: "2026-04-10",
		author: "React Router Starter Team",
		content: typescriptTipsContent,
	},
];

export function getPostBySlug(slug: string): BlogPost | undefined {
	return posts.find((post) => post.slug === slug);
}

export function listPosts(): BlogPost[] {
	return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}
