import { Blog, Project } from "#/payload/payload-types";
import { PropsWithChildren } from "react";
import PostHeader from "./components/Post.Header";
import PostFooter from "./components/Post.Footer";
import PostBody from "./components/Post.Body";
import PostOverview from "./components/Post.Overview";
import { BackgroundBeams } from "#/components/ui/background-beams";

const Post = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col justify-between min-h-dvh">{children}</div>;
};

const PostContent = ({ post }: { post: Blog | Project }) => {

  return (
    <section className=" grid grid-cols-[1fr_auto_1fr]">
      <BackgroundBeams />
      <PostOverview post={post} />
      <PostBody post={post} />
    </section>
  );
}

Post.Content = PostContent
Post.Header = PostHeader
Post.Footer = PostFooter

export default Post;
