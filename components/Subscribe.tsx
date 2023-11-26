import { useState } from 'react';
import SocialMedia from './SocialMedia';
import Alert from './Alert';

export default function Subscribe() {
  const [email, setEmail] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);

  const showAlert = () => {
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      setEmail('');
      showAlert();
    } catch (error) {
      console.error('Error saving email to the database:', error);
    }
  };
  return (
    <div className={`w-full my-4`}>
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow md:m-0">
        <h3 className="mb-2 text-lg font-bold text-gray-900">
          Theo dõi bài đăng mới
        </h3>
        <hr />
        <SocialMedia />
        <h3 className="mb-2 text-lg font-bold text-gray-900">
          Nhận mail thông báo
        </h3>
        <hr />
        <div className="pt-4">
          <form className="flex flex-col md:flex-row" onSubmit={handleSubmit}>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full h-full px-4 py-3 mb-2 md:mr-2 leading-5 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="flex-shrink-0 h-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:border-transparent md:mt-0 md:ml-2"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </div>
      {alertVisible && (
        <Alert type={'success'} message={'Đăng ký thành công'} />
      )}
    </div>
  );
}
