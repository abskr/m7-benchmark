import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index'
import { RouteComponentProps } from 'react-router-dom'
import Loader from '../components/Loader';
import { getWeather, setLoading } from '../store/actions/weather';
import styled from 'styled-components'


const Homepage = (props: RouteComponentProps) => {

    const dispatch = useDispatch();
    const weatherData = useSelector((state: RootState) => state.weather.data);
    const loading = useSelector((state: RootState) => state.weather.loading);

 

    useEffect(() => {
      dispatch(setLoading());
      dispatch(getWeather('Berlin',  'metric'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
    <>
      <Container
        style={{
          backgroundImage: `url(https://picsum.photos/1300/900/?blur=10)`,
          backgroundSize: 'cover',
        }}
      >
        {loading && <Loader />}
        {weatherData && (
          <GridMainContainer>
            <LeftGrid>
              <CityHead>{weatherData.name}</CityHead>
              <TemperatureBox>
                <TempNum>{Math.floor(weatherData.main.temp)}°</TempNum>
                <WeatherIcon
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt='weather icon'
                />
              </TemperatureBox>
              <FeelsLike>
                feels like {Math.floor(weatherData.main.feels_like)}°
              </FeelsLike>
            </LeftGrid>
            <RightGrid>
              <Humidity>
                <span>Humidity</span>
                <span>{weatherData.main.humidity} %</span>
              </Humidity>
              <MinMaxTemp>
                <MinTemp>
                  <span>lowest temprature</span>
                  <span>{Math.floor(weatherData.main.temp_min)}°</span>
                </MinTemp>
                <MaxTemp>
                  <span>highest temprature</span>
                  <span>{Math.floor(weatherData.main.temp_max)}°</span>
                </MaxTemp>
              </MinMaxTemp>
            </RightGrid>
          </GridMainContainer>
        )}
      </Container>
    </>
  );
};

const GridMainContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 50% 50%;
  position: fixed;
  bottom: 0
`

const LeftGrid = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.7);
  flex-direction: column;
  margin: 1.5rem;
  padding: 1.5rem;
  border-radius: 10px;
`;

const CityHead = styled.h1`
  margin: 0;
  font-size: 3rem
`

const TemperatureBox = styled.div`
  position: relative
`

const TempNum = styled.span`
  font-size: 14rem;
  margin-left: 1.5rem
`

const WeatherIcon = styled.img`
  position: absolute;
  top: 0;
  right: 80px
`

const FeelsLike = styled.span`
`

const RightGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1.5rem;

`;

const Humidity = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 1rem;
  & > span {
    font-size: 3rem
  }
`;

const MinMaxTemp = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  height: 3rem;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 50% 50%;
  text-align: center;
  overflow: hidden;
`;

const MinTemp = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const MaxTemp = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Container = styled.div`
height: 100%;
width: 100%;  
background-color: black;
display: flex;
align-items: center;
justify-content: center;
`

export default Homepage;