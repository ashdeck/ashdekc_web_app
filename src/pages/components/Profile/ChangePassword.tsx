
export default function ChangePassword(){
    return (
        <div className="bg-[#eff9f1] p-8 rounded">
            <form action="">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-semibold">Old Password</label>
                        <input type="text" name="old_password" placeholder="Old password" className="border p-2 rounded border-black/50" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-semibold">New Password</label>
                        <input disabled type="password" name="new_password" placeholder="New Password" className="border p-2 rounded  border-black/50" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-semibold">Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" name="confirm_new_password" className={`border p-2 rounded  border-black/50`} />
                    </div>

                    <div>
                        <button className="bg-green-500 p-2 w-[12rem] font-semibold text-lg text-white rounded-md">Save</button>
                    </div>
                </div>
            </form>
        </div>
    )
}