import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function SignOutButton() {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.logOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      //different approch for refetching data (validate-token api)

      showToast({ message: "Sign out successful", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
      console.log(error.message);
    },
  });

  return (
    // <button
    //   className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
    //   onClick={() => mutation.mutate()}
    // >
    //   SignOut
    // </button>

    <button
      className="hover:bg-gray-100 flex bg-white font-bold items-center text-blue-600 px-3 py-1 text-sm sm:text-base rounded hover:text-green-500"
      onClick={() => mutation.mutate()}
      data-discover="true"
    >
      SignOut
    </button>
  );
}

export default SignOutButton;
