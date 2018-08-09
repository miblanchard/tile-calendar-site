module.exports = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const suffix = hours < 12 ? 'AM' : 'PM';
  if (hours > 12 || hours === 0) {
    hours = Math.abs(hours - 12);
  }
  if (minutes < 10) {
    minutes = `0${minutes.toString()}`;
  }
  return `${hours}:${minutes} ${suffix}`;
};
