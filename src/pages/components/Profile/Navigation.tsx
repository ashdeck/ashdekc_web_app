export type currentPage = {
    name: string,
    key: string
}

interface NavProps {
    current_page: currentPage,
    handle_click: (item: currentPage) => void;  // Now accepts a string parameter
}


export default function ProfileNavigation({ handle_click, current_page }: NavProps) {
    const items = [
        { key: "info", name: "Info" },
        { key: "change_password", name: "Change Password" }, 
        { key: "delete_account", name: "Delete Account" }
    ];

    return (
        <div className="flex justify-between mt-4">
            {items.map(item => (
                <div 
                    onClick={() => handle_click(item)}
                    className={`
                        relative
                        sm:text-lg 

                        cursor-pointer 
                        px-2 
                        pb-1
                        transition-all 
                        duration-300
                        ease-in-out
                        after:content-['']
                        after:absolute
                        after:bottom-0
                        after:left-0
                        after:w-full
                        after:h-[3px]
                        after:bg-green-500
                        after:scale-x-0
                        after:origin-left
                        after:transition-all
                        after:duration-300
                        ${current_page.key === item.key ? 'after:scale-x-100' : 'hover:after:scale-x-0'}
                    `}
                    key={item.key}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
}