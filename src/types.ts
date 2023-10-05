export interface ServiceType {
  id: string;
  name: string;
}

export interface Entry {
  id: string;
  vehicleNumber: string;
  vehicleModel: string;
  estimatedDeliveryTimestamp: string;
  jobStageStatuses: JobStage[];
  priority: PriorityEnum;
}

export enum PriorityEnum {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum StatusEnum {
  WAITING = "WAITING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  YELLOW_ALERT = "YELLOW_ALERT",
  RED_ALERT = "RED_ALERT",
}
export type Stage = {
  id: string;
  name: string;
};

export type JobStage = {
  jobId: string;
  stageId: string;
  status: StatusEnum;
  stage: Stage;
};

export type TTrackingForm = {
  vehicleNumber: string;
  vehicleModel: string;
  stage: string;
  Date: string;
};
