import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(`${chalk.bgRed(" ERROR ")} ${error}`);
};

const printSuccess = (msg) => {
  console.log(`${chalk.bgGreen(" Success ")} ${msg}`);
};

const printHelper = () => {
  console.log(
    dedent`${chalk.black.bgMagentaBright(" HELP ")}
    ${chalk.bold("Без параметров")} - вывод погоды
    ${chalk.bold("-s [CITY]")} - для установки города
    ${chalk.bold("-h")} - для вывода помощи
    ${chalk.bold("-t [API_KEY] ")} - для сохранения своего токена
    ${chalk.bold("-d")} - для удаления собственного токена
    https://home.openweathermap.org/api_keys - создать токен
    `
  );
};

const printWeather = (data, icon) => {
  const strCity = `${chalk.bold.black.bgBlueBright(
    " WEATHER "
  )} Погода в ${chalk.cyan(data.name)}`;

  const strDescription = `${icon}  ${data.weather[0].description}`;

  const strTemp = `${chalk.yellowBright("Температура")}: ${chalk.bold(
    Math.floor(data.main.temp) + "°"
  )} (ощущается как ${chalk.bold(Math.floor(data.main.feels_like) + "°")})`;

  const strHumidity = `${chalk.blueBright("Влажность")}: ${chalk.bold(
    Math.floor(data.main.humidity) + "%"
  )}`;

  const strWindSpeed = `${chalk.magentaBright("Скорость ветра")}: ${chalk.bold(
    Math.floor(data.wind.speed)
  )} м/с`;

  console.log(dedent`${strCity} 
  ${strDescription}
  ${strTemp}
  ${strHumidity}
  ${strWindSpeed}`);
};

export { printError, printSuccess, printHelper, printWeather };
