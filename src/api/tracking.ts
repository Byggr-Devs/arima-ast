export async function getTrackings() {
  const response = await fetch("http://localhost:8000/tracking").then((res) =>
    res.json()
  );
  console.log("trackings", response);
  return response.data;
}

export async function updateTrackingStageStatus(
  jobId: string,
  jobStageStatuses: {
    status:
      | "WAITING"
      | "IN_PROGRESS"
      | "COMPLETED"
      | "YELLOW_ALERT"
      | "RED_ALERT";
    stageId: string;
  }[],
  isPinned: boolean
) {
  const response = await fetch(`http://localhost:8000/update-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jobId,
      jobStageStatuses,
      isPinned,
    }),
  }).then((res) => res.json());
  console.log("updated", response);
  return response.data;
}

export async function processJobAlerts() {
  const response = await fetch(`http://localhost:8000/process-jobs`).then((res) => res.json());
  console.log("processed", response);
  return response.data;
}