export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  slug: string;
  tags: string[];
  readTime: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  postId: string;
}

// Static blog posts (three posts)
const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 15",
    excerpt:
      "Learn how to build modern web applications with the latest version of Next.js, featuring improved performance and new features.",
    content: `
# Getting Started with Next.js 15

Next.js 15 brings exciting new features and improvements that make building React applications even more enjoyable. In this post, we'll explore the key features and how to get started.

## What's New in Next.js 15

- **Improved App Router**: Enhanced routing capabilities with better performance
- **React 19 Support**: Full compatibility with the latest React features
- **Enhanced Image Optimization**: Better performance for image loading
- **Improved TypeScript Support**: Better type inference and error handling

## Getting Started

To create a new Next.js 15 project, simply run:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Features to Explore

1. **Server Components**: Render components on the server for better performance
2. **Client Components**: Interactive components that run in the browser
3. **File-based Routing**: Organize your routes with simple file structure
4. **API Routes**: Build full-stack applications with built-in API support

Next.js continues to be the go-to framework for React developers who want to build fast, scalable applications with minimal configuration.
    `,
    author: "Yohhanes Developer",
    date: "2025-01-09",
    slug: "getting-started-nextjs-15",
    tags: ["Tech", "Next.js", "React"],
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "Mastering React 19: New Features and Best Practices",
    excerpt:
      "Discover the latest features in React 19 and learn best practices for building performant, maintainable web applications.",
    content: `
# Mastering React 19: New Features and Best Practices

React 19 introduces powerful new features that enhance developer experience and application performance. This post dives into what's new and how to leverage these features effectively.

## What's New in React 19

- **Improved Hooks**: Enhanced \`useEffect\` and new \`use\` hook for better state management
- **Server Components**: Seamless integration with frameworks like Next.js
- **Concurrent Rendering**: Smoother UI updates with automatic batching
- **Better Error Boundaries**: Improved handling of errors in components

## Getting Started

To use React 19 in your project, install it via npm:

\`\`\`bash
npm install react@19 react-dom@19
\`\`\`

## Best Practices

1. **Leverage Server Components**: Use server-side rendering for static content to reduce client-side JavaScript
2. **Optimize Hooks**: Replace \`useEffect\` with \`use\` for simpler data fetching
3. **Use Concurrent Features**: Implement \`startTransition\` for non-urgent updates
4. **Error Handling**: Wrap components with error boundaries for robust UX

### Example: Data Fetching with \`use\` Hook

\`\`\`jsx
import { use } from 'react';

function Component() {
  const data = use(fetchData());
  return <div>{data.title}</div>;
}
\`\`\`

React 19 empowers developers to build faster, more efficient applications with less boilerplate code.
    `,
    author: "Sara Coder",
    date: "2025-02-15",
    slug: "mastering-react-19",
    tags: ["React", "Tech", "Frontend"],
    readTime: "6 min read",
  },
  {
    id: "3",
    title: "Tailwind CSS: Best Practices for Scalable Styling",
    excerpt:
      "Learn how to use Tailwind CSS effectively to create scalable, maintainable, and beautiful UI designs for your web applications.",
    content: `
# Tailwind CSS: Best Practices for Scalable Styling

Tailwind CSS is a utility-first CSS framework that streamlines styling for modern web applications. This post covers best practices to make your Tailwind projects scalable and maintainable.

## Why Tailwind CSS?

- **Utility-First Approach**: Apply styles directly in your markup
- **Responsive Design**: Built-in utilities for responsive layouts
- **Customizable**: Easy to extend with custom themes
- **Performance**: Purges unused styles for smaller bundle sizes

## Getting Started

Install Tailwind CSS in your project:

\`\`\`bash
npm install -D tailwindcss
npx tailwindcss init
\`\`\`

Add Tailwind to your CSS file:

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

## Best Practices

1. **Use Component Classes**: Group utilities into reusable components
2. **Leverage Custom Themes**: Define colors, spacing, and fonts in \`tailwind.config.js\`
3. **Responsive Design**: Use breakpoints like \`sm:\`, \`md:\`, and \`lg:\` for responsive layouts
4. **Purge Unused Styles**: Configure purging to optimize production builds

### Example: Custom Button Component

\`\`\`jsx
// components/Button.tsx
const Button = ({ children }) => (
  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
    {children}
  </button>
);
\`\`\`

Tailwind CSS makes styling faster and more consistent, especially when paired with frameworks like Next.js or React.
    `,
    author: "Biniyam Designer",
    date: "2025-03-22",
    slug: "tailwind-css-best-practices",
    tags: ["Tailwind CSS", "Frontend", "Design"],
    readTime: "4 min read",
  },
];

// In-memory store for locally added comments
let localComments: Comment[] = [];

// Retrieve all blog posts (static)
export function getAllPosts(): BlogPost[] {
  return [...samplePosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Retrieve a single blog post by its slug (static)
export function getPostBySlug(slug: string): BlogPost | undefined {
  return samplePosts.find((post) => post.slug === slug);
}

// Retrieve comments for a specific post by its ID from JSONPlaceholder (limit to 2)
export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const fetchedComments = data.slice(0, 2).map((comment: any) => ({
      id: comment.id.toString(),
      author: comment.name,
      content: comment.body,
      date: new Date().toISOString().split("T")[0],
      postId: comment.postId.toString(),
    }));
    // Combine fetched comments with local comments
    const localPostComments = localComments.filter(
      (comment) => comment.postId === postId
    );
    return [...fetchedComments, ...localPostComments];
  } catch (error) {
    console.error("Error fetching comments from JSONPlaceholder:", error);
    return localComments.filter((comment) => comment.postId === postId);
  }
}

// Add a new comment (stored in-memory)
export function addComment(comment: Omit<Comment, "id" | "date">): Comment {
  const newComment: Comment = {
    ...comment,
    id: (Math.random() * 10000).toString(),
    date: new Date().toISOString().split("T")[0],
  };
  localComments.push(newComment);
  return newComment;
}