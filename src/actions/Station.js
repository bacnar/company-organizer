export const fetchStations = () => {
  return { type: "FETCH_STATIONS" };
};

export const fetchStationsSuccess = (stations) => {
  return {
    type: "FETCH_STATIONS_SUCCESS",
    payload: stations,
  };
};

export const fetchStationsFail = () => {
  return { type: "FETCH_STATIONS_FAIL" };
};

export const addStation = (name) => {
  return {
    type: "ADD_STATION",
    payload: {
      name,
    },
  };
};

export const addStationSuccess = () => {
  return { type: "ADD_STATION_SUCCESS" };
};

export const addStationFail = () => {
  return { type: "ADD_STATION_FAIL" };
};

export const deleteStation = (id) => {
  return { type: "DELETE_STATION", payload: id };
};

export const deleteStationSuccess = () => {
  return { type: "DELETE_STATION_SUCCESS" };
};

export const deleteStationFail = () => {
  return { type: "DELETE_STATION_FAIL" };
};

export const updateStation = (id, name) => {
  return {
    type: "UPDATE_STATION",
    payload: {
      id,
      name,
    },
  };
};

export const updateStationSuccess = () => {
  return { type: "UPDATE_STATION_SUCCESS" };
};

export const updateStationFail = () => {
  return { type: "UPDATE_STATION_FAIL" };
};
