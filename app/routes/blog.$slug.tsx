import { BlogPost } from "../blog/BlogPost";
import { getPostBySlug } from "../blog/posts";
import { extractToc } from "../blog/toc";
import type { Route } from "./+types/blog.$slug";

export function meta({ data }: Route.MetaArgs) {
	if (!data?.post) {
		return [{ title: "Post not found" }];
	}
	return [
		{ title: data.post.title },
		{ name: "description", content: data.post.description },
	];
}

export function loader({ params }: Route.LoaderArgs) {
	const post = getPostBySlug(params.slug);
	if (!post) {
		throw new Response("Not Found", { status: 404 });
	}
	const toc = extractToc(post.content);
	return { post, toc };
}

export default function BlogPostRoute({ loaderData }: Route.ComponentProps) {
	return <BlogPost post={loaderData.post} toc={loaderData.toc} />;
}
