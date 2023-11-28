import { prisma } from '@/db';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});
import 'easymde/dist/easymde.min.css';
import EasyMDE from 'easymde';
import MarkdownControl from '@/components/overview/MarkdownControl';
import { ArticleInfoType } from '@/utils/types';

export const getStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: {
      url: true,
    },
    where: {
      active: true,
    },
  });

  const paths = posts.map((post) => ({ params: { url: post.url } }));
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
    select: {
      title: true,
      category: true,
      url: true,
      tags: true,
      brief: true,
      image: true,
      markdown: true,
      tableOfContents: true,
      active: true,
    },
  });

  return {
    props: {
      post: post,
    },
  };
};

export default function MarkdownUpdate({ post }) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  const router = useRouter();
  const [markdown, setMarkdown] = useState(post.markdown);

  const handleMarkdownChange = (value: string) => {
    setMarkdown(value);
  };

  const handleImageUpload = async (file: any, onSuccess: any, onError: any) => {
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);

    const res = await fetch(
      `/api/upload-aws?file=${filename}&fileType=${fileType}`
    );
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      console.log('Uploaded successfully!');
      const finalImageUrl = `${url}/${fields.key}`;
      console.log('Final Uploaded Image URL:', finalImageUrl);
      onSuccess(finalImageUrl);
    } else {
      console.error('Upload failed.');
    }
  };

  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: true,
      lineNumbers: true,
      uploadImage: true,
      imageUploadFunction: handleImageUpload,
    } as EasyMDE.Options;
  }, []);

  const [articleInformation, setInformation] = useState<ArticleInfoType>({
    title: post.title,
    category: post.category,
    url: post.url,
    imageUrl: post.image,
    tags: post.tags,
    brief: post.brief,
    tableOfContent: post.tableOfContents,
    active: post.active,
  });

  const handleInformationChange = (newInformation: ArticleInfoType) => {
    setInformation(newInformation);
  };

  return (
    <div className="container mx-auto w-full md:max-w-7xl mt-4">
      <div className="flex flex-row mx-8">
        <div className="w-3/4 prose-lg pr-4">
          {articleInformation.imageUrl && (
            <Image
              className="w-full rounded-xl"
              height={1000}
              width={800}
              src={articleInformation.imageUrl}
              alt="Article Image"
            />
          )}
          <h1 className="text-4xl font-bold my-4">
            {articleInformation.title}
          </h1>
          <SimpleMdeReact
            value={markdown}
            onChange={handleMarkdownChange}
            options={options}
          />
        </div>
        <div className="w-1/4">
          <MarkdownControl
            articleInformation={articleInformation}
            markdownContent={markdown}
            onInformationChange={handleInformationChange}
            isUpdateMode={true}
          />
        </div>
      </div>
    </div>
  );
}
