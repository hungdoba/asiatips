import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Footer() {
  const { data: session, status } = useSession();
  let isAdmin = status === 'authenticated';
  return (
    <footer className="container max-w-7xl mx-auto bg-white py-8 border-t border-gray-400 ">
      <div className="flex">
        <div className="w-full mx-auto flex">
          <div className="flex w-1/2">
            <div className="px-3 md:px-0">
              <h3 className="font-bold text-blue-800 text-lg">Asiatips.net</h3>
              {isAdmin ? (
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="text-red-600 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Đăng xuất
                </button>
              ) : (
                <Link
                  className="py-3 pl-0 mr-20 md:mr-0 md:pr-0 inline-block no-underline hover:text-black hover:underline"
                  href="/login"
                >
                  Đăng nhập
                </Link>
              )}
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => (window.location.href = '/markdown')}
                  className="text-red-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Viết bài
                </button>
              )}
              <p>All rights reserved</p>
            </div>
          </div>
          <div className="flex w-1/2 text-right">
            <div className="px-3 md:px-0 ml-auto">
              <h3 className="font-bold text-blue-800"> Đường dẫn</h3>
              <Link
                className="py-3 inline-block no-underline hover:text-black hover:underline"
                href="/about"
              >
                Giới thiệu
              </Link>
              <p>Copyright: 2023</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
