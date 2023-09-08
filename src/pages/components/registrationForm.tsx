export default function RegistrationForm() {
    return (
        <div className="p-4 border rounded-md grid grid-cols-[1fr,2.5fr,1fr]">
            <div></div>
            <form className="">
                <div className="mb-6 flex gap-4 items-baseline">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-90 min-w-[7em]">Your email</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-6 flex gap-4 items-baseline">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-90 min-w-[7em]">Your password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="mb-3 flex gap-4 items-baseline">
                    <label className="block mb-2 text-sm font-medium text-gray-90 min-w-[7em]">Date</label>
                    <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Select a date" />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            <div></div>
        </div>
    )
}