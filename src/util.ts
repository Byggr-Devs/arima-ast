export const VEHICLE_MODELS = ["Audi", "BMW", "Mercedes", "Porsche"];

export const displayFormat = (date?: string) => {
  // convert to dd-mm-yyyy hr:min AM/PM format
  // add 0 if date or month is single digit
  if (!date) return "N/A";

  const d = new Date(date);
  const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  const month =
    d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  const year = d.getFullYear();
  let hour: string | number = d.getHours();
  const min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  const ampm = Number(hour) >= 12 ? "PM" : "AM";
  if (Number(hour) > 12) hour = String(Number(hour) - 12);
  const time = hour + ":" + min + " " + ampm;
  return day + "-" + month + "-" + year + " - " + time;
};

export const tableDatedisplayFormat = (date?: string) => {
  // convert to dd-mm-yyyy hr:min AM/PM format
  // add 0 if date or month is single digit
  if (!date) return "N/A";

  const d = new Date(date);
  const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  const month =
    d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;

  let hour: string | number = d.getHours();
  const min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  const ampm = Number(hour) >= 12 ? "PM" : "AM";
  if (Number(hour) > 12) hour = String(Number(hour) - 12);
  const time = hour + ":" + min + " " + ampm;
  return day + "-" + month + "," + time;
};
