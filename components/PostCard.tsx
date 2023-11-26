import Link from 'next/link';
import Image from 'next/image';
import Tags from './Tags';
import { post } from '@prisma/client';
import { convert } from '@/utils/categoryToUrl';

const Card: React.FC<{ post: post }> = ({ post }) => {
  return (
    <Link
      className="w-full"
      href={`/${convert(post.category)}/${post.url}`}
      key={post.url}
    >
      <div className="flex items-stretch w-full mb-2 p-2 md:p-6 bg-white rounded-lg hover:shadow border border-gray-200">
        <div className="w-1/3 max-h-fit">
          <Image
            src={post.image}
            alt="Post Image"
            className="w-full h-full rounded-lg object-cover object-center"
            height={200}
            width={300}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="flex flex-col justify-around w-2/3 pl-6">
          <h5 className="mb-2 md:text-xl md:font-bold text-gray-900">
            {post.title}
          </h5>
          <p className="hidden md:block font-normal text-gray-700 mb-2">
            {post.brief}
          </p>
          <p className="font-semibold text-gray-500 text-sm mb-2">
            {new Date(post.created_at).toLocaleDateString('vi-VN', {
              timeZone: 'Asia/Ho_Chi_Minh',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <Tags
            highline={null}
            initTags={post.tags}
            category={null}
            isClickable={false}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
