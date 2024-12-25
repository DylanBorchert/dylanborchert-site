import BlogContent from "./components/Blog.Content";
import BlogFooter from "./components/Blog.Footer";
import BlogHeader from "./components/Blog.Header";


const Blog = ({ children }: any) => {
  return <div className="flex flex-col justify-between min-h-[100dvh]">{children}</div>;
};

Blog.Content = BlogContent
Blog.Header = BlogHeader
Blog.Footer = BlogFooter

export default Blog;
