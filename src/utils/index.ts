export function formatDateInWords(dateString: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = `${day}- ${months[monthIndex]} - ${year}`;
  return formattedDate;
}

export function getNestedAttribute(obj: any, keys: string[]): any {
  if (keys.length === 0) {
    return obj;
  }

  const [currentKey, ...remainingKeys] = keys;

  if (
    obj !== null &&
    obj !== undefined &&
    typeof obj === "object" &&
    currentKey in obj
  ) {
    return getNestedAttribute(obj[currentKey], remainingKeys);
  }

  return undefined;
}
