import { BlogPost } from "@/lib/getPosts";
import BlogCard from "./BlogCard";

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="transform transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <BlogCard post={post} />
        </div>
      ))}
    </div>
  );
}
