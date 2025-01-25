import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignOutButton from "./SignOutButton";

function Header() {
  const { isLoggedIn } = useAppContext();

  return (
    // <div className="bg-blue-800 py-6">
    //   <div className="container mx-auto flex justify-between">
    //     <span className="text-3xl text-white font-bold tracking-tight">
    //       <Link to={"/"}>Hotelbooking.com </Link>
    //     </span>

    //     <span className="flex space-x-2">
    //       {isLoggedIn ? (
    //         <>
    //           <Link
    //             className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
    //             to={"/my-bookings"}
    //           >
    //             My Bookings
    //           </Link>
    //           <Link
    //             className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
    //             to={"/my-hotels"}
    //           >
    //             My Hotels
    //           </Link>
    //           {/* <button> Sing Out</button> */}
    //           <SignOutButton />
    //         </>
    //       ) : (
    //         <>
    //           <Link
    //             className="hover:bg-gray-100 flex bg-white font-bold
    //        items-center text-blue-600 px-3 hover:text-green-500"
    //             to={"/sign-in"}
    //           >
    //             Sign In
    //           </Link>
    //           <Link
    //             className="hover:bg-gray-100 flex bg-white font-bold
    //        items-center text-blue-600 px-3 hover:text-green-500"
    //             to={"/register"}
    //           >
    //             Register
    //           </Link>
    //         </>
    //       )}
    //     </span>
    //   </div>
    // </div>

    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4 sm:px-6">
        <span className="text-2xl sm:text-3xl text-white font-bold tracking-tight">
          <Link to="/" data-discover="true">
            Hotelbooking.com
          </Link>
        </span>
        <div className="flex flex-wrap space-x-2 mt-2 sm:mt-0">
          {isLoggedIn ? (
            <>
              <Link
                to={"/my-bookings"}
                className="hover:bg-gray-100 flex bg-white font-bold items-center text-blue-600 px-3 py-1 text-sm sm:text-base rounded hover:text-green-500"
                data-discover="true"
              >
                My Bookings
              </Link>
              <Link
                to={"/my-hotels"}
                className="hover:bg-gray-100 flex bg-white font-bold items-center text-blue-600 px-3 py-1 text-sm sm:text-base rounded hover:text-green-500"
                data-discover="true"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                to={"/sign-in"}
                className="hover:bg-gray-100 flex bg-white font-bold items-center text-blue-600 px-3 py-1 text-sm sm:text-base rounded hover:text-green-500"
                data-discover="true"
              >
                Sign In
              </Link>
              <Link
                to={"/register"}
                className="hover:bg-gray-100 flex bg-white font-bold items-center text-blue-600 px-3 py-1 text-sm sm:text-base rounded hover:text-green-500"
                data-discover="true"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
