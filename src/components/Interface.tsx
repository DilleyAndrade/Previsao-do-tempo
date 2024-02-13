import { ArrowDown, ArrowUp, Drop } from "@phosphor-icons/react/dist/ssr"

interface InterfaceProps{
  cityName: string
  tempValue: string
  descriptionWeather: string
  weatherIcon?: any
  maxTemp: string
  minTemp: string
  humidity: string
  windSpeed: string
  day:string
  date: string
}

export default function Interface({
  cityName, 
  tempValue,
  descriptionWeather, 
  weatherIcon, 
  maxTemp, 
  minTemp, 
  humidity, 
  windSpeed, 
  day, 
  date}:InterfaceProps) {
    
  return (
    <main>
      <div className="flex flex-wrap items-center text-white justify-between">
        <h2 className="text-6xl font-bold">{cityName}</h2>
        <div className="flex gap-2">
          <h3 className="flex items-center text-2xl"><ArrowUp size={25} />{minTemp}°</h3>
          <h3 className="flex items-center text-2xl"><ArrowDown size={25} />{maxTemp}°</h3>
        </div>
      </div>
      <div className="flex flex-wrap items-start">
        <div>
          <h3 className="text-2xl">{day}</h3>
          <h4 className="text-xl">{date}</h4>
          <h5>Vento:{windSpeed}Km/h</h5>
          <h4 className="text-xl flex flex-wrap items-center"><Drop size={30} />{humidity}%</h4>
        </div>
        <div className="flex flex-col flex-wrap items-center">
          <h1>{weatherIcon}</h1>
          <h3 className="text-2xl">{descriptionWeather}</h3>
        </div>
        <h1 className="text-7xl">{tempValue}°</h1>
      </div>
    </main>
  )
}
