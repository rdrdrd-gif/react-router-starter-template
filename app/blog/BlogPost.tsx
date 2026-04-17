import Markdown, { type Components } from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import "highlight.js/styles/github-dark.css";

import type { BlogPost as BlogPostData } from "./posts";
import type { TocEntry } from "./toc";

const markdownComponents: Components = {
	h1: ({ node: _node, ...props }) => (
		<h1
			className="scroll-mt-24 text-3xl font-bold text-gray-900 dark:text-gray-50 mt-10 mb-4"
			{...props}
		/>
	),
	h2: ({ node: _node, ...props }) => (
		<h2
			className="scroll-mt-24 text-2xl font-semibold text-gray-900 dark:text-gray-50 mt-10 mb-3 border-b border-gray-200 dark:border-gray-800 pb-2"
			{...props}
		/>
	),
	h3: ({ node: _node, ...props }) => (
		<h3
			className="scroll-mt-24 text-xl font-semibold text-gray-900 dark:text-gray-50 mt-8 mb-2"
			{...props}
		/>
	),
	h4: ({ node: _node, ...props }) => (
		<h4
			className="scroll-mt-24 text-lg font-semibold text-gray-900 dark:text-gray-50 mt-6 mb-2"
			{...props}
		/>
	),
	p: ({ node: _node, ...props }) => (
		<p
			className="leading-7 text-gray-700 dark:text-gray-300 my-4"
			{...props}
		/>
	),
	a: ({ node: _node, ...props }) => (
		<a
			className="text-blue-700 underline underline-offset-2 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
			{...props}
		/>
	),
	ul: ({ node: _node, ...props }) => (
		<ul
			className="list-disc pl-6 my-4 space-y-1 text-gray-700 dark:text-gray-300"
			{...props}
		/>
	),
	ol: ({ node: _node, ...props }) => (
		<ol
			className="list-decimal pl-6 my-4 space-y-1 text-gray-700 dark:text-gray-300"
			{...props}
		/>
	),
	li: ({ node: _node, ...props }) => (
		<li className="leading-7" {...props} />
	),
	blockquote: ({ node: _node, ...props }) => (
		<blockquote
			className="border-l-4 border-blue-400 dark:border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 pl-4 pr-3 py-2 my-4 italic text-gray-700 dark:text-gray-300 rounded-r-md"
			{...props}
		/>
	),
	code: ({ node: _node, className, children, ...props }) => {
		const isBlock = typeof className === "string" && className.includes("hljs");
		if (isBlock) {
			return (
				<code className={className} {...props}>
					{children}
				</code>
			);
		}
		return (
			<code
				className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-[0.9em] font-mono text-pink-700 dark:text-pink-300"
				{...props}
			>
				{children}
			</code>
		);
	},
	pre: ({ node: _node, ...props }) => (
		<pre
			className="rounded-lg bg-[#0d1117] text-gray-100 p-4 overflow-x-auto my-5 text-sm leading-6 border border-gray-800"
			{...props}
		/>
	),
	table: ({ node: _node, ...props }) => (
		<div className="overflow-x-auto my-5">
			<table
				className="min-w-full border-collapse text-sm text-left text-gray-700 dark:text-gray-300"
				{...props}
			/>
		</div>
	),
	thead: ({ node: _node, ...props }) => (
		<thead
			className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
			{...props}
		/>
	),
	th: ({ node: _node, ...props }) => (
		<th
			className="border-b border-gray-200 dark:border-gray-800 px-3 py-2 font-semibold"
			{...props}
		/>
	),
	td: ({ node: _node, ...props }) => (
		<td
			className="border-b border-gray-100 dark:border-gray-900 px-3 py-2 align-top"
			{...props}
		/>
	),
	hr: ({ node: _node, ...props }) => (
		<hr
			className="my-8 border-gray-200 dark:border-gray-800"
			{...props}
		/>
	),
};

export function BlogPost({
	post,
	toc,
}: {
	post: BlogPostData;
	toc: TocEntry[];
}) {
	return (
		<article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
			<header className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
				<p className="text-sm text-gray-500 dark:text-gray-400">
					<a
						href="/blog"
						className="hover:text-blue-700 dark:hover:text-blue-400"
					>
						← All posts
					</a>
				</p>
				<h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
					{post.title}
				</h1>
				<p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
					<time dateTime={post.date}>
						{new Date(post.date).toLocaleDateString(undefined, {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
					{" · "}
					{post.author}
				</p>
				{post.description && (
					<p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
						{post.description}
					</p>
				)}
			</header>

			<div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
				<div className="min-w-0">
					<Markdown
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[
							rehypeSlug,
							[
								rehypeAutolinkHeadings,
								{
									behavior: "wrap",
									properties: {
										className: ["no-underline hover:underline"],
									},
								},
							],
							rehypeHighlight,
						]}
						components={markdownComponents}
					>
						{post.content}
					</Markdown>
				</div>

				<TableOfContents entries={toc} />
			</div>
		</article>
	);
}

function TableOfContents({ entries }: { entries: TocEntry[] }) {
	if (entries.length === 0) return null;
	return (
		<aside className="lg:sticky lg:top-8 lg:self-start">
			<nav
				aria-label="Table of contents"
				className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
			>
				<p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
					On this page
				</p>
				<ul className="space-y-1 text-sm">
					{entries.map((entry) => (
						<li
							key={`${entry.depth}-${entry.id}`}
							style={{ paddingLeft: `${(entry.depth - 1) * 0.75}rem` }}
						>
							<a
								href={`#${entry.id}`}
								className="block py-1 text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400"
							>
								{entry.text}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}
