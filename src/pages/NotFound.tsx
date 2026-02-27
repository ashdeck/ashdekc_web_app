import { useNavigate } from "react-router-dom";
import Background from "../components/common/Background";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <Background background={"/images/9.jpg"} />

      <div className="flex flex-col justify-center xl:flex-row items-center h-screen">
        <div className="bg-primary h-full w-[30%] flex items-center justify-center">
          <div className="flex flex-col justify-center items-center h-1/2 gap-6 text-center">
            
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-5xl font-bold text-black">404</h1>
              <p className="text-black text-lg font-semibold">
                Page Not Found
              </p>
              <p className="text-black/70 text-base font-medium max-w-xs">
                The page you are looking for does not exist or may have been moved.
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-4 text-white bg-green-500 rounded py-2 px-6 outline-none focus:outline-none active:outline-none hover:bg-green-600 transition-all"
            >
              Go Back Home
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;