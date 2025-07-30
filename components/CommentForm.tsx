"use client";

import { Comment, addComment } from "@/lib/getPosts";
import { useState } from "react";

interface CommentFormProps {
  postId: string;
  onCommentAdded: (newComment: Comment) => void;
}

export default function CommentForm({
  postId,
  onCommentAdded,
}: CommentFormProps) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      setError("Name and comment are required.");
      return;
    }

    const newComment: Comment = addComment({
      author: name,
      content: comment,
      postId,
    });

    onCommentAdded(newComment);
    setName("");
    setComment("");
    setError(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-4 bg-white rounded-xl shadow-md p-6 sm:p-8 transition-all duration-300"
    >
      {error && (
        <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg">
          {error}
        </p>
      )}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-400 transition-all duration-200"
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your comment"
        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-400 h-36 resize-y transition-all duration-200"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold w-full sm:w-auto hover:from-blue-700 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
      >
        Submit Comment
      </button>
    </form>
  );
}
