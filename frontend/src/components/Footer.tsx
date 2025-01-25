const Footer = () => {
  return (
    // <div className="bg-blue-800 py-10">
    //   <div className="container mx-auto flex justify-between items-center">
    //     <span className="text-3xl text-white font-bold tracking-tight">
    //       holelbooking.com
    //     </span>
    //     <span className="text-white font-bold tracking-tight flex gap-4">
    //       <p className="cursor-pointer">Privacy Policy </p>
    //       <p className="cursor-pointer">Terms of Service</p>
    //     </span>
    //   </div>
    // </div>

    <div className="bg-blue-800 py-6">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
        <span className="text-xl text-white font-bold tracking-tight text-center sm:text-3xl">
          holelbooking.com
        </span>
        <span className="text-white font-bold tracking-tight flex flex-col gap-2 sm:flex-row sm:gap-4">
          <p className="cursor-pointer text-center sm:text-left">
            Privacy Policy
          </p>
          <p className="cursor-pointer text-center sm:text-left">
            Terms of Service
          </p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
