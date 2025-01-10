import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";

function SignOutButton() {
  const { showToast, refreshAuth } = useAppContext();
  const mutation = useMutation(apiClient.logOut, {
    onSuccess: () => {
      console.log("Sign out successful");
      showToast({ message: "Sign out successful", type: "SUCCESS" });
      refreshAuth();
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
      console.log(error.message);
    },
  });

  return (
    <button
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
      onClick={() => mutation.mutate()}
    >
      SignOut
    </button>
  );
}

export default SignOutButton;
