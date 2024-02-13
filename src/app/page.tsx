'use client'

import Interface from "@/components/Interface";
import { useEffect, useState } from "react";
import { apiKey } from "../../data/data";
import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, MagnifyingGlass, SoundcloudLogo, Sun } from "@phosphor-icons/react/dist/ssr";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale";

export default function Home() {
  
  const [weather, setWeather] = useState<any>('')
  const [city, setCity] = useState('recife')
  const [newcity, setNewCity] = useState('')
  const date = format(new Date(), "dd'/'MM'/'yyyy", {
    locale: ptBR
  })

  const day = format(new Date(), "EEEE", {
    locale: ptBR
  })

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&appid=${apiKey}&units=metric`)
        const data = await res.json()
        setWeather(data)
      }catch(error){
        console.error('Failed to fetch data!', error)
      }
    }
    fetchData()
  },[city])

  function changeCity(e:any){
    e.preventDefault()
    setCity(newcity)
    setNewCity('')
  }

  return (
    <>
      {weather && (
        <div>
          <header className="flex flex-col justify-center items-center bg-gradient-to-tl from-cyan-400 to-blue-500 p-6 rounded-2xl">
            <h1 className="text-5xl mb-2 font-bold">- Tempo Certo -</h1>
            <form className="flex" onSubmit={changeCity}>
              <input 
                className="text-black h-12 rounded-s-full text-center text-xl outline-none" 
                placeholder="Informe sua cidade"
                type="text"
                value={newcity}
                required
                onChange={(e)=> {setNewCity(e.target.value)}}
              />
              <button 
                className="h-12 rounded-e-full px-4 bg-white"
                type="submit"
              >
                <MagnifyingGlass size={30} color="#808080" weight="bold" />
              </button>
            </form>
            
          </header>
          <main className="flex flex-col justify-center items-center bg-gradient-to-tl from-cyan-400 to-blue-500 p-6 rounded-2xl mt-3">
            <Interface 
              key={weather.name}
              cityName={weather.name}
              tempValue={weather.main.temp}
              descriptionWeather={weather.weather[0].description}
              weatherIcon={
                weather.weather[0].description === 'nuvens dispersas' && (<Cloud size={200}/>) || 
                weather.weather[0].description === 'algumas nuvens' && (<CloudSun size={200}/>) ||
                weather.weather[0].description === 'céu limpo' && (<Sun size={200}/>) ||
                weather.weather[0].description === 'nublado' && (<CloudFog size={200}/>) ||
                weather.weather[0].description === 'chuva de chuveiro' && (<CloudRain size={200}/>) ||
                weather.weather[0].description === 'chuva' && (<CloudRain size={200}/>) ||
                weather.weather[0].description === 'tempestade' && (<CloudLightning size={200}/>) ||
                weather.weather[0].description === 'neve' && (<CloudSnow size={200}/>) ||
                weather.weather[0].description === 'névoa' && (<SoundcloudLogo size={200}/>)
              }
              maxTemp={weather.main.temp_max}
              minTemp={weather.main.temp_min}
              humidity={weather.main.humidity}
              windSpeed={weather.wind.speed}
              day={day}
              date={date}
            />
          </main>
          <footer>
            <p className="text-xl text-center">&copy;Desenvolvido por Dilley Andrade</p>
          </footer>
        </div>
      )}
    </>
  );
}
