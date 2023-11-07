import { useEffect, useState } from "react";
import { getTrackings } from "../../api/tracking";
import { Entry, JobStage, PriorityEnum, StatusEnum, TTrackingForm } from "../../types";
import { VEHICLE_MODELS, tableDatedisplayFormat } from "../../util";
import { Detail } from "./Detail";
import { EditActions } from "./edit";
import { Modal } from "./model";


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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("isAdmin");
    if (user === "true") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    // Function to fetch trackings and update state
    const fetchTrackings = async () => {
      console.log("Fetching trackings...");

      try {
        const res = await getTrackings();
        console.log("res", res);
        setTrackings(res);
      } catch (error) {
        console.error("Error fetching trackings:", error);
      }
    };

    // Initial fetch when the component mounts
    fetchTrackings();

    // Set up the interval to fetch trackings every 5 seconds
    const interval = setInterval(() => {
      fetchTrackings();
    }, 5000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [refresh]);

  useEffect(() => {
    // filter trackings according to trackingForm
    const filteredByVehicleNumber = trackings.filter((tracking) => {
      if (trackingForm.vehicleNumber) {
        const vehicleNumber = trackingForm.vehicleNumber.toLocaleLowerCase();
        const trackingVehicleNumber = tracking.vehicleNumber.toLocaleLowerCase();
        return trackingVehicleNumber.includes(vehicleNumber);
      }
      return true;
    });

    const filteredByDate = trackings.filter((tracking) => {
      if (trackingForm.Date) {
        const date = trackingForm.Date;
        const trackingDate = tracking.estimatedDeliveryTimestamp;
        return trackingDate >= date;
      }
      return true;
    });

    const filteredByVehicleModel = trackings.filter((tracking) => {
      if (trackingForm.vehicleModel) {
        const vehicleModel = trackingForm.vehicleModel;
        const trackingVehicleModel = tracking.vehicleModel;
        return trackingVehicleModel.includes(vehicleModel);
      }
      return true;
    });

    const filteredByStage = trackings.filter((tracking) => {
      if (trackingForm.stage) {
        const stage = trackingForm.stage;
        const trackingStage = tracking.jobStageStatuses.find(
          (jobStage) => jobStage.stageId === stage
        );
        return trackingStage?.status === "IN_PROGRESS";
      }
      return true;
    });

    const commonFilteredTrackings = trackings.filter((tracking) => {
      return (
        filteredByVehicleNumber.includes(tracking) &&
        filteredByDate.includes(tracking) &&
        filteredByVehicleModel.includes(tracking) &&
        filteredByStage.includes(tracking)
      );
    });

    setFilteredData(commonFilteredTrackings);
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
          >
            <option value="">All Models</option>
            {VEHICLE_MODELS.map((model) => (
              <option value={model}>{model}</option>
            ))}
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
          >
            <option value="">All Stages</option>
            {trackings[0]?.jobStageStatuses.map((jobStage) => (
              <option value={jobStage.stageId}>{jobStage.stage.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-90">
            Estimated Time Of Delivery
          </label>
          <input
            type="datetime-local"
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
      <div>{Table(filteredData, setRefresh, isAdmin)}</div>
    </div>
  );
}

const Table = (
  entries: Entry[],
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
  isAdmin: boolean
) => {
  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can adjust the number of items per page
  const totalItems = entries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [tableData, setTableData] = useState<Entry[]>([]);

  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  // Function to slice data for the current page
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return entries.slice(startIndex, endIndex);
  };

  useEffect(() => {
    setTableData(getCurrentPageData());
  }, [entries]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const startIndex = (newPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setTableData(entries.slice(startIndex, endIndex));
  };

  const handleRowClick = (item: Entry) => {
    console.log("item", item);
    setSelectedEntry(item);
  }

  return (
    <>
      <div className="mt-10">
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
              <th
                scope="col"
                className="px-6 py-3 text-center"
                colSpan={entries[0]?.jobStageStatuses.length}
              >
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
                  <th className="px-6 py-3 text-center">
                    {jobStage.stage.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, idx) => (
              <tr
                className={`hover:bg-gray-100 bg-white border-b border-l-4 hover:underline hover:cursor-pointer underline-offset-2 ${item.priority === PriorityEnum.URGENT
                  ? "border-l-red-600"
                  : ""
                  }`}
                onClick={() => handleRowClick(item)}
                key={item.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {(currentPage - 1) * 10 + idx + 1} {item.isPinned ? <span className="text-red-500">📌</span> : ""}
                </th>
                <td
                  className="px-6 py-4"
                >
                  {item.vehicleNumber}
                </td>
                <td className="px-6 py-4">{item.vehicleModel}</td>
                {item.jobStageStatuses.map((jobStage) => {
                  return (
                    <td className="px-6 py-4 text-center">
                      {circle(jobStage)}
                    </td>
                  );
                })}
                <td className="px-6 py-4">
                  {tableDatedisplayFormat(item.estimatedDeliveryTimestamp)}
                </td>
                <td className="px-6 py-4" onClick={(event) => event.stopPropagation()}>
                  <EditActions
                    item={item}
                    setRefresh={setRefresh}
                    isAdmin={isAdmin}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal */}
        {selectedEntry && (
          <Modal
            visible={selectedEntry !== null}
            onCancel={() => setSelectedEntry(null)}
            onOk={() => setSelectedEntry(null)}
            title="Tracking Details"
          >
            <Detail selectedEntry={selectedEntry} />
          </Modal>
        )}

        <div className="flex justify-end mt-4">
          {/* show total number of records */}
          <div className="flex items-center pr-5">
            <span className="text-sm text-gray-700">
              Total Number of Records :  {totalItems}
            </span>
          </div>

          <div className="flex items-center">
            <div className="mr-2 text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex h-8 font-medium rounded-lg bg-gray-200">
              {[...Array(totalPages)].map((_, idx) => {
                const pageNumber = idx + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-8 md:flex justify-center items-center hidden hover:bg-blue-500 focus:outline-none ${pageNumber === currentPage
                      ? "bg-blue-500 text-white"
                      : "text-gray-700"
                      }`}
                  >

                    {pageNumber}
                  </button>
                );
              })}
            </div>
          </div>


          {/* Previous and Next buttons */}

          {/* <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button> */}
        </div>
      </div>
    </>
  );
};

const circle = (jobStage: JobStage) => {
  if (jobStage.status === StatusEnum.COMPLETED) {
    return (
      <div className="w-6 h-6 inline-block rounded-full bg-green-500"></div>
    );
  } else if (jobStage.status === StatusEnum.IN_PROGRESS) {
    return (
      <div className="w-6 h-6 inline-block rounded-full bg-blue-500"></div>
    );
  } else if (jobStage.status === StatusEnum.RED_ALERT) {
    return <div className="w-6 h-6 inline-block rounded-full bg-red-500"></div>;
  } else if (jobStage.status === StatusEnum.YELLOW_ALERT) {
    return (
      <div className="w-6 h-6 inline-block rounded-full bg-yellow-500"></div>
    );
  } else {
    return (
      <div className="w-6 h-6 inline-block rounded-full bg-gray-500"></div>
    );
  }
};
