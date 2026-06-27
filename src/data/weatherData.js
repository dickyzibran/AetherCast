export const cities = [
  { id: "surabaya", name: "Surabaya", lat: -7.2575, lon: 112.7521, region: "Jawa Timur, Indonesia" },
  { id: "jakarta", name: "Jakarta", lat: -6.2088, lon: 106.8456, region: "DKI Jakarta, Indonesia" },
  { id: "medan", name: "Medan", lat: 3.5952, lon: 98.6722, region: "Sumatera Utara, Indonesia" },
  { id: "palembang", name: "Palembang", lat: -2.9909, lon: 104.7567, region: "Sumatera Selatan, Indonesia" },
  { id: "bali", name: "Bali", lat: -8.4095, lon: 115.1889, region: "Indonesia" },
  { id: "tokyo", name: "Jepang", lat: 35.6762, lon: 139.6503, region: "Tokyo, Jepang" }
];

export const getWeatherCondition = (code, isDay = 1) => {
  const isNight = isDay === 0;
  

  const nightGradient = "linear-gradient(135deg, rgba(15, 23, 42, 0.45) 0%, rgba(30, 41, 59, 0.6) 100%)";
  const nightThemeColor = "#38bdf8"; 


  const conditionMap = {
    0: { 
      text: "Cerah", 
      icon: isDay ? "☀️" : "🌙", 
      gradient: isDay ? "linear-gradient(135deg, rgba(255,153,0,0.2) 0%, rgba(255,85,0,0.4) 100%)" : nightGradient, 
      themeColor: isDay ? "#ff9900" : nightThemeColor 
    },
    1: { 
      text: "Cerah Berawan", 
      icon: isDay ? "🌤️" : "🌙☁️", 
      gradient: isDay ? "linear-gradient(135deg, rgba(255,204,0,0.2) 0%, rgba(255,102,0,0.4) 100%)" : nightGradient, 
      themeColor: isDay ? "#ffcc00" : nightThemeColor 
    },
    2: { 
      text: "Sebagian Berawan", 
      icon: isDay ? "⛅" : "🌙☁️", 
      gradient: isDay ? "linear-gradient(135deg, rgba(94,163,235,0.2) 0%, rgba(58,123,213,0.4) 100%)" : nightGradient, 
      themeColor: isDay ? "#5ea3eb" : "#475569" 
    },
    3: { 
      text: "Berawan Tebal", 
      icon: "☁️", 
      gradient: isDay ? "linear-gradient(135deg, rgba(138,155,168,0.2) 0%, rgba(72,101,129,0.4) 100%)" : nightGradient, 
      themeColor: "#8a9ba8" 
    },
    45: { text: "Berkabut", icon: "🌫️", gradient: "linear-gradient(135deg, rgba(117,127,154,0.2) 0%, rgba(215,221,232,0.3) 100%)", themeColor: "#757f9a" },
    48: { text: "Kabut Rime", icon: "🌫️", gradient: "linear-gradient(135deg, rgba(117,127,154,0.2) 0%, rgba(215,221,232,0.3) 100%)", themeColor: "#757f9a" },
    51: { text: "Gerimis Ringan", icon: isDay ? "🌦️" : "🌧️", gradient: "linear-gradient(135deg, rgba(75,108,183,0.2) 0%, rgba(24,40,72,0.4) 100%)", themeColor: "#4b6cb7" },
    53: { text: "Gerimis Sedang", icon: isDay ? "🌦️" : "🌧️", gradient: "linear-gradient(135deg, rgba(75,108,183,0.2) 0%, rgba(24,40,72,0.4) 100%)", themeColor: "#4b6cb7" },
    55: { text: "Gerimis Lebat", icon: isDay ? "🌦️" : "🌧️", gradient: "linear-gradient(135deg, rgba(55,59,68,0.2) 0%, rgba(66,134,244,0.4) 100%)", themeColor: "#4286f4" },
    61: { text: "Hujan Ringan", icon: isDay ? "🌦️" : "🌧️", gradient: "linear-gradient(135deg, rgba(58,123,213,0.2) 0%, rgba(58,96,115,0.4) 100%)", themeColor: "#3a7bd5" },
    63: { text: "Hujan Sedang", icon: "🌧️", gradient: "linear-gradient(135deg, rgba(58,123,213,0.2) 0%, rgba(58,96,115,0.4) 100%)", themeColor: "#3a6073" },
    65: { text: "Hujan Lebat", icon: "⛈️", gradient: "linear-gradient(135deg, rgba(31,64,104,0.3) 0%, rgba(22,36,71,0.5) 100%)", themeColor: "#1f4068" },
    80: { text: "Hujan Rintik", icon: isDay ? "🌦️" : "🌧️", gradient: "linear-gradient(135deg, rgba(58,123,213,0.2) 0%, rgba(58,96,115,0.4) 100%)", themeColor: "#3a7bd5" },
    81: { text: "Hujan Deras", icon: "⛈️", gradient: "linear-gradient(135deg, rgba(31,64,104,0.3) 0%, rgba(22,36,71,0.5) 100%)", themeColor: "#1f4068" },
    82: { text: "Hujan Sangat Lebat", icon: "⛈️", gradient: "linear-gradient(135deg, rgba(15,27,41,0.3) 0%, rgba(22,36,71,0.6) 100%)", themeColor: "#0f1b29" },
    95: { text: "Badai Petir", icon: "🌩️", gradient: "linear-gradient(135deg, rgba(20,30,48,0.3) 0%, rgba(36,59,85,0.5) 100%)", themeColor: "#ebc000" },
    96: { text: "Badai Petir Ringan", icon: "🌩️", gradient: "linear-gradient(135deg, rgba(20,30,48,0.3) 0%, rgba(36,59,85,0.5) 100%)", themeColor: "#ebc000" },
    99: { text: "Badai Petir Lebat", icon: "⛈️", gradient: "linear-gradient(135deg, rgba(9,10,15,0.4) 0%, rgba(20,30,48,0.6) 100%)", themeColor: "#eb5757" }
  };

  return conditionMap[code] || { text: "Berawan", icon: "☁️", gradient: isNight ? nightGradient : "linear-gradient(135deg, rgba(94,163,235,0.2) 0%, rgba(58,123,213,0.4) 100%)", themeColor: isNight ? nightThemeColor : "#5ea3eb" };
};

export const fetchWeatherForCity = async (city) => {
  const { lat, lon } = city;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,pressure_msl&daily=temperature_2m_max,temperature_2m_min,uv_index_max,sunrise,sunset,weather_code&timezone=auto`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Gagal memuat data cuaca untuk kota ${city.name}`);
  }
  const data = await response.json();
  
  const current = data.current;
  const daily = data.daily;
  const condition = getWeatherCondition(current.weather_code, current.is_day);

  return {
    id: city.id,
    city: city.name,
    region: city.region,
    latitude: lat,
    longitude: lon,
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    pressure: Math.round(current.pressure_msl),
    isDay: current.is_day,
    conditionCode: current.weather_code,
    condition: condition.text,
    icon: condition.icon,
    gradient: condition.gradient,
    themeColor: condition.themeColor,
    uv: daily.uv_index_max[0],
    tempMax: Math.round(daily.temperature_2m_max[0]),
    tempMin: Math.round(daily.temperature_2m_min[0]),
    sunrise: daily.sunrise[0].split("T")[1],
    sunset: daily.sunset[0].split("T")[1],
    forecast: daily.time.map((time, idx) => {

      const forecastIsDay = (idx === 0) ? current.is_day : 1;
      const dayCode = daily.weather_code ? daily.weather_code[idx] : 3;
      const dayCond = getWeatherCondition(dayCode, forecastIsDay);
      
      const dateObj = new Date(time);
      const dayName = dateObj.toLocaleDateString("id-ID", { weekday: "short" });
      const dateString = dateObj.toLocaleDateString("id-ID", { day: "numeric", month: "short" });

      return {
        day: dayName,
        date: dateString,
        tempMax: Math.round(daily.temperature_2m_max[idx]),
        tempMin: Math.round(daily.temperature_2m_min[idx]),
        uv: daily.uv_index_max[idx],
        condition: dayCond.text,
        icon: dayCond.icon
      };
    })
  };
};
