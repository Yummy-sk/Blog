import Head from 'next/head';
import { PostDetail, Utterances } from 'components';
import { getPostData, getPostsFiles } from 'utils/handlePosts';
import { IPostProps } from 'types';

export default function PostDetailPage({ post }: { post: IPostProps }) {
  const { slug, description } = post;
  return (
    <>
      <Head>
        <title>{slug}</title>
        <meta name="description" content={description} />
      </Head>
      <PostDetail post={post} />
      <Utterances />
    </>
  );
}

export function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFileNames = getPostsFiles();

  const slugs = postFileNames.map((fileName: string) => fileName.replace(/\.md$/, ''));
  return {
    paths: slugs.map((slug: string) => ({ params: { slug } })),
    fallback: false,
  };
}
