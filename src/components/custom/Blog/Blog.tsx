import NotFound from "./components/Blog.Notfound";

const Blog = ({ children }: any) => {
  return <div>{children}</div>;
};

Blog.NotFound = NotFound;

export default Blog;
