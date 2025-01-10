// import React, { useState } from "react";
// import Toast from "../components/Toast";
// import { useQuery } from "react-query";
// import { verifyToken } from "../api-client";

// type ToastMessage = {
//   type: "SUCCESS" | "ERROR";
//   message: string;
// };

// type AppContext = {
//   showToast: (toastMessage: ToastMessage) => void;
//   isLoggedIn: boolean;
// };

// const AppContext = React.createContext<AppContext | undefined>(undefined);

// export const AppContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
//   const { isError } = useQuery("validateToken", verifyToken, {
//     retry: false,
//   });
//   return (
//     <AppContext.Provider
//       value={{
//         showToast: (toastMessage) => {
//           setToast(toastMessage);
//         },
//         isLoggedIn: !isError,
//       }}
//     >
//       {toast && (
//         <Toast
//           type={toast.type}
//           message={toast.message}
//           onClose={() => setToast(undefined)}
//         />
//       )}

//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   const context = React.useContext(AppContext);
//   return context as AppContext;
// };

import React, { useState, useCallback } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import { verifyToken } from "../api-client";

type ToastMessage = {
  type: "SUCCESS" | "ERROR";
  message: string;
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  refreshAuth: () => void; // Function to trigger token revalidation
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const { data, isError, refetch } = useQuery("validateToken", verifyToken, {
    retry: false,
    refetchOnWindowFocus: false, // Optional: Prevent revalidation on window focus
  });

  // Method to trigger revalidation
  const refreshAuth = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError && !!data, // Ensure both error and data are considered
        refreshAuth,
      }}
    >
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(undefined)}
        />
      )}

      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  return context as AppContext;
};
