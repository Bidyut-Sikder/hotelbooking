import { BiCheckCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const PaymentSuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center max-w-xs w-full">
        <BiCheckCircle className="text-green-500 text-3xl sm:text-4xl mx-auto mb-4" />
        <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mb-6">
          Thank you for your payment. We appreciate your trust in us.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-xs sm:text-sm"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
