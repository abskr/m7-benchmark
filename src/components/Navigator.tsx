import React, { useState }from 'react';
import {Button, FormControl, Form, Modal} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import styled from 'styled-components';
import { setAlert } from '../store/actions/alert';
import { getWeather, setLoading, setErrorFalse } from '../store/actions/weather'

const Navigator = () => {
  const [ cityInput, setCityInput ] = useState<string>('')
  const [ unitInput, setUnitInput ] = useState<string>("metric")

  const error = useSelector((state: RootState) => state.weather.error);
  const dispatch = useDispatch()

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target
    setCityInput(value)
    console.log(event)
    console.log(cityInput)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setUnitInput(value)
  }
  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (cityInput.trim() === "" ){
      return dispatch(setAlert("INPUT A CITY NAME"))
    }
    dispatch(setLoading())
    dispatch(getWeather(cityInput, unitInput))
  }

  const handleClose = () => dispatch(setErrorFalse())

  return (
    <>
      <Modal
        show={error?.isError}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>No city found!</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <FormSearch onSubmit={handleSubmit}>
          <SearchBox>
            <FormControl
              placeholder='Enter a city name...'
              name='cityInput'
              onChange={handleInput}
              aria-describedby='basic-addon2'
            />
            <RadioBox>
              <InnerRadioBox>
                <input
                  value='metric'
                  name='unit'
                  type='radio'
                  onChange={handleChange}
                />
                <Units>°C</Units>
              </InnerRadioBox>
              <InnerRadioBox>
                <input
                  value='imperial'
                  name='unit'
                  type='radio'
                  onChange={handleChange}
                />
                <Units>°F</Units>
              </InnerRadioBox>
            </RadioBox>
            <Button
              variant='outline-secondary'
              id='button-addon2'
              type='submit'
            >
              Go!
            </Button>
          </SearchBox>
        </FormSearch>
        </>
  );
};

const FormSearch = styled(Form)`
  position: fixed;
  right: 1rem;
  top: 1rem
`;

const Units = styled.span`
  color: black;
`
const SearchBox = styled.div`
  width: 40rem;
  min-width: 30rem;
  display: flex;
  flex-direction: row
`

const RadioBox = styled.div`
  margin-left: 3px;
  margin-right: 3px;
  display: flex;
  flex-direction: column
`
const InnerRadioBox = styled.div`
  display: flex;
  align-items: baseline
`


export default Navigator;