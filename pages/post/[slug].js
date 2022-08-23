import React from 'react';
import { useRouter } from 'next/router';

import { PostDetails, Categories, PostWidget, Author, Comments, CommentForm } from '../../components';
import { getPosts, getPostDetails } from '../../services';
// import { AdjacentPosts } from '../../sections';

const PostPage = ({ post }) => {
  // const router = useRouter();

  // if (router.isFallback) {
  //   return <Loader />;
  // }

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetails post={post} />
            <Author author={post.author} />
            <CommentForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostPage;

export const getStaticProps = async ({ params }) => {
  const data = await getPostDetails(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

export const getStaticPaths = async () => {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}