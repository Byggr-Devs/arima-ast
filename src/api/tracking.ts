export async function getTrackings() {
  const response = await fetch("http://localhost:8000/tracking").then((res) =>
    res.json()
  );
  console.log("trackings", response);
  return response.data;
}

export async function updateTrackingStageStatus(
  jobId: string,
  jobStageStatuses: {status: "WAITING"|"IN_PROGRESS"|"COMPLETED"|"YELLOW_ALERT"|"RED_ALERT", stageId: string}[]
) {
  const response = await fetch(`http://localhost:8000/update-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jobId,
      jobStageStatuses
    }),
  }).then((res) => res.json());
  console.log("updated", response);
  return response.data;
}
