import { useState } from "react";
import axios from "axios"; // حتماً یادت باشد اکسوس را ایمپورت کنی

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  const getWeatherData = async () => {
    if (!city) return; // اگر کادر خالی بود، کاری نکن

    setLoading(true);
    setError(null);

    try {
      // مرحله ۱: پیدا کردن مختصات شهر از روی نام آن
      const geoResponse = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`,
      );

      // چک می‌کنیم آیا اصلاً شهری با این نام پیدا شد؟
      if (!geoResponse.data.results) {
        throw new Error("شهر پیدا نشد!");
      }

      const { latitude, longitude, name } = geoResponse.data.results[0];

      // مرحله ۲: حالا که مختصات را داریم، آب و هوا را می‌گیریم
      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
      );

      setWeatherData(weatherResponse.data.current_weather);
      console.log(`آب و هوای ${name} دریافت شد!`);
    } catch (err) {
      setError(err.message || "خطایی رخ داد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 text-center">
      <h1 className="text-xl font-bold mb-4">اپلیکیشن هواشناسی </h1>
      <input
        className="px-2 py-2 rounded-sm border"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="نام شهر را به انگلیسی وارد کن..."
        type="text"
      />
      <button
        disabled={city.length < 3}
        onClick={getWeatherData}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        وضعیت آب و هوا
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {weatherData && (
        <div
          className={`mt-6 p-4 border rounded  ${weatherData.temperature > 25 ? "bg-red-600" : "bg-green-600"}`}
        >
          <h2 className="text-lg font-semibold">اطلاعات فعلی:</h2>
          <p>دمای فعلی: {weatherData.temperature} درجه سانتی‌گراد</p>
          <p>سرعت باد: {weatherData.windspeed} کیلومتر بر ساعت</p>
          <p>زمان : {weatherData.time}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
