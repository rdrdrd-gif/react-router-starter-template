import { Link } from "react-router";

import { listPosts } from "../blog/posts";
import type { Route } from "./+types/blog._index";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Blog" },
		{ name: "description", content: "Read the latest posts." },
	];
}

export function loader() {
	return { posts: listPosts() };
}

export default function BlogIndex({ loaderData }: Route.ComponentProps) {
	const { posts } = loaderData;
	return (
		<main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
			<header className="mb-10">
				<p className="text-sm text-gray-500 dark:text-gray-400">
					<Link
						to="/"
						className="hover:text-blue-700 dark:hover:text-blue-400"
					>
						← Home
					</Link>
				</p>
				<h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
					Blog
				</h1>
				<p className="mt-2 text-gray-600 dark:text-gray-400">
					Writing about React Router, Cloudflare Workers, and the tools we use
					to build on the edge.
				</p>
			</header>

			<ul className="space-y-8">
				{posts.map((post) => (
					<li
						key={post.slug}
						className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
					>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							<time dateTime={post.date}>
								{new Date(post.date).toLocaleDateString(undefined, {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</time>
						</p>
						<h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
							<Link
								to={`/blog/${post.slug}`}
								className="hover:text-blue-700 dark:hover:text-blue-400"
							>
								{post.title}
							</Link>
						</h2>
						<p className="mt-2 text-gray-600 dark:text-gray-400">
							{post.description}
						</p>
						<p className="mt-4">
							<Link
								to={`/blog/${post.slug}`}
								className="text-sm font-medium text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
							>
								Read more →
							</Link>
						</p>
					</li>
				))}
			</ul>
		</main>
	);
}
