function getYesterdayDate() {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(today.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = ("0" + (yesterday.getMonth() + 1)).slice(-2);
  const day = ("0" + yesterday.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

function getPreviousDate(dateString) {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
}

module.exports = { getYesterdayDate, getPreviousDate };
