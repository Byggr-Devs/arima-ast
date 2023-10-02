import { useEffect, useState } from "react";
import { ServiceType } from "../../types";

interface DropdownCheckboxProps {
  title: string;
  items: ServiceType[];
  updateItems: (items: ServiceType[]) => void;
}
export const DropdownCheckbox: React.FC<DropdownCheckboxProps> = ({
    title,
  items,
  updateItems,
}) => {
  const [selectedItems, setSelectedItems] = useState<ServiceType[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  useEffect(() => {
    console.log("selected Items", selectedItems);
    updateItems(selectedItems);
  }, [selectedItems]);
  return (
    <div className="relative w-full">
      <button
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        // className="text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 inline-flex items-center justify-between"
        type="button"
      > 
      {title}
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
        hidden={!showDropdown}
        className="z-10 rounded-lg bg-gray-50 border-gray-300 border absolute w-full"
      >
        <ul
          className="p-3 space-y-1 text-sm text-gray-900 dark:text-gray-200"
          aria-labelledby="dropdownBgHoverButton"
        >
          {items.map((item) => (
            <li>
              <div className="flex items-center p-2 rounded hover:bg-gray-100">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems([...selectedItems, item]);
                    } else {
                      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
                    }
                  }}
                  value={item.id}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "
                />
                <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded ">
                  {item.name}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
