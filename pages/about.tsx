import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function About() {
  return (
    <>
      <SEO
        title="About Us - Asiatips.net"
        description=""
        image="https://www.Asiatips.net/card.jpg"
        url="https://Asiatips.net/about"
      />
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-24 mb-20 p-4 md:p-0">
        <div className="w-48 h-48 rounded-full overflow-hidden">
          <Image
            src="/admin.png"
            alt="Profile Picture"
            width={200}
            height={200}
          />
        </div>
        <h1 className="text-4xl font-bold mt-6"> Hung Ba </h1>
        <h2 className="text-xl text-gray-500">Kỹ sư IT, blogger</h2>
        <p className="max-w-2xl text-center text-gray-700 mt-4">
          Cảm ơn bạn đã ghé thăm blog của mình!
        </p>
        <p className="max-w-2xl text-center text-gray-700 mt-4">
          Trong trang giới thiệu này, mình sẽ đi qua một số thông tin về bản
          thân cũng như mục tiêu của trang blog. Hi vọng mọi người sẽ có một số
          thông tin hữu ích và sẽ thích thú khi đọc blog của mình hơn.
        </p>
        <p className="max-w-2xl text-center text-gray-700 mt-4">
          Mình là Hùng, sinh năm 1996, sinh ra và lớn lên tại Hà Nội. Sau khi
          hoàn thành chương trình học tại Đại học Bách khoa Hà Nội, mình đã nhận
          lời mời làm việc của một công ty IT của Nhật và đến Nhật từ năm 2019.
          Hiện nay, mình đang sinh sống và làm việc tại Chiba.
        </p>
        <p className="max-w-2xl text-center text-gray-700 mt-4">
          Mình đã ở Nhật được 4 năm, không quá dài cũng không quá ngắn. Trải qua
          nhiều niều vui và đôi khi cả những nỗi buồn khi xa quê hương. Thanh
          xuân của mình tại đất khách quê người, với ngôn ngữ, văn hóa, giao
          thông và con người khác biệt thực sự không phải là một trải nghiệm màu
          hồng. Khi mới đến Nhật, mình cảm thấy rất bỡ ngỡ, có quá nhiều thứ
          không biết và rât cần một sự hướng dẫn hoặc những thông tin hữu ích.
        </p>
        <p className="max-w-2xl text-center text-gray-700 mt-4">
          Mình thấy rằng trên mạng, có rất nhiều thông tin dành cho người Việt
          tại Nhật, nhưng có nhiều thông tin không chính xác hoặc không đầy đủ.
          Cũng có nhiều trường hợp lợi dụng sự thiếu hiều biết của mọi người để
          lừa đảo. Chính vì thế , mình quyết định viết blog này để chia sẻ những
          trải nghiệm của mình ở Nhật, cũng như chia sẻ một số mẹo nhỏ để những
          bạn lần đầu mới sang Nhật, hoặc chưa biết nhiều về Nhật có thể tham
          khảo. Hy vọng rằng blog của mình sẽ giúp ích cho mọi người.
        </p>
        <p className="max-w-2xl text-center text-gray-700 mt-4">
          Mục tiêu chính của blog này là chia sẻ kiến thức và thông tin cần
          thiết để các bạn có thể dễ dàng hòa nhập và sinh sống ở Nhật. Tất cả
          thông tin được chia sẻ trên blog của mình đều dựa trên các nguồn tham
          khảo uy tín và sẽ được trích dẫn nguồn. Nếu có bất kỳ câu hỏi hoặc
          đóng góp nào, các bạn có thể liên hệ với mình ở trang Góp ý hoặc thông
          qua các trang mạng xã hội như Facebook hay Line.
        </p>
        <p className="max-w-2xl text-center text-gray-700 mt-4">
          Cuối cùng, hãy cùng nhau trải qua một khoảng thanh xuân đẹp tại Nhật
          Bản nhé!
        </p>
        <div className="mt-10">
          <a
            href="https://twitter.com/johndoe"
            className="text-blue-500 hover:underline"
          >
            Twitter
          </a>
          <span className="mx-3 text-gray-400">•</span>
          <a
            href="https://github.com/johndoe"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
          <span className="mx-3 text-gray-400">•</span>
          <a
            href="https://linkedin.com/in/johndoe"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
