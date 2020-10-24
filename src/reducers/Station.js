const initState = {
  stations: [],
  stationsLoading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "FETCH_STATIONS":
      return {
        ...state,
        stationsLoading: true,
      };
    case "FETCH_STATIONS_SUCCESS":
      return {
        ...state,
        stations: action.payload,
        stationsLoading: false,
      };
    case "FETCH_STATIONS_FAIL":
      return {
        ...state,
        stationsLoading: false,
      };
    case "ADD_STATION":
    case "ADD_STAION_SUCCESS":
    case "ADD_STATION_FAIL":
    case "DELETE_STATION":
    case "DELETE_STATION_SUCCESS":
    case "DELETE_STATION_FAIL":
    case "UPDATE_STATION":
    case "UPDATE_STATION_SUCCESS":
    case "UPDATE_STATION_FAIL":
      return {
        ...state,
      };
    default:
      return state;
  }
};
