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
    default:
      return state;
  }
};
