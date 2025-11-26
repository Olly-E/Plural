import dayjs from "dayjs";

export const formatAmount = (number: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const getFormattedDate = (date: Date | string) => {
  return dayjs(date ? date : new Date()).format("ddd DD MMMM, YYYY");
};

export const convertTo12HourWithout = (time24: string) => {
  const [hours, minutes] = time24?.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12 // Convert 0 -> 12 for midnight
  return `${hours12?.toString()?.padStart(2, '0')}:${minutes?.toString().padStart(2, '0')} ${period}`
}

