export async function getTrackings() {
    const response = await fetch("http://localhost:8000/tracking").then((res) =>
        res.json()
    );
    console.log("trackings", response);
    return response.data;
}

export async function updateTrackingStageStatus(
    trackingId: string,
    stageId: number,
    status: string
) {
    const response = await fetch(
        `http://localhost:8000/tracking/${trackingId}/stage/${stageId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        }
    ).then((res) => res.json());
    console.log("updated", response);
    return response.data;
}