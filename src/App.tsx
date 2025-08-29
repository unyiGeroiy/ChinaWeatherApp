import { useState, useEffect} from 'react'
import './App.css'
import icon from './assets/react.svg'


function App() {
  const [city, setCity] = useState<string>('Moscow');
  const [weather, setWeather] = useState<any>(null); // eslint-disable-line

  const weatherFetch = () =>{
    const api_key = 'c96c6305fba278fca2a8d083855e9acb';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric&lang=ru`)
      .then(response => response.json())
      .then(data =>{
        setWeather(data);
      })
      .catch(error => {
        console.error(error);
      });

  };
  useEffect(() => {
    weatherFetch();
  }, [])

  return (
    <>
    <div className='flex flex-col items-center'>
      <div className='flex justify-center mt-6'>
      <div className='shadow-md rounded-xl min-w-220 min-h-100 bg-green-700 gap-6'>
        {weather ?(
        <>
        <div className='text-white pt-4 flex justify-between'>
          
              
                <p className='font-bold pl-2 text-[30px]'>{weather.name}</p>
                <p className='font-bold pr-2 text-[30px]'>{Math.round(weather.main.temp)}°C</p>
              
            
        </div>
        <div className='flex justify-center'>
          <img src={icon} alt="" className='pt-20' />
        </div>
        <div className='text-white pt-25 flex justify-between'>
            <p className='font-bold pl-2 text-[25px]'>Ощущается как: {Math.round(weather.main.temp)} °C</p>
            <p className='font-bold pr-2 text-[25px]'>Ветер: {Math.round(weather.wind.speed)} м/с </p>
        </div>
        </>
        ) : (
              <p className='font-bold pl-2 text-[30px]'>Загрузка...</p>
            )}
      </div>
      </div>
      <div className='grid grid-cols-5 justify-center mt-10 min-h-45 min-w-220 gap-8'>
            <div className='bg-green-700 shadow-md rounded-xs'>
              <div className='flex justify-center mt-8'>
                <img src={icon} alt="" />
              </div>
              <div className='font-bold'>
                <p className='text-white pr-2 pt-3'>16 c</p>
                <p className='text-white pl-2 pt-3'>День недели</p>
              </div>
            </div>
            <div className='bg-green-700 shadow-md rounded-xs'>2</div>
            <div className='bg-green-700 shadow-md rounded-xs'>3</div>
            <div className='bg-green-700 shadow-md rounded-xs'>4</div>
            <div className='bg-green-700 shadow-md rounded-xs'>5</div>
      </div>
    </div>
    </>
  )
}

export default App
