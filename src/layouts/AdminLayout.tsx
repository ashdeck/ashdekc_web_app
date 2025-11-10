import Sidebar from "./components/Admin/Navigation";

interface LayoutProps {
    children: React.ReactNode;
    title?: string
}



export default function Layout({children, title}: LayoutProps) {
    return (
            <div className="flex-col flex md:flex-row gap-4 md:gap-0 bg-white w-full h-screen md:overflow-hidden">
                <Sidebar />
                <div className="w-full relative">
                    <div className="max-w-[800px] mx-auto">
                        <div className="flex justify-between px-4 md:pt-4 lg:mt-0">
                            {title && <h3 className="text-xl lg:text-2xl font-semibold">{title}</h3>}
                        </div>
                        <div className="">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
    );
}
