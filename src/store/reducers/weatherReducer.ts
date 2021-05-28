import {
  WeatherState,
  WeatherAction,
  GET_WEATHER,
  SET_ERROR,
  SET_LOADING,
  SET_ERROR_FALSE
} from "../types";

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

const weatherReducer = (state = initialState, action: WeatherAction): WeatherState => {
  switch (action.type) {
    case GET_WEATHER:
      return {
        data: action.payload,
        loading: false,
        error: {
          isError: false},
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: {
          isError: true,
          message: action.payload},
        loading: false,
      };
    case SET_ERROR_FALSE:
      return{
        ...state,
        error: {
          isError: false
        }
      }
    default:
      return state;
  }
};

export default weatherReducer