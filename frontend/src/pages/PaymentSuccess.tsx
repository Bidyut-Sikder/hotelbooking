

import { BiCheckCircle } from "react-icons/bi";

const PaymentSuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-lg">
        <BiCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your payment. We appreciate your trust in us.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
