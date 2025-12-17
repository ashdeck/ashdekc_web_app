import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {CreateUserAccountOfficeX as SignupData} from "../../types/Auth"
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Background from "../../components/common/Background";
import { BsGoogle } from "react-icons/bs";
import { create_account_office_x } from "../../api/authentication";
import { google_init_auth } from "../../api/authentication";
import { AxiosError } from "axios";


const SignupOfficeX = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<SignupData>();
    const [showPassword, setShowPassword] = useState(false)
    const redirect_url = window.location.origin+"/verification_success"
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get("email") || ""
    const officeXID = urlParams.get("officex_customer_id") || ""


    const onSubmit = async (data: SignupData) => {
        data.redirect_url = redirect_url
        data.office_x_id = officeXID
        try {

            await create_account_office_x(data);
            navigate(redirect_url)
            toast.success("Your account has been created successfully. Check your email address for instructions to use Ashdeck.")
            navigate("/signup_success");
        } catch (error) {
            console.log(error, "office x error")
            toast.error("User with this email or office x ID already exists");
        }
    };

    const handle_init_google_auth = async () => {
        try {
            const res = await google_init_auth(redirect_url);
            console.log(res, "resist");
            // Opens in new tab
            window.open(res.url, 'noopener,noreferrer');
        } catch (error) {
            console.error(error);
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
                            <h1 className="font-semibold text-base lg:text-2xl text-center pl-4">Signup</h1>
                            {/* <p className="font-bold text-center uppercase text-lg">Login</p> */}
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-2 flex flex-col gap-8 w-[16rem] sm:w-[20rem] lg:w-[24rem]">
                                <div className="w-full">
                                    <input
                                        type="text"
                                        className="rounded-md py-2 w-full text-black px-2 outline-none bg-transparent border active:bg-transparent"
                                        placeholder="Name"
                                        {...register("name", { required: true })}
                                    />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        defaultValue={email || ""}
                                        className="rounded-md py-2 w-full text-black/50 px-2 outline-none bg-transparent border active:bg-transparent"
                                        placeholder="Email"
                                        {...register("email", { required: true, pattern: /^\S+@\S+$/ })}
                                    />
                                </div>
                                <div className="flex justify-between items-center rounded-md py-2 px-2 outline-none bg-transparent border">
                                    <input
                                        className="outline-none bg-transparent active:bg-transparent text-black"
                                        type={!showPassword ? "password": "text"}
                                        placeholder="Password"
                                        {...register("password", { required: true })}
                                    />
                                    <div className="text-black" onClick={()=>setShowPassword(!showPassword)} >{!showPassword ? <FaEyeSlash /> : <FaEye />}</div>
                                </div>
                            </div>
                            <button type="submit" className="mt-4 text-white bg-green-500 rounded py-2 px-2 outline-none focus:outline-none active:outline-none w-full">Signup</button>
                            {/* <Button type="submit" text="Login" styling="px-6 py-2" /> */}
                        </form>

                        <div className="mb-2 flex justify-between w-full">
                                <a href="/forgot_password">
                                    <p className=" text-black font-semibold cursor-pointer text-sm lg:text-base hover:transition-all hover:text-black/60">Forgot password?</p>
                                </a>
                                <a href="/login">
                                    <p className=" text-black font-semibold cursor-pointer text-sm lg:text-base hover:transition-all hover:text-black/60">Login</p>
                                </a>
                        </div>

                        <button onClick={handle_init_google_auth} type="submit" className="mt-4 hidden text-black hover:transition-all hover:border-black/60 hover:text-black/60 bg-transparent border border-black rounded-3xl py-2 px-2 outline-none focus:outline-none active:outline-none w-full"><div className="flex gap-2 items-center justify-center"><div><BsGoogle /> </div><p>Continue with Google</p></div></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupOfficeX;
