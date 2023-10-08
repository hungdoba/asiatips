import { prisma } from '@/db';
import { serialize } from 'next-mdx-remote/serialize';

import matter from 'gray-matter';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import remarkEmoji from 'remark-emoji';
import remarkImages from 'remark-images';

import Review from '@/components/Review';
import rehypeHighlight from 'rehype-highlight';
import rehypeAutolinkHeadings from 'remark-autolink-headings';
import slugify from 'slugify';
import { convert } from '@/utils/categoryToUrl';

export const getStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: {
      url: true,
      category: true,
    },
  });

  const paths = posts.map((post) => ({
    params: { category: convert(post.category), url: post.url },
  }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      url: params.url,
    },
  });

  // Not found post
  if (!post) {
    return {
      notFound: true,
    };
  }

  if (convert(post.category) != params.category) {
    return {
      notFound: true,
    };
  }

  post.created_at = post.created_at ? new Date(post.created_at) : new Date();

  const [serializedContent, serializedtableOfContents] = await Promise.all([
    serialize(post.markdown, {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          rehypeHighlight,
        ],
        remarkPlugins: [remarkGfm, remarkToc, remarkEmoji, remarkImages],
      },
    }),
    serialize(post.tableOfContents, {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          rehypeHighlight,
        ],
      },
    }),
  ]);

  return {
    props: {
      data: matter(post.markdown).data,
      content: serializedContent,
      tableOfContents: serializedtableOfContents,
      post: {
        ...post,
        created_at: post.created_at.toString(),
      },
      url: post.url,
    },
  };
};

function Article({ data, tableOfContents, content, post, url }) {
  return (
    <Review
      // data={data}
      tableOfContents={tableOfContents}
      content={content}
      post={post}
      // url={url}
    />
  );
}

export default Article;
