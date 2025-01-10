import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignOutButton from "./SignOutButton";


function Header() {
  const { isLoggedIn } = useAppContext();


  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>Hotelbooking.com </Link>
        </span>

        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to={"/my-bookings"}>My Bookings</Link>
              <Link to={"/my-hotels"}>My Hotels</Link>
              {/* <button> Sing Out</button> */}
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                className="hover:bg-gray-100 flex bg-white font-bold
           items-center text-blue-600 px-3 hover:text-green-500"
                to={"/sign-in"}
              >
                Sign In
              </Link>
              <Link
                className="hover:bg-gray-100 flex bg-white font-bold
           items-center text-blue-600 px-3 hover:text-green-500"
                to={"/register"}
              >
                Register
              </Link>
            </>
          )}
        </span>
      </div>
    </div>
  );
}

export default Header;
