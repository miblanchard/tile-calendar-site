module.exports = (key, stateField) => {
  localStorage.setItem(key, JSON.stringify(stateField));
};
