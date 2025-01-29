import { BiXCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const PaymentFailedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-50 to-pink-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center max-w-xs w-full">
        <BiXCircle className="text-red-500 text-3xl sm:text-4xl mx-auto mb-4" />
        <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          Payment Failed
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mb-6">
          We encountered an issue while processing your payment. Please try again.
        </p>
        <Link
          to="/"
          className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 text-xs sm:text-sm"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
