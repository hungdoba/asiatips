import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { convert } from '@/utils/categoryToUrl';

interface Category {
  category: string;
}

export default function Navbar() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  const url = router.query['category'];

  const handleSearch = (searchTerm: string) => {
    router.push(`/search?searchTerm=${searchTerm}`);
  };

  function toggleMenu() {
    setOpenMenu(!openMenu);
  }

  useEffect(() => {
    async function getCategory() {
      const response = await fetch('/api/post/category', {
        method: 'GET',
      });
      const result: Category[] = await response.json();

      setCategories(result);
    }
    getCategory();
  }, []);

  return (
    <nav className="w-full top-0 border-b fixed backdrop-blur-sm bg-white/60 lg:bg-white/80 text-black z-10">
      <div className="w-full container mx-auto max-w-7xl flex flex-wrap items-center justify-between py-3">
        <label
          onClick={() => toggleMenu()}
          className="cursor-pointer lg:hidden block mr-4 order-2"
        >
          <svg
            className="fill-current "
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </label>

        <div className="order-1">
          <Link className="flex items-center tracking-wide" href="/">
            <Image
              width={120}
              height={240}
              src="/logo.png"
              className="mr-3 lg:h-22 lg:w-42"
              alt="Asiatips logo"
            />
          </Link>
        </div>

        <div
          className={`lg:flex lg:items-center lg:w-auto w-full order-3 ${
            !openMenu && 'hidden'
          }`}
        >
          <nav>
            <ul className="lg:flex items-center justify-between text-base pt-4 lg:pt-0 px-4">
              {categories &&
                categories.map((category) => (
                  <li key={category.category}>
                    <Link
                      className={`inline-block no-underline hover:text-green-900 py-2 md:pl-16 ${
                        url == convert(category.category) &&
                        'text-blue-600 font-bold'
                      }`}
                      href={`/${convert(category.category)}`}
                    >
                      {category.category}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  className="inline-block no-underline  hover:text-green-900 py-2 md:pl-16"
                  href="/gallery"
                >
                  Ảnh chill
                </Link>
              </li>
              <li>
                <Link
                  className="inline-block no-underline  hover:text-green-900 py-2 md:pl-16"
                  href="/about"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  className="inline-block no-underline  hover:text-green-900 py-2 md:pl-16"
                  href="/contact"
                >
                  Góp ý
                </Link>
              </li>
              <li>
                <div className="order-3 lg:order-2 flex-grow-0 md:pl-16">
                  <form className="w-full max-w-sm">
                    <div className="flex items-center border-b-2 border-blue-500 py-2">
                      <input
                        className="appearance-none bg-transparent border-none w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Gõ để tìm kiếm"
                        aria-label="Search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button
                        className="flex-shrink-0 bg-blue-700 hover:bg-blue-600 border-blue-700 hover:border-blue-600 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                        onClick={() => handleSearch(searchTerm)}
                      >
                        Tìm kiếm
                      </button>
                    </div>
                  </form>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
}
