
export default function DeleteAccount(){
    return (
        <div className="bg-[#eff9f1] p-8 rounded">
            <h2 className="text-red-500 text-lg md:text-xl lg:text-2xl font-semibold mb-2">Deleting your account?</h2>
            <p className="text-lg">Warning: Your account with all it's data will be deleted permanently!!</p>
            <div>
                <button className="bg-red-500 p-2 w-[12rem] font-semibold text-lg text-white rounded-md mt-4">Delete Account</button>
            </div>
        </div>
    )
}