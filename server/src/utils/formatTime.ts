// 18:00 -> 1080
function convertHourStringToMinutesNumber(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number);

  const minutesAmount = hours * 60 + minutes;

  return minutesAmount;
}

// 1080 -> 18:00
function convertMinutesNumberToHourString(minutesNumber: number) {
  let hours = String(Math.floor(minutesNumber / 60)).padStart(2, "0");
  const minutes = String(minutesNumber % 60).padStart(2, "0");

  if (hours == "24") {
    hours = "00";
  }

  const hourString = `${hours}:${minutes}`;

  return hourString;
}

export { convertHourStringToMinutesNumber, convertMinutesNumberToHourString };
