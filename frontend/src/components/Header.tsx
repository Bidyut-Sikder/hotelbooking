import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>Hotelbooking.com </Link>
        </span>
        <span className="flex space-x-2">
          <Link
            className="hover:bg-gray-100 flex bg-white font-bold
             items-center text-blue-600 px-3 hover:text-green-500"
            to={"/sign-in"}
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Header;
