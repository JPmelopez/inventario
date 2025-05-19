export const getData = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const updateData = (key, id, newData) => {
  const data = getData(key);
  const updatedData = data.map(item => item.id === id ? {...item, ...newData} : item);
  saveData(key, updatedData);
  return updatedData;
};

export const deleteData = (key, id) => {
  const data = getData(key);
  const filteredData = data.filter(item => item.id !== id);
  saveData(key, filteredData);
  return filteredData;
};