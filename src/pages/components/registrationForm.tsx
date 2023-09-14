import { useState } from "react";

type TRegistrationForm = {
  id: number;
  name: string;
  vehicleModel: string;
  vehicleNumber: string;
  phoneNumber: string;
  serviceRequired: string;
  extraServiceRequired: string;
  estimatedDeliveryDate: string;
  priority: string;
};

export default function RegistrationForm() {
  const [registrationForm, setRegistrationForm] = useState<TRegistrationForm>(
    {} as TRegistrationForm
  );

  const handleChange = (id: string, value: string | number | Date) => {
    setRegistrationForm({ ...registrationForm, [id]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("registrationForm", registrationForm);
  };
  return (
    <div className="p-4 border rounded-md grid grid-cols-[1fr,2.5fr,1fr]">
      <div></div>
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-6 flex gap-4 items-baseline">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-90 w-[11em]"
          >
            Owner Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="JohnDoe"
            onChange={(e) => handleChange("name", e.target.value)}
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
          <input
            type="text"
            id="vehicleModel"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="RE Classic 350"
            onChange={(e) => handleChange("vehicleModel", e.target.value)}
            required
          />
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
            Service Required
          </label>
          <select
            id="serviceRequired"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => handleChange("serviceRequired", e.target.value)}
            required
          >
            <option value="service1">Service 1</option>
            <option value="service2">Service 2</option>
            <option value="service3">Service 3</option>
            <option value="service4">Service 4</option>
          </select>
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
              onChange={(e) =>
                handleChange("extraServiceRequired", e.target.value)
              }
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
              onChange={(e) =>
                handleChange("extraServiceRequired", e.target.value)
              }
              required
            />
            <label htmlFor="no">No</label>
          </div>
        </div>
        {registrationForm.extraServiceRequired === "true" && (
          <div className="mb-6 flex gap-4 items-baseline">
            <label
              htmlFor="extraServiceDays"
              className="block mb-2 text-sm font-medium text-gray-90 w-[11em]"
            >
              Extra Service Days
            </label>
            <input
              type="number"
              id="extraServiceDays"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => handleChange("extraServiceDays", e.target.value)}
              required
            />
          </div>
        )}
        <div className="mb-3 flex gap-4 items-baseline">
          <label className="block mb-2 text-sm font-medium text-gray-90 w-[11em]">
            Estimated Delivery Date
          </label>
          <input
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Select a date"
            onChange={(e) =>
              handleChange("estimatedDeliveryDate", e.target.value)
            }
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
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <div></div>
    </div>
  );
}
