import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { convert } from '@/utils/categoryToUrl';
import { ArticleInfoType } from '@/utils/types';
import { ChangeEvent, useRef, useState } from 'react';

export default function MarkdownControl({
  articleInformation,
  markdownContent,
  onInformationChange,
  isUpdateMode,
}) {
  const [information, setInformation] = useState<ArticleInfoType>({
    title: articleInformation.title,
    category: articleInformation.category || 'Du lịch',
    url: articleInformation.url,
    imageUrl: articleInformation.imageUrl,
    tags: articleInformation.tags || 'aichi,du-lich',
    brief: articleInformation.brief,
    tableOfContent: articleInformation.tableOfContent,
    active: articleInformation.active,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    let newInformation = {
      ...information,
      [fieldName]: event.target.value,
    };

    if (fieldName == 'title') {
      let url = convert(event.target.value);

      newInformation = {
        ...newInformation,
        ['url']: url,
      };
    }
    setInformation(newInformation);
    onInformationChange(newInformation);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
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
        const newInformation = {
          ...information,
          ['imageUrl']: finalImageUrl,
        };
        setInformation(newInformation);
        onInformationChange(newInformation);
      } else {
        alert('Upload failed.');
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const autoCreateTableOfContent = () => {
    const headings = markdownContent.match(/^(#+)(.*)/gm);

    if (!headings || headings.length === 0) {
      return 'No headings found.';
    }

    let toc = '';

    headings.forEach(
      (heading: {
        match: (arg0: RegExp) => (string | any[])[];
        replace: (arg0: RegExp, arg1: string) => any;
      }) => {
        const level = heading.match(/^#+/)[0].length;
        const text = heading.replace(/^#+\s*/, '');
        const slug = text.toLowerCase().replace(/\s+/g, '-').replace('.', '');

        toc += `${'  '.repeat(level - 1)}- [${text}](#${slug})\n`;
      }
    );

    const newInformation = {
      ...information,
      ['tableOfContent']: toc,
    };
    setInformation(newInformation);
    // onInformationChange(newInformation);
  };

  const createArticle = async () => {
    if (information.imageUrl == undefined || information.imageUrl == '') {
      alert('There are no image');
      return;
    }

    const formData = new FormData();
    formData.append('url', information.url);
    formData.append('category', information.category);
    formData.append('tags', information.tags);
    formData.append('title', information.title);
    formData.append('brief', information.brief);
    formData.append('markdown', markdownContent);
    formData.append('tableOfContent', information.tableOfContent);
    formData.append('image', information.imageUrl);
    formData.append('active', information.active);

    let method = isUpdateMode ? 'PUT' : 'POST';

    const response = await fetch('/api/post/create', {
      method: method,
      body: formData,
    });
    const result = await response.json();

    if (!response.ok) {
      alert(`Error: ${result.message}`);
      return;
    }

    if (isUpdateMode) {
      alert('Updated');
      return;
    } else {
      window.open(
        `${convert(information.category)}/${information.url}`,
        '_blank'
      );
    }

    setInformation({
      title: '',
      category: '',
      url: '',
      imageUrl: '',
      tags: 'tips, share',
      brief: '',
      tableOfContent: '',
      active: 'true',
    });
  };

  function handleCheckboxChange(event: { target: { checked: any } }) {
    const isChecked = event.target.checked;
    const newInformation = {
      ...information,
      ['active']: isChecked,
    };
    setInformation(newInformation);
    // onInformationChange(newInformation);
  }

  return (
    <div className="sticky border top-4 rounded-lg p-4">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Tiêu đề
        </label>
        <input
          type="text"
          value={information.title}
          onChange={(e) => handleInputChange(e, 'title')}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder=""
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="url"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Url
        </label>
        <input
          type="text"
          value={information.url}
          onChange={(e) => handleInputChange(e, 'url')}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="image"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Ảnh bìa
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-4">
              <svg
                className="w-8 h-8  text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">
                  {information.imageUrl == '' ? (
                    'Click to upload'
                  ) : (
                    <Link href={information.imageUrl} target="_blank">
                      Uploaded
                    </Link>
                  )}
                </span>
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleUploadFile}
              ref={fileInputRef}
            />
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="tags"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Chủ đề
        </label>
        <input
          type="text"
          value={information.category}
          onChange={(e) => handleInputChange(e, 'category')}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="online-tool"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="tags"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Tags
        </label>
        <input
          type="text"
          value={information.tags}
          onChange={(e) => handleInputChange(e, 'tags')}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="tips, sharing"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="discription"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Mô tả
        </label>
        <textarea
          value={information.brief}
          onChange={(e) => handleInputChange(e, 'brief')}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Mô tả"
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="table-of-content"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Mục lục
        </label>
        <textarea
          value={information.tableOfContent}
          onChange={(e) => handleInputChange(e, 'tableOfContent')}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Mục lục"
        ></textarea>
      </div>

      <button
        type="button"
        onClick={autoCreateTableOfContent}
        className="w-full py-2.5 px-5 mr-2 mb-4 text-sm font-medium text-gray-900 focus:outline-none bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
      >
        Tạo mục lục tự động
      </button>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={!!information.active}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label
          htmlFor="default-checkbox"
          className="ml-2 text-sm font-medium text-gray-900"
        >
          Hiển thị bài viết
        </label>
      </div>

      <button
        type="button"
        onClick={createArticle}
        className="w-full mb-2 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        {isUpdateMode ? 'Cập nhật bài viết' : 'Đăng  bài'}
      </button>

      <button
        type="button"
        onClick={() => (window.location.href = '/')}
        className="w-full mb-2 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Trang chủ
      </button>

      <button
        type="button"
        onClick={() => signOut()}
        className="w-full mb-2 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Đăng xuất
      </button>
    </div>
  );
}
