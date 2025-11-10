import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {ResetPassword as ResetPasswordData} from "../../types/Auth"
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Background from "../../components/common/Background";
import { reset_password } from "../../api/authentication";

const ResetPassword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<ResetPasswordData>();
    const [showPassword, setShowPassword] = useState(false)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("token") || ""

    const onSubmit = async (data: ResetPasswordData) => {
        try {
            await reset_password(data, token);
            navigate("/login");
        } catch (error) {
            console.log(error)
            toast.error("Reset password failed!");
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
                            <h1 className="font-semibold text-2xl text-center pl-4">Reset</h1>
                            {/* <p className="font-bold text-center uppercase text-lg">Login</p> */}
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-2 flex flex-col gap-8 w-[16rem] sm:w-[20rem] lg:w-[24rem]">
                                <div className="w-full">
                                    <input
                                        className="w-full text-black flex justify-between items-center rounded-md py-2 px-2 outline-none bg-transparent border"
                                        type="text"
                                        placeholder="Password"
                                        {...register("password", { required: true })}
                                    />
                                </div>
                                <div className="flex justify-between items-center rounded-md py-2 px-2 outline-none bg-transparent border">
                                    <input
                                        className="outline-none bg-transparent active:bg-transparent text-black"
                                        type={!showPassword ? "password": "text"}
                                        placeholder="Confirm Password"
                                        {...register("confirm_password", { required: true })}
                                    />
                                <div className="text-black" onClick={()=>setShowPassword(!showPassword)} >{!showPassword ? <FaEyeSlash /> : <FaEye />}</div>
                                </div>
                            </div>
                            <button type="submit" className="mt-4 text-white bg-green-500 rounded py-2 px-2 outline-none focus:outline-none active:outline-none w-full">Reset</button>
                            {/* <Button type="submit" text="Login" styling="px-6 py-2" /> */}
                        </form>

                        <div className="mb-2 flex justify-between w-full">
                                <a href="/signup">
                                    <p className=" text-black font-semibold cursor-pointer text-sm lg:text-lg hover:transition-all hover:text-black/60">Sign up</p>
                                </a>
                                <a href="/login">
                                    <p className=" text-black font-semibold cursor-pointer text-sm lg:text-lg hover:transition-all hover:text-black/60">Login</p>
                                </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
