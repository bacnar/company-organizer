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
