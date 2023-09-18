import { useEffect, useState } from "react";
import { getTrackings } from "../../api/tracking";

interface Entry {
    id: string;
    vehicleNumber: string;
    vehicleModel: string;
    waitingStageStatus: string;
    stageOneStatus: string;
    stageTwoStatus: string;
    stageThreeStatus: string;
    waterWashStageStatus: string;
    estimatedDeliveryTimestamp: string;
}

export default function TrackingForm() {
    const [trackings, setTrackings] = useState<Entry[]>([]);


    useEffect(() => {
        getTrackings().then((res) => {
            console.log("res", res);
            setTrackings(res);
        }
        );
    }
        , []);

    return (
        <div className="p-4 flex gap-4 flex-col">
            <form className="grid grid-cols-7 gap-2">
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
                <div></div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            <div>
                {Table(trackings)}
            </div>
        </div>
    )
}

const Table = (entries: Entry[]) => {
    return (
        <>
            <div className="relative overflow-x-auto mt-10">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                SNo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Vehicle Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Model
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Progress Of Service
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Estimated Time Of Delivery
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((item, idx) =>
                            <tr className="bg-white border-b" key={item.id}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    {idx}
                                </th>
                                <td className="px-6 py-4">
                                    {item.vehicleNumber}
                                </td>
                                <td className="px-6 py-4">
                                    {item.vehicleModel}
                                </td>
                                <td className="px-6 py-4">
                                    {/* {item.waitingStageStatus} */}
                                    {progressIndicator(item)}
                                </td>
                                <td className="px-6 py-4">
                                    {item.estimatedDeliveryTimestamp}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </>
    )
}

const progressIndicator = (item: Entry) => {

    const circle = (item:Entry, key:string) => {
        const updateStatus = (item: Entry, key: string) => {
            console.log("updateStatus", item, key);
        }

        if (item[key] === "COMPLETED") {
            return <div className="w-4 h-4 rounded-full bg-green-500"></div>
        } else if (item[key] === "IN_PROGRESS") {
            return <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
        } else {
            return <div className="w-4 h-4 rounded-full bg-gray-500"></div>
        }
    }
    return (
        <div className="flex flex-row gap-2">
            {circle(item, "waitingStageStatus")}
            {circle(item, "stageOneStatus")}
            {circle(item, "stageTwoStatus")}
            {circle(item, "stageThreeStatus")}
            {circle(item, "waterWashStageStatus")}
        </div>
    )
}