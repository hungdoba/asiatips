import { GetStaticPaths } from 'next';
import { prisma } from '@/db';
import { post } from '@prisma/client';
import Aboutme from '@/components/Aboutme';
import Subscribe from '@/components/Subscribe';

import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import Tags from '@/components/Tags';

type Props = {
  posts: post[];
  tag: string | null;
};

type Params = {
  tag: string;
};

const Tag = ({ posts, tag }: Props) => {
  return (
    <>
      <SEO
        title="Asiatips | Mẹo hay ở Nhật"
        description="Blog chia sẻ kiến thức và mẹo hay khi sống ở Nhật dành cho người nước ngoài"
        image="https://www.asiatips.net/card.jpg"
        url="https://asiatips.net/knowledge"
      />
      <Navbar />
      <div className="container md:mx-auto mt-24 md:flex md:flex-col md:max-w-7xl">
        <div className="mx-2">
          <div className="w-full flex">
            <Tags
              highline={tag}
              initTags={null}
              category={null}
              isClickable={true}
            />
          </div>
          <hr className="h-px my-2 bg-blue-200 border-0 "></hr>
          <h2 className="mb-2 text-xl font-bold">Bài viết</h2>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/4 md:mr-2">
              {posts &&
                posts.map((post: post) => (
                  <PostCard key={post.url} post={post} />
                ))}
            </div>

            <div className="w-full md:w-1/4 mb-2">
              <div className="sticky top-24">
                <Aboutme />
                <Subscribe />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const tag = params.tag;
  const posts = await prisma.post.findMany({
    where: { tags: { has: tag }, active: true },
    orderBy: { created_at: 'desc' },
  });

  return {
    props: {
      tag: tag,
      posts: posts.map((post) => ({
        ...post,
        created_at: post.created_at.toISOString(),
      })),
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const tags = await prisma.post.findMany({
    distinct: ['tags'],
    select: { tags: true },
    where: {
      active: true,
    },
  });

  const paths = tags.map((tag) => ({ params: { tag: tag.tags[0] } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Tag;
