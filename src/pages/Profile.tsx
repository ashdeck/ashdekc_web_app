import { useState } from "react";
import Layout from "../layouts/AdminLayout";
import ProfileNavigation from "./components/Profile/Navigation";
import { currentPage } from "./components/Profile/Navigation";
import Info from "./components/Profile/Info";
import DeleteAccount from "./components/Profile/DeleteAccount";
import ChangePassword from "./components/Profile/ChangePassword";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

export default function Profile() {
    const [current_page, setCurrentPage] = useState<currentPage>({key: "info", name: "Info"});
    // Safely get and parse user info from localStorage
    const userString = localStorage.getItem("user");
    const user_info: UserInfo | null = userString ? JSON.parse(userString) : null;

    if (!user_info) {
        return <div className="p-4 text-gray-500">Loading...</div>;
    }

    const ui_mapping = {
        info: <Info info={user_info} />,
        delete_account: <DeleteAccount />,
        change_password: <ChangePassword />
    };

    const handle_nav_toggle = (nav: currentPage) => {
        setCurrentPage(nav);
    };

    return (
        <div className="">
            <Layout title="Profile">
                <div className="px-4 mb-8">
                    <ProfileNavigation 
                        handle_click={handle_nav_toggle} 
                        current_page={current_page}  
                    />
                    <div className="mt-4 shadow rounded-md">
                        {ui_mapping[current_page.key as keyof typeof ui_mapping]}
                    </div>
                </div>
            </Layout>
        </div>
    );
}