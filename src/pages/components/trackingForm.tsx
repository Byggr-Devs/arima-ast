import { useEffect, useState } from "react";
import { getTrackings, updateTrackingStageStatus } from "../../api/tracking";

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

type TTrackingForm = {
  vehicleNumber: string;
  vehicleModel: string;
  stage: string;
  Date: string;
};

export default function TrackingForm() {
  const [trackings, setTrackings] = useState<Entry[]>([]);
  const [trackingForm, setTrackingForm] = useState<TTrackingForm>({
    vehicleNumber: "",
    vehicleModel: "",
    stage: "",
    Date: "",
  });
  const [filteredData, setFilteredData] = useState<Entry[]>(trackings);

  useEffect(() => {
    getTrackings().then((res) => {
      console.log("res", res);
      setTrackings(res);
    });
  }, []);

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
      <form className="grid grid-cols-5 gap-2" onSubmit={handleSearchSubmit}>
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
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
      <div>{Table(filteredData)}</div>
    </div>
  );
}

const Table = (entries: Entry[]) => {
  const [showStageEditModal, setShowStageEditModal] = useState<boolean>(false);
  const [showActionsModal, setShowActionsModal] = useState<boolean>(false);
  const [selectedStage, setSelectedStage] = useState<string>();
  const [updateJob, setUpdateJob] = useState<Entry>();

  const handleUpdateJob = () => {
    if (!updateJob?.id || !selectedStage) return;

    let currentWaitingStageStatus = updateJob?.waitingStageStatus;
    let currentStageOneStatus = updateJob?.stageOneStatus;
    let currentStageTwoStatus = updateJob?.stageTwoStatus;
    let currentStageThreeStatus = updateJob?.stageThreeStatus;
    let currentWaterWashStageStatus = updateJob?.waterWashStageStatus;

    //get status which is on in progress
    //update that to completed
    //update next stage to in progress

    updateTrackingStageStatus(
      updateJob.id,
      selectedStage === "1"
        ? currentWaitingStageStatus !== "COMPLETED"
          ? "IN_PROGRESS"
          : "COMPLETED"
        : currentWaitingStageStatus === "IN_PROGRESS"
        ? "COMPLETED"
        : currentWaitingStageStatus,
      selectedStage === "2"
        ? currentStageOneStatus !== "COMPLETED"
          ? "IN_PROGRESS"
          : "COMPLETED"
        : currentStageOneStatus === "IN_PROGRESS"
        ? "COMPLETED"
        : currentStageOneStatus,
      selectedStage === "3"
        ? currentStageTwoStatus !== "COMPLETED"
          ? "IN_PROGRESS"
          : "COMPLETED"
        : currentStageTwoStatus === "IN_PROGRESS"
        ? "COMPLETED"
        : currentStageTwoStatus,
      selectedStage === "4"
        ? currentStageThreeStatus !== "COMPLETED"
          ? "IN_PROGRESS"
          : "COMPLETED"
        : currentStageThreeStatus === "IN_PROGRESS"
        ? "COMPLETED"
        : currentStageThreeStatus,
      selectedStage === "5"
        ? currentWaterWashStageStatus !== "COMPLETED"
          ? "IN_PROGRESS"
          : "COMPLETED"
        : currentWaterWashStageStatus === "IN_PROGRESS"
        ? "COMPLETED"
        : currentWaterWashStageStatus
    );
  };
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
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
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
                <td className="px-6 py-4">{progressIndicator(item)}</td>
                <td className="px-6 py-4">{item.estimatedDeliveryTimestamp}</td>
                <td className="px-6 py-4">
                  <button
                    data-modal-target="staticModal"
                    data-modal-toggle="staticModal"
                    onClick={() => {
                      setShowActionsModal(true);
                      setUpdateJob(item);
                    }}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showActionsModal && (
        <div
          // bring it to center
          className="fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] max-w-4xl mx-auto"
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="relative w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={() => setShowActionsModal(false)}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <div className="flex gap-3">
                  <button
                    type="submit"
                    onClick={() => {
                      setShowStageEditModal(true);
                      setShowActionsModal(false);
                    }}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm my-5 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update Stage
                  </button>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm my-5 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showStageEditModal && (
        <div
          // bring it to center
          className="fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] max-w-4xl mx-auto"
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="relative w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={() => {
                  setShowStageEditModal(false);
                }}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <div>
                  <label
                    htmlFor="changeStage"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Edit Stage
                  </label>
                  <select
                    id="changeStage"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    onChange={(e) => {
                      setSelectedStage(e.target.value);
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <button
                  type="submit"
                  onClick={() => {
                    handleUpdateJob();
                    setShowStageEditModal(false);
                  }}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm my-5 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const progressIndicator = (item: Entry) => {
  const circle = (item: Entry, key: string) => {
    const updateStatus = (item: Entry, key: string) => {
      console.log("updateStatus", item, key);
    };

    if (item[key] === "COMPLETED") {
      return <div className="w-4 h-4 rounded-full bg-green-500"></div>;
    } else if (item[key] === "IN_PROGRESS") {
      return <div className="w-4 h-4 rounded-full bg-yellow-500"></div>;
    } else {
      return <div className="w-4 h-4 rounded-full bg-gray-500"></div>;
    }
  };
  return (
    <div className="flex flex-row gap-2">
      {circle(item, "waitingStageStatus")}
      {circle(item, "stageOneStatus")}
      {circle(item, "stageTwoStatus")}
      {circle(item, "stageThreeStatus")}
      {circle(item, "waterWashStageStatus")}
    </div>
  );
};

const EditModal = () => {
  return (
    <div>
      <div
        id="staticModal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Static modal
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="staticModal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>

            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="staticModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-hide="staticModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
