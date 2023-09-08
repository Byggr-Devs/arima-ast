export default function TrackingForm() {
    return (
        <div className="p-4 flex gap-4 flex-col">
            <form className="grid grid-cols-3 gap-2">
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-90">Your email</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-90">Your password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-90">Date</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-90">Your password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-90">Date</label>
                    <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Select a date" />
                </div>
                <div></div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            <div>
                {Table([{ name: "Apple MacBook Pro 17", color: "silver", category: "laptop", price: "299rs" }, { name: "Apple MacBook Pro 1i", color: "gold", category: "laptop", price: "239rs" }])}
            </div>
        </div>
    )
}

const Table = (data: any) => {
    return (
        <>
            <div className="relative overflow-x-auto mt-10">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: { name: string; category: string; price: string; color: string; }) =>
                            <tr className="bg-white border-b" key={item.name}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    {item.name}
                                </th>
                                <td className="px-6 py-4">
                                    {item.color}
                                </td>
                                <td className="px-6 py-4">
                                    {item.category}
                                </td>
                                <td className="px-6 py-4">
                                    {item.price}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </>
    )
}