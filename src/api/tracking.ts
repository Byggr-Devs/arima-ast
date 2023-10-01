export async function getTrackings() {
  const response = await fetch("http://localhost:8000/tracking").then((res) =>
    res.json()
  );
  console.log("trackings", response);
  return response.data;
}

export async function updateTrackingStageStatus(
  jobId: string,
  waitingStageStatus: string,
  stageOneStatus: string,
  stageTwoStatus: string,
  stageThreeStatus: string,
  waterWashStageStatus: string
) {
  const response = await fetch(`http://localhost:8000/update-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jobId,
      waitingStageStatus,
      stageOneStatus,
      stageTwoStatus,
      stageThreeStatus,
      waterWashStageStatus,
    }),
  }).then((res) => res.json());
  console.log("updated", response);
  return response.data;
}
