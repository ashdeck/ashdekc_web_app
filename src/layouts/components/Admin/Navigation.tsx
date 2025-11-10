"use client";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../context/hooks/Auth";
import { BiX, BiMenu } from "react-icons/bi";
import { useState } from "react";
import { GiArmorUpgrade } from "react-icons/gi";

import {
    FaPenFancy,
    FaArrowRight
} from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";

export default function Sidebar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const [go_to_dashboard, setGoToDashboard] = useState("https://chromewebstore.google.com/detail/ashdeck-website-blocker-p/ahdbmagpbepplcdlfodgilcljafooimc")

    const { handleLogout} = useAuth();
    const location = useLocation(); // Get the current location

    const nav_items = [
        {name: "Profile", logo: <IoPerson />, link: ""},
        {name: "Upgrade", logo: <GiArmorUpgrade />, link: "/upgrade"},
        {name: "Learn more", logo: <FaPenFancy/>, link: "https://www.ashdeck.com", target: "blank"} //
    ];


    return (
        <div className="md:h-screen w-full md:w-[16rem]  bg-[#eff9f1] relative md:border-r">
            <div className="px-4 flex items-center md:items-start md:flex-col border-b md:border-b-0">
                <div className="flex w-full p-4 md:justify-center flex-col gap-2">
                    <a href="/">
                        <img
                            src="/images/ashdeck-logo-2.png"
                            alt="Logo"
                            className="w-32 md:w-40 transition-all duration-300"
                        />
                    </a>

                    {/* check if extension is install and redirect there otherwise go to chrome store */}
                    <a href="https://chromewebstore.google.com/detail/ashdeck-website-blocker-p/ahdbmagpbepplcdlfodgilcljafooimc"><div className="hidden lg:block font-semibold">Go to Dashboard</div></a>
                </div>
                <div className="hidden md:flex flex-col gap-8 overflow-hidden mt-16">
                    {nav_items.map((item) => {
                        const isActive = location.pathname === item.link;
                        return (
                            <a
                                href={item.link}
                                key={item.name}
                                target={item.target ? "_blank": ""}
                                className={`flex gap-4 cursor-pointer px-2 py-2 rounded-md items-center ${
                                    isActive ? "text-black" : "text-black"
                                }`}
                            >
                                <p>{item.logo}</p>
                                <p className="font-semibold">{item.name}</p>
                            </a>
                        );
                    })}
                </div>
                {/* hamburger menu for small screens */}
                <div onClick={toggleMenu} className="md:hidden cursor-pointer z-20">
                        {isMenuOpen ? (
                        <BiX className="w-6 h-6" /> // Use className for sizing
                                ) : (
                        <BiMenu className="w-6 h-6" />
                    )}
                </div>
                <div className="hidden md:block absolute bottom-6" onClick={handleLogout}>
                    <div className="flex gap-2 items-center cursor-pointer font-semibold text-lg">
                        <p>
                            <FaArrowRight />
                        </p>
                        <p>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
