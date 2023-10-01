import React, { useEffect, useState } from "react";
import { deleteJob } from "../../api/registration";
import { getTrackings, updateTrackingStageStatus } from "../../api/tracking";

interface Entry {
  id: string;
  vehicleNumber: string;
  vehicleModel: string;
  estimatedDeliveryTimestamp: string;
  jobStageStatuses: JobStage[];
}

enum StatusEnum {
  WAITING = "WAITING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  YELLOW_ALERT = "YELLOW_ALERT",
  RED_ALERT = "RED_ALERT",
}
type Stage = {
  id: string;
  name: string;
}

type JobStage = {
  jobId: string;
  stageId: string;
  status: StatusEnum;
  stage: Stage;
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
  const [updateJob, setUpdateJob] = useState<Entry>();

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
                <div className="font-bold mb-5 text-center">
                  Progress Of Service
                </div>
                <div className="flex gap-2 justify-between">
                  {entries[0]?.jobStageStatuses.map((jobStage) => {
                    return (
                      <div className="flex flex-col gap-2">
                        <div>{jobStage.stage.name}</div>
                      </div>
                    );
                  }
                  )}
                </div>
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
                    onClick={() => {
                      console.log("delete", updateJob);
                      deleteJob({ jobId: updateJob?.id });
                    }}
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showStageEditModal && updateJob && (
        <EditModal entry={updateJob} setShowStageEditModal={setShowStageEditModal} />
      )}
    </>
  );
};

const progressIndicator = (item: Entry) => {
  const circle = (jobStage: JobStage) => {

    if (jobStage.status === StatusEnum.COMPLETED) {
      return <div className="w-4 h-4 rounded-full bg-green-500"></div>;
    } else if (jobStage.status === StatusEnum.IN_PROGRESS) {
      return <div className="w-4 h-4 rounded-full bg-blue-500"></div>;
    } else if (jobStage.status === StatusEnum.RED_ALERT) {
      return <div className="w-4 h-4 rounded-full bg-red-500"></div>;
    } else if (jobStage.status === StatusEnum.YELLOW_ALERT) {
      return <div className="w-4 h-4 rounded-full bg-yellow-500"></div>;
    } else {
      return <div className="w-4 h-4 rounded-full bg-gray-500"></div>;
    }
  };
  return (
    <div className="flex flex-row gap-2 justify-between">
      {item.jobStageStatuses.map((jobStage) => {
        return (
          circle(jobStage)
        );
      })}
    </div>
  );
};

interface EditModalProps {
  entry: Entry;
  setShowStageEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditModal: React.FC<EditModalProps> = ({ entry, setShowStageEditModal }) => {
  const [selectedStage, setSelectedStage] = useState<JobStage | null>(null);
  // const selectedStage = entry.jobStageStatuses.find((jobStage) => jobStage.status === StatusEnum.IN_PROGRESS);

  const handleUpdateJob = () => {
    if (!entry?.id || !selectedStage) return;

    const jobStageStatuses = entry?.jobStageStatuses;

    //get status which is on in progress
    //update that to completed
    //update next stage to in progress

    updateTrackingStageStatus(
      entry.id,
      jobStageStatuses.map((jobStage) => {
        if (jobStage.status === StatusEnum.IN_PROGRESS && jobStage.stageId !== selectedStage.stageId) {
          return {
            ...jobStage,
            status: StatusEnum.COMPLETED,
          };
        }
        if (jobStage.stageId === selectedStage.stageId && jobStage.status !== StatusEnum.COMPLETED) {
          return {
            ...jobStage,
            status: StatusEnum.IN_PROGRESS,
          };
        }
        return jobStage;
      })
    );
  };

  return (
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
                  const stageId = e.target.value;
                  setSelectedStage(entry.jobStageStatuses.find((jobStage) => jobStage.stageId === stageId));
                }}
              >{entry.jobStageStatuses.map((jobStage) => {
                return (
                  <option value={jobStage.stageId}>{jobStage.stage.name}</option>
                );
              })}
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
  )
}