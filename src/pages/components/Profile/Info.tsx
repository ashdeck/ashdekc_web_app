type userInfo = {
    name: string,
    email: string,
    full_name?: string
}

interface userInformation {
    info: userInfo
}

export default function Info({info}: userInformation){
    return (
        <div className="bg-[#eff9f1] p-8 rounded">
            <form action="">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-semibold">Display Name</label>
                        <input type="text" placeholder={info.name} className="border p-2 rounded placeholder:text-black border-black/50" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-semibold">Email</label>
                        <input disabled type="text" placeholder={info.email} className="border p-2 rounded placeholder:text-black border-black/50" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-semibold">Full Name</label>
                        <input type="text" placeholder={info.full_name ? info.full_name: "Full Name"} className={`border p-2 rounded ${info.full_name && "placeholder:text-black"} border-black/50`} />
                    </div>

                    <div>
                        <button className="bg-green-500 p-2 w-[12rem] font-semibold text-lg text-white rounded-md">Save</button>
                    </div>
                </div>
            </form>
        </div>
    )
}