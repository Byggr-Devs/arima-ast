import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Entry, JobStage, StatusEnum } from "../../types";
import { displayFormat } from "../../util";

interface DetailProps {
    selectedEntry: Entry;
}

export const Detail: React.FC<DetailProps> = (props) => {
    const { selectedEntry } = props;
    const [selectedJobStage, setSelectedJobStage] = useState<JobStage>(selectedEntry.jobStageStatuses[0]);

    let color = "bg-gray-50";
    if (selectedJobStage.status === StatusEnum.COMPLETED) {
        color = "bg-green-200";
    } else if (selectedJobStage.status === StatusEnum.YELLOW_ALERT) {
        color = "bg-yellow-200";
    } else if (selectedJobStage.status === StatusEnum.RED_ALERT) {
        color = "bg-red-200";
    } else if (selectedJobStage.status === StatusEnum.IN_PROGRESS) {
        color = "bg-blue-200";
    }


    return (
        <>
            <div className="flex justify-between flex-col">
                <p><span className="font-semibold mr-2">Vehicle Owner:</span> <span className={``}>{selectedEntry.ownerName}</span></p>
                <p><span className="font-semibold mr-2">Vehicle Number:</span> <span className={``}>{selectedEntry.vehicleNumber}</span></p>
                <p><span className="font-semibold mr-2">Vehicle Model:</span> <span className={``}>{selectedEntry.vehicleModel}</span></p>
                <p><span className="font-semibold mr-2">Owner Phone Number:</span> <span className={``}>{selectedEntry.ownerPhone}</span></p>
            </div>
            <Carousel className="mt-6" showThumbs={false} selectedItem={0} onChange={(idx) => { setSelectedJobStage(selectedEntry.jobStageStatuses[idx]) }}>
                {selectedEntry.jobStageStatuses.map((jobStage) => {
                    return (
                        <div className="h-[50vh]">
                            <div className="w-[100%] h-full flex items-center justify-center gap-1">
                                <div className="w-[50%] bg-gray-300 h-full flex items-center justify-center relative">
                                    <p className="absolute top-6 left-4 font-bold">Entry Image</p>
                                    <img className="w-[50%]" src={jobStage.entryImageUrl ?? "https://www.picsum.photos/200"} alt="No Image" />
                                </div>
                                <div className="w-[50%] bg-gray-300 h-full flex items-center justify-center relative">
                                    <p className="absolute top-6 left-4 font-bold">Exit Image</p>
                                    <img className="w-[50%]" src={jobStage.entryImageUrl ?? "https://www.picsum.photos/200"} alt="No Image" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Carousel>
            <div className="mt-8 flex gap-6 justify-between">
                <p><span className="font-semibold">{selectedJobStage.stage.name}:</span> <span className={`${color} px-4 py-2 border rounded-full`}>{selectedJobStage.status}</span></p>
                <p><span className="font-semibold">Start DateTime:</span> <span className={`bg-gray-50 px-4 py-2 border rounded-full`}>{displayFormat(selectedJobStage.startTimestamp)}</span></p>
                <p><span className="font-semibold">End DateTime:</span> <span className={`bg-gray-50 px-4 py-2 border rounded-full`}>{displayFormat(selectedJobStage.endTimestamp)}</span></p>
            </div>
        </>
    );
}