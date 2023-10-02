import { useEffect, useState } from "react";
import { getTrackings } from "../../api/tracking";
import { Entry, JobStage, StatusEnum, TTrackingForm } from "../../types";
import { EditActions } from "./edit";


export default function TrackingForm() {
  const [trackings, setTrackings] = useState<Entry[]>([]);
  const [trackingForm, setTrackingForm] = useState<TTrackingForm>({
    vehicleNumber: "",
    vehicleModel: "",
    stage: "",
    Date: "",
  });
  const [filteredData, setFilteredData] = useState<Entry[]>(trackings);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    getTrackings().then((res) => {
      console.log("res", res);
      setTrackings(res);
    });
  }, [refresh]);

  useEffect(() => {
    // filter trackings according to trackingForm

    console.log("trackingForm");

    if (!trackingForm.vehicleNumber && !trackingForm.Date) {
      setFilteredData(trackings);
      return;
    }

    // subString match for vehicleNumber

    const filteredTrackings = trackings.filter((tracking) => {
      if (trackingForm.vehicleNumber) {
        const vehicleNumber = trackingForm.vehicleNumber;
        const trackingVehicleNumber = tracking.vehicleNumber;
        return trackingVehicleNumber.includes(vehicleNumber);
      }

      // date match
      if (trackingForm.Date) {
        const date = trackingForm.Date;
        const trackingDate = tracking.estimatedDeliveryTimestamp;
        return trackingDate >= date;
      }
      return true;
    });

    setFilteredData(filteredTrackings);
  }, [trackings, trackingForm]);

  return (
    <div className="p-4 flex gap-4 flex-col">
      <form className="grid grid-cols-5 gap-2">
        <div className="mb-6">
          <label
            htmlFor="vehicleNumber"
            className="block mb-2 text-sm font-medium text-gray-90"
          >
            Vehicle Number
          </label>
          <input
            type="text"
            id="vehicleNumber"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => {
              setTrackingForm({
                ...trackingForm,
                vehicleNumber: e.target.value,
              });
            }}
            value={trackingForm.vehicleNumber ?? ""}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="vehicleModel"
            className="block mb-2 text-sm font-medium text-gray-90"
          >
            Vehicle Model
          </label>
          <select
            id="vehicleModel"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => {
              setTrackingForm({
                ...trackingForm,
                vehicleModel: e.target.value,
              });
            }}
            value={trackingForm.vehicleModel ?? ""}
          >
            <option>1</option>
            <option>2</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-90">
            Stage
          </label>
          <select
            id="stage"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => {
              setTrackingForm({ ...trackingForm, stage: e.target.value });
            }}
            value={trackingForm.stage ?? ""}
          >
            <option>1</option>
            <option>2</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-90">
            Date
          </label>
          <input
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Select a date"
            onChange={(e) => {
              setTrackingForm({ ...trackingForm, Date: e.target.value });
            }}
            value={trackingForm.Date ?? ""}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 self-center ml-3"
          onClick={() => {
            setFilteredData(trackings);
            setTrackingForm({
              vehicleNumber: "",
              vehicleModel: "",
              stage: "",
              Date: "",
            });
          }}
        >
          clear filters
        </button>
      </form>
      <div>{Table(filteredData, setRefresh)}</div>
    </div>
  );
}

const Table = (entries: Entry[], setRefresh:React.Dispatch<React.SetStateAction<boolean>> ) => {
  return (
    <>
      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3" rowSpan={2}>
                SNo
              </th>
              <th scope="col" className="px-6 py-3" rowSpan={2}>
                Vehicle Number
              </th>
              <th scope="col" className="px-6 py-3" rowSpan={2}>
                Model
              </th>
              <th scope="col" className="px-6 py-3 text-center" colSpan={entries[0]?.jobStageStatuses.length}>
                  Progress Of Service
              </th>
              <th scope="col" className="px-6 py-3" rowSpan={2}>
                Estimated Time Of Delivery
              </th>
              <th scope="col" className="px-6 py-3" rowSpan={2}>
                Actions
              </th>
            </tr>
            <tr>
                {entries[0]?.jobStageStatuses.map((jobStage) => {
                    return (
                        <th className="px-6 py-3 text-center">{jobStage.stage.name}</th>
                    );
                }
                )}
            </tr>
          </thead>
          <tbody>
            {entries.map((item, idx) => (
              <tr className="bg-white border-b" key={item.id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {idx}
                </th>
                <td className="px-6 py-4">{item.vehicleNumber}</td>
                <td className="px-6 py-4">{item.vehicleModel}</td>
                {item.jobStageStatuses.map((jobStage) => {
                  return (
                    <td className="px-6 py-4 text-center">{circle(jobStage)}</td>
                  );
                }
                )}
                <td className="px-6 py-4">{item.estimatedDeliveryTimestamp}</td>
                <td className="px-6 py-4">
                  <EditActions item={item} setRefresh={setRefresh} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const circle = (jobStage: JobStage) => {
  if (jobStage.status === StatusEnum.COMPLETED) {
    return <div className="w-6 h-6 inline-block rounded-full bg-green-500"></div>;
  } else if (jobStage.status === StatusEnum.IN_PROGRESS) {
    return <div className="w-6 h-6 inline-block rounded-full bg-blue-500"></div>;
  } else if (jobStage.status === StatusEnum.RED_ALERT) {
    return <div className="w-6 h-6 inline-block rounded-full bg-red-500"></div>;
  } else if (jobStage.status === StatusEnum.YELLOW_ALERT) {
    return <div className="w-6 h-6 inline-block rounded-full bg-yellow-500"></div>;
  } else {
    return <div className="w-6 h-6 inline-block rounded-full bg-gray-500"></div>;
  }
};
