const API_KEY = "156a63dbfb0e20b65c17b12a063c0b08";

const fetchWeather = async (lat, lon, setDays, setOk) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const json = await res.json();
    
    if (json.list) {
      const filteredList = json.list.filter(({ dt_txt }) =>
        dt_txt.endsWith("00:00:00")
      );
      setDays(filteredList);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    setOk(false);
  }
};

export default fetchWeather;
