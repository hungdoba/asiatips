import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { post, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function Create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const promise = new Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
  }>((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const { fields, files } = await promise;
  let post: post = {
    url: fields.url,
    category: fields.category,
    markdown: fields.markdown,
    tableOfContents: fields.tableOfContent,
    tags: fields.tags.split(','),
    title: fields.title,
    brief: fields.brief,
    image: fields.image,
    created_at: new Date(),
    active: fields.active == 'true' ? true : false,
  };

  // Create new post
  if (req.method === 'POST') {
    // Validate is url exist
    try {
      const searchResults = await prisma.post.findMany({
        where: {
          url: fields.url as string,
        },
      });
      // Url exist
      if (searchResults.length > 0) {
        return res.status(500).json({ message: 'Url exist' });
      }

      try {
        const newPost = await prisma.post.create({ data: post });
        res.status(200).json(newPost);
      } catch (error) {
        res.status(500).json({ message: error });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  // Update post
  else if (req.method === 'PUT') {
    try {
      const updatedPost = await prisma.post.update({
        where: { url: fields.url },
        data: post,
      });
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(404).json({ message: 'API endpoint not found' });
  }
}
