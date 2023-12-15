// format the date
export function formatDateString(dateString: string) {
  const dateObject = new Date(dateString);
  return dateObject.toLocaleString();
}
