import { useState } from "react";
import { deleteJob } from "../../api/registration";
import { updateTrackingStageStatus } from "../../api/tracking";
import { Entry, JobStage, StatusEnum } from "../../types";

interface EditActionsProps {
  item: Entry;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
}

export const EditActions: React.FC<EditActionsProps> = ({
  item,
  setRefresh,
  isAdmin,
}) => {
  const [show, setShow] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleDelete = async () => {
    if (!item?.id) return;
    setShowSubMenu(false);
    setShow(false);
    try {
      await deleteJob({ jobId: item.id });
      setRefresh((prev) => !prev);
    } catch (error) {
      //TODO: handle error
    }
  };

  const handleComplete = async () => {
    if (!item?.id) return;
    setShowSubMenu(false);
    setShow(false);
    try {
      await updateTrackingStageStatus(
        item.id,
        item?.jobStageStatuses.map((jobStage) => {
          if (jobStage.status !== StatusEnum.COMPLETED) {
            return {
              ...jobStage,
              status: StatusEnum.COMPLETED,
            };
          }
          return jobStage;
        })
      );
      setRefresh((prev) => !prev);
    } catch (error) {
      //TODO: handle error
    }
  }

  const handleChangeStage = async (selectedStage: JobStage) => {
    if (!item?.id || !selectedStage) return;
    setShowSubMenu(false);
    setShow(false);
    const jobStageStatuses = item?.jobStageStatuses;

    //get status which is on in progress
    //update that to completed
    //update next stage to in progress
    try {
      await updateTrackingStageStatus(
        item.id,
        jobStageStatuses.map((jobStage) => {
          if (
            jobStage.status === StatusEnum.IN_PROGRESS &&
            jobStage.stageId !== selectedStage.stageId
          ) {
            return {
              ...jobStage,
              status: StatusEnum.COMPLETED,
            };
          }
          if (
            jobStage.stageId === selectedStage.stageId &&
            jobStage.status !== StatusEnum.COMPLETED
          ) {
            return {
              ...jobStage,
              status: StatusEnum.IN_PROGRESS,
            };
          }
          return jobStage;
        })
      );
      setRefresh((prev) => !prev);
    } catch (error) {
      //TODO: handle error
    }
  };
  return (
    <div className="relative">
      <button
        onClick={() => setShow(!show)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 inline-flex items-center justify-between"
        type="button"
        disabled={!isAdmin}
      >
        Edit
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        hidden={!show}
        className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-0 border border-gray-300"
      >
        <ul
          className="py-2 text-sm text-gray-700 "
          aria-labelledby="multiLevelDropdownButton"
        >
          <li>
            <button
              onClick={() => setShowSubMenu(!showSubMenu)}
              type="button"
              className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 relative"
            >
              Change Stage
              <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
            <div
              hidden={!showSubMenu}
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-44 top-0 border border-gray-300"
            >
              <ul
                className="py-2 text-sm text-gray-700 "
                aria-labelledby="doubleDropdownButton"
              >
                {item.jobStageStatuses.map((stage) => (
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleChangeStage(stage)}
                    >
                      {stage.stage.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={handleComplete}
            >
              Complete Job
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={handleDelete}
            >
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
