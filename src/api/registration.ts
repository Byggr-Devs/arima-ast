interface registerParams {
  serviceCenterId: string;
  ownerName: string;
  vehicleModel: string;
  vehicleNumber: string;
  phoneNumber: string;
  servicesRequired: string[];
  extraServiceRequired: boolean;
  extraServiceDays: number;
  estimatedDeliveryTimestamp: string;
  priority: string;
  startTimestamp: string;
}

// api to post. Create a registration.
export async function register(props: registerParams) {
  props.startTimestamp = new Date().toISOString();
  props.estimatedDeliveryTimestamp = new Date(
    props.estimatedDeliveryTimestamp
  ).toISOString();
  const response = await fetch("http://localhost:8000/job", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  }).then((res) => res.json());
  console.log("registered", response);
  return response.data;
}
export interface ServiceType {
  id: number;
  name: string;
}
interface resultFormat {
  serviceTypes: ServiceType[];
  priorities: string[];
}

export async function getRegistrationParams(): Promise<resultFormat> {
  const result = await fetch("http://localhost:8000/registrationParams").then(
    (res) => res.json()
  );
  return result.data;
}

export async function deleteJob({ jobId }: { jobId?: string }) {
  if (!jobId) {
    return;
  }
  const result = await fetch(`http://localhost:8000/delete-job/${jobId}`, {
    method: "DELETE",
  }).then((res) => res.json());
  return result.data;
}
