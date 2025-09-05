import { useState, useEffect} from 'react'
import './App.css'


function App() {
  const [city, setCity] = useState<string>('Moscow');
  const [weather, setWeather] = useState<any>(null); // eslint-disable-line
  const [forecast, setForecast] = useState<any[]>([]); //eslint-disable-line

  const api_key = 'c96c6305fba278fca2a8d083855e9acb';

  const weatherFetch = () =>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric&lang=ru`)
      .then(response =>{
        if (!response.ok){
          if (response.status === 404){
            throw new Error('404  Город не найден');
          } else if(response.status >= 500){
            throw new Error('Ошибка сервера');
          } else{
            throw new Error('Ошибка');
          }
        }
        return response.json()})
      .then(data =>{
        setWeather(data);
      })
      .catch(error => {
        console.error(error);
      });

  };

  const forecastFetch = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric&lang=ru`)
      .then(response => response.json())
      .then(data => {
          const daily = [];

          for (const item of data.list){
            const date = new Date(item.dt*1000);
            const hours = date.getUTCHours();

            if (hours === 12){
              daily.push(item);
            }
          }
          setForecast(daily.slice(0, 5));
      })
      .catch(error => {
        console.error(error);
      });
      
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    weatherFetch();
    forecastFetch();
  }

  const getDayName = (count: number):string => {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const today = new Date();

    const todayIndex = today.getDay();
    const newDayIndex = (todayIndex + count) % 7;

    return days[newDayIndex];
  }

  useEffect(() => {
    weatherFetch();
    forecastFetch();
  }, [])

  const getWeatherIconUrl = (iconId: string) => {
    return `https://openweathermap.org/img/wn/${iconId}@2x.png`
  }

  return (
    <>
    <div className='flex flex-col items-center'>
      <form onSubmit={handleSubmit}>
      <div className='border-3 rounded-lg bg-sky-300 border-green-900 font-bold'>
        <input type="text" placeholder='Введите город' value={city} onChange={handleCityChange}/>
      </div>
      </form>
      <div className='flex justify-center mt-6'>
      <div className='shadow-md rounded-xl min-w-220 min-h-100 bg-green-700 gap-6'>
        {weather ?(
        <>
        <div className='text-white pt-4 flex justify-between'>
          
              
                <p className='font-bold pl-2 text-[30px]'>{weather.name}</p>
                <p className='font-bold pr-2 text-[30px]'>{Math.round(weather.main.temp)}°C</p>
              
            
        </div>
        <div className='flex justify-center'>
          <img src={getWeatherIconUrl(weather.weather[0].icon)} alt="" className='pt-20' />
        </div>
        <div className='text-white pt-25 flex justify-between'>
            <p className='font-bold pl-2 text-[25px]'>Ощущается как: {Math.round(weather.main.feels_like)} °C</p>
            <p className='font-bold pr-2 text-[25px]'>Ветер: {Math.round(weather.wind.speed)} м/с </p>
        </div>
        </>
        ) : (
              <p className='font-bold pl-2 text-[30px]'>Загрузка...</p>
            )}
      </div>
      </div>
      <div className='grid grid-cols-5 justify-center mt-10 min-h-45 min-w-220 gap-8'>
      {forecast ?(
        forecast.map((day, index) =>(
        
            <div className='bg-green-700 shadow-md rounded-xs' key={index}>
              <div className='flex justify-center mt-8'>
                <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="" />
              </div>
              <div className='font-bold' key={index}>
                <p className='text-white pr-2 pt-3'>{Math.round(day.main.temp)}°C</p>
                <p className='text-white pt-3'>{getDayName(index+1)}</p>
              </div>
            </div>
           
            
            ))
            ) : (
              <p className='font-bold pl-2 text-[30px]'>Загрузка...</p>
            )}
      
      </div>
    </div>
    </>
  )
}

export default App
