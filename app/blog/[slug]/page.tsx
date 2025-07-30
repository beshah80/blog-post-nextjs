"use client";

import CommentForm from "@/components/CommentForm";
import {
  BlogPost,
  Comment,
  getCommentsByPostId,
  getPostBySlug,
} from "@/lib/getPosts";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [slug, setSlug] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Resolve slug from params
  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.slug);
    });
  }, [params]);

  // Fetch post data when slug changes
  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        try {
          const fetchedPost = await getPostBySlug(slug);
          setPost(fetchedPost || null);
        } catch {
          setError("Failed to load post. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [slug]);

  // Fetch comments when post changes
  useEffect(() => {
    if (post) {
      const fetchComments = async () => {
        try {
          const fetchedComments = await getCommentsByPostId(post.id);
          setComments(fetchedComments);
        } catch {
          setError("Failed to load comments. Please try again later.");
        }
      };
      fetchComments();
    }
  }, [post]);

  const handleCommentAdded = (newComment: Comment) => {
    setComments((prev) => [...prev, newComment]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-600 text-lg font-medium animate-pulse">
          Loading post...
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
        <nav className="px-8 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </nav>

        <header className="px-8 pt-6 pb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-between text-gray-600 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {post.readTime}
            </span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <section className="bg-white rounded-lg p-8 mb-8 border-t border-gray-100">
          <div className="prose prose-lg max-w-none text-gray-700">
            {post.content.split("\n").map((paragraph, index) => {
              if (paragraph.trim() === "") return null;
              const key = `paragraph-${index}`;

              if (paragraph.startsWith("# ")) {
                return (
                  <h1
                    key={key}
                    className="text-3xl font-bold text-gray-900 mt-8 mb-4"
                  >
                    {paragraph.replace("# ", "")}
                  </h1>
                );
              }
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={key}
                    className="text-2xl font-semibold text-gray-900 mt-6 mb-3"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3
                    key={key}
                    className="text-xl font-semibold text-gray-900 mt-4 mb-2"
                  >
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("```")) {
                return (
                  <pre
                    key={key}
                    className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm"
                  >
                    <code>
                      {paragraph.replace(/```\w*/, "").replace("```", "")}
                    </code>
                  </pre>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <li key={key} className="ml-6 mb-2 text-gray-700">
                    {paragraph.replace("- ", "")}
                  </li>
                );
              }
              if (paragraph.match(/^\d+\./)) {
                return (
                  <li
                    key={key}
                    className="ml-6 mb-2 list-decimal text-gray-700"
                  >
                    {paragraph.replace(/^\d+\.\s*/, "")}
                  </li>
                );
              }
              return (
                <p key={key} className="mb-4 leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </section>

        <section className="px-8 pb-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Comments ({comments.length})
          </h2>
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {comment.author.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {comment.author}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {comment.date}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No comments yet. Be the first to comment!
            </p>
          )}
          <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
        </section>
      </article>
    </div>
  );
}
