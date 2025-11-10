import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ResetPasswordRequest } from "../../types/Auth";
import Background from "../../components/common/Background";
import { request_password_reset } from "../../api/authentication";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<ResetPasswordRequest>();

    const onSubmit = async (data: ResetPasswordRequest) => {
        data.redirect_url = window.location.origin+"/reset_password"
        try {
            await request_password_reset(data);
            navigate("/login");
        } catch (error) {
            console.log(error)
            toast.error("Error resetting password. Please try again later.");
        }
    };

    return (
        <div className="bg-white">
            <Background background={"/images/9.jpg"} />
            <div className="flex flex-col justify-center xl:flex-row items-center h-screen">
                <div className="bg-primary h-full w-[30%] flex items-center justify-center">
                    <div className="flex flex-col justify-center items-center h-1/2  gap-4">
                        <div className="text-black max-w-72 mb-8 flex justify-center items-center">
                            <div className="h-full flex items-center pr-4 justify-center border-r border-black">
                                <img width={100} src="/images/ashdeck-logo-2.png" alt="New ink gallery logo" />
                            </div>
                            <h1 className="font-semibold text-2xl text-center pl-4">Forgot Password</h1>
                            {/* <p className="font-bold text-center uppercase text-lg">Login</p> */}
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-2 flex flex-col gap-8 w-[16rem] sm:w-[20rem] lg:w-[24rem]">
                                <div className="w-full">
                                    <input
                                        type="text"
                                        className="rounded-md py-2 w-full text-black px-2 outline-none bg-transparent border active:bg-transparent"
                                        placeholder="Email"
                                        {...register("email", { required: true, pattern: /^\S+@\S+$/ })}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="mt-4 text-white bg-green-500 rounded py-2 px-2 outline-none focus:outline-none active:outline-none w-full">Request</button>
                            {/* <Button type="submit" text="Login" styling="px-6 py-2" /> */}
                        </form>

                        <div className="mb-2 flex justify-between w-full">
                                <a href="/login">
                                    <p className=" text-black font-semibold cursor-pointer text-sm lg:text-lg hover:transition-all hover:text-black/60">Login</p>
                                </a>
                                <a href="/signup">
                                    <p className=" text-black font-semibold cursor-pointer text-sm lg:text-lg hover:transition-all hover:text-black/60">Signup</p>
                                </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
