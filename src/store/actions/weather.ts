import { ThunkAction } from 'redux-thunk'
import { RootState } from '../index'
import { WeatherAction, WeatherData, WeatherError, GET_WEATHER, SET_LOADING, SET_ERROR, SET_ERROR_FALSE } from '../types'

export const getWeather = (city: string, unit: string) : ThunkAction<void, RootState, null, WeatherAction> => {
  return async dispatch => {
    try {
      const unitQuery: string = `&units=${unit}`
      const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}${unitQuery}&appid=${process.env.REACT_APP_API_KEY}`)
      if (!resp.ok) {
        const data : WeatherError = await resp.json()
        throw new Error(data.message)
      }
      const data : WeatherData = await resp.json()
      dispatch({
        type: GET_WEATHER,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      })
    }
  }
}

export const setLoading = () : WeatherAction => {
  return {
    type: SET_LOADING
  }
}

export const setError = () : WeatherAction => {
  return {
    type: SET_ERROR,
    payload: ''
  }
}

export const setErrorFalse = () : WeatherAction => {
  return {
    type: SET_ERROR_FALSE
  }
}
