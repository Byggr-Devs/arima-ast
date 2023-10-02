import { useEffect, useState } from "react";
import {
  getRegistrationParams,
  register,
} from "../../api/registration";
import { ServiceType } from "../../types";
import { VEHICLE_MODELS } from "../../util";
import { DropdownCheckbox } from "./dropdownCheckbox";
import { Loading } from "./loading";

type TRegistrationForm = {
  serviceCenterId: string;
  ownerName: string;
  vehicleModel: string;
  vehicleNumber: string;
  phoneNumber: string;
  servicesRequired: string[];
  extraServiceRequired: boolean;
  extraServiceHours: number;
  estimatedDeliveryTimestamp: string;
  priority: string;
};

export default function RegistrationForm() {
  const [registrationForm, setRegistrationForm] = useState<TRegistrationForm>({
    serviceCenterId: "service-center-1",
    ownerName: "",
    vehicleModel: "",
    vehicleNumber: "",
    phoneNumber: "",
    servicesRequired: [],
    extraServiceRequired: false,
    extraServiceHours: 0,
    estimatedDeliveryTimestamp: "",
    priority: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [registrationParams, setRegistrationParams] = useState<{
    serviceTypes: ServiceType[];
    priorities: string[];
  }>({
    serviceTypes: [],
    priorities: [],
  });

  useEffect(() => {
    // console.log("registrationForm", registrationForm);
    getRegistrationParams().then((res) => {
      console.log("res", res);
      setRegistrationParams(res);
    });
  }, []);

  const handleChange = (
    id: string,
    value: string | string[] | Date | boolean
  ) => {
    setRegistrationForm({ ...registrationForm, [id]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      await register(registrationForm);
      setIsLoading(false);
      setSuccess("Successfully registered");
    } catch (error) {
      setIsLoading(false);
      setError("Something went wrong");
    }
    console.log("registrationForm", registrationForm);
  };
  console.log("registrationForm", registrationForm);
  return (
    <div className="p-4 border rounded-md grid grid-cols-[1fr,2.5fr,1fr]">
      <div></div>
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-6 flex gap-4 items-baseline">
          <label
            htmlFor="ownerName"
            className="block mb-2 text-sm font-medium text-gray-90 w-[11em]"
          >
            Owner Name
          </label>
          <input
            type="text"
            id="ownerName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="JohnDoe"
            onChange={(e) => handleChange("ownerName", e.target.value)}
            required
          />
        </div>
        <div className="mb-6 flex gap-4 items-baseline">
          <label
            htmlFor="vehicleModel"
            className="block mb-2 text-sm font-medium text-gray-90 w-[11em]"
          >
            Vehicle Model
          </label>
          <select
            id="vehicleModel"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => handleChange("vehicleModel", e.target.value)}
            required
          >
            <option value="">Select a model</option>
            {VEHICLE_MODELS.map((model) => (
              <option value={model}>{model}</option>
            ))}
          </select>
        </div>
        <div className="mb-6 flex gap-4 items-baseline">
          <label
            htmlFor="vehicleNumber"
            className="block mb-2 text-sm font-medium text-gray-90 w-[11em]"
          >
            Vehicle Number
          </label>
          <input
            type="text"
            id="vehicleNumber"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="TN 01 AB 1234"
            onChange={(e) => handleChange("vehicleNumber", e.target.value)}
            required
          />
        </div>
        <div className="mb-6 flex gap-4 items-baseline">
          <label
            htmlFor="phoneNumber"
            className="block mb-2 text-sm font-medium text-gray-90 w-[11em]"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            required
          />
        </div>
        <div className="mb-6 flex gap-4 items-baseline">
          <label
            htmlFor="serviceRequired"
            className="block mb-2 text-sm font-medium text-gray-90 w-[11em]"
          >
            Services Required
          </label>
          <DropdownCheckbox title="Select Services" items={registrationParams.serviceTypes} updateItems={(items) => {
            handleChange("servicesRequired", items.map((item) => item.id));
          }
          } />
        </div>

        <div className="mb-6 flex gap-4 items-baseline">
          <label
            htmlFor="extraServiceRequired"
            className="block mb-2 text-sm font-medium text-gray-90 w-[11em]"
          >
            Extra Service Required
          </label>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="extraServiceRequired"
              name="extraServiceRequired"
              value="true"
              onChange={() => handleChange("extraServiceRequired", true)}
              required
            />
            <label htmlFor="yes">Yes</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="extraServiceRequired"
              name="extraServiceRequired"
              value="false"
              onChange={() => handleChange("extraServiceRequired", false)}
              required
            />
            <label htmlFor="no">No</label>
          </div>
        </div>
        {registrationForm.extraServiceRequired && (
          <div className="mb-6 flex gap-4 items-baseline">
            <label
              htmlFor="extraServiceHours"
              className="block mb-2 text-sm font-medium text-gray-90 w-[11em]"
            >
              Extra Service Hours
            </label>
            <input
              type="number"
              id="extraServiceHours"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => handleChange("extraServiceHours", e.target.value)}
              required
            />
          </div>
        )}
        <div className="mb-3 flex gap-4 items-baseline">
          <label className="block mb-2 text-sm font-medium text-gray-90 w-[11em]">
            Estimated Delivery Date
          </label>
          <input
            type="datetime-local"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Select a date"
            onChange={(e) =>
              handleChange("estimatedDeliveryTimestamp", e.target.value)
            }
            required
          />
        </div>

        <div className="mb-6 flex gap-4 items-baseline">
          <label
            htmlFor="priority"
            className="block mb-2 text-sm font-medium text-gray-90 w-[11em]"
          >
            Priority
          </label>
          <select
            id="priority"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => handleChange("priority", e.target.value)}
            required
          >
            <option value="">Select a priority</option>
            {registrationParams.priorities.map((priority) => (
              <option value={priority}>{priority}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="text-white max-h-10 w-40 max-w-30 flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-auto mt-10"
        >
          {isLoading ?
            <Loading />
            : "Submit"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </form>
      <div></div>
    </div>
  );
}
