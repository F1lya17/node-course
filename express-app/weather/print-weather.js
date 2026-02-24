export const printWeather = (data) => {
  const strCity = `Погода в ${data.name}`;

  const strDescription = data.weather[0].description;

  const strTemp = `Температура: ${data.main.temp}°, (ощущается как ${data.main.feels_like}°)`;

  const strHumidity = `Влажность: ${data.main.humidity}%`;

  const strWindSpeed = `Скорость ветра: ${data.wind.speed} м/с`;

  return `${strCity} 
  ${strDescription}
  ${strTemp}
  ${strHumidity}
  ${strWindSpeed}`;
};
