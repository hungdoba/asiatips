import Link from 'next/link';
import Image from 'next/image';

export default function Aboutme() {
  return (
    <div className="w-full mb-2">
      <div className="bg-white border border-gray-200 rounded-lg shadow md:m-0">
        <div className="flex flex-col items-center py-8">
          <Image
            className="mr-4 w-16 h-16 rounded-full"
            height={100}
            width={100}
            src="/admin.png"
            alt="Admin logo"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 ">
            Nguyễn Thái Bình
          </h5>
          <span className="text-sm text-gray-500 mb-2">
            Người thích chia sẻ
          </span>
          <span className="text-sm text-gray-500 ">
            Đã từng là du học sinh, 4 năm sống ở Nhật
          </span>
          <span className="text-sm text-gray-500">
            Đang là kỹ sư cho một công ty IT
          </span>
          <span className="mb-2 text-sm text-gray-500">
            Đam mê chạy bộ, thích đọc sách và viết lách
          </span>
          <span className="text-sm text-gray-500">
            Chào mừng đến với Blog của mình!
          </span>
          <span className="text-sm text-gray-500">
            Nơi sẻ chia những mẹo hữu ích tại Nhật
          </span>
          <span className="text-sm text-gray-500"></span>
          <div className="flex space-x-3 mt-4">
            <Link
              href="/about"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Đọc thêm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
