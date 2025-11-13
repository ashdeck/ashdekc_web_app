import { IoCheckmarkCircleOutline } from "react-icons/io5";

const SignupSuccess = () => {
  const redirect_url =
    "https://chromewebstore.google.com/detail/ashdeck/ahdbmagpbepplcdlfodgilcljafooimc";

  return (
    <div className="bg-white flex items-center justify-center h-screen flex-col gap-6 text-center px-4">
      <IoCheckmarkCircleOutline className="text-green-500 text-[6rem]" />
      <h1 className="text-2xl font-semibold text-black">
        Account Created Successfully!
      </h1>
      <p className="text-gray-600 max-w-md">
        Your Ashdeck account has been created successfully. Click below to
        install or use Ashdeck.
      </p>
      <button
        onClick={() => (window.location.href = redirect_url)}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all"
      >
        Go to Ashdeck
      </button>
    </div>
  );
};

export default SignupSuccess;
