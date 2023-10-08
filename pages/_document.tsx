import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth scroll-pt-28">
      <Head />
      <body className="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
