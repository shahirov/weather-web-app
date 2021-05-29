# ☔️ Weather Web Application

[![Dependency Status](https://david-dm.org/shahirov/weather-web-app.svg)](https://david-dm.org/shahirov/weather-web-app)
[![devDependency Status](https://david-dm.org/shahirov/weather-web-app/dev-status.svg)](https://david-dm.org/shahirov/weather-web-app?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/shahirov/weather-web-app/badge.svg)](https://snyk.io/test/github/shahirov/weather-web-app)

Ознакомиться с приложением можно [здесь](http://my-weather-web-app.surge.sh/).

Погодное приложение, созданное на React. В приложении присутствует полноценная авторизация пользователя с валидацией как на стороне клиента, так и на стороне сервера. Позволяет пользователю искать погоду в своих городах и сохранять их в избранное. При клике на карточку с городом, можно узнать детальную информацию прогноза погоды на ближайшие 5 дней.

Код выполняется на стороне клиента, и вам нужно будет предоставить свой собственный <API_KEY> из openweathermap, а также для firebase, если вы хотите расширить проект.

## Покажите мне

![example](/screenshots/home-page.png)
![example](/screenshots/add-page.png)
![example](/screenshots/details-page.png)
![example](/screenshots/login-page.png)

## Цели и результат

- Авторизация пользователя с валидацией на стороне клиента и сервера ✔
- Загрузка и рендер избранных городов с погодными температурами из firebase storage ✔
- Сохранение города в избранные ✔
- Загрузка и рендер прогноза погоды на ближайшие 5 дней для конкретного города с детальной информацией. ✔
- Переключение темы на светлую/темную ✔
- Респонсивность и прелоадер во время процесса авторизации при заходе в первый раз на страницу. ✔

## Использованные технологии в приложении

- [TypeScript](https://www.typescriptlang.org/)
- [PostCSS](https://github.com/postcss/postcss)
- [Babel](https://github.com/babel/babel)
- [Webpack](https://github.com/webpack/webpack)
- [React](https://github.com/facebook/react) & [React DOM](https://github.com/facebook/react)
- [Firebase](https://github.com/firebase/firebase-js-sdk)
- [React Router](https://github.com/ReactTraining/react-router)
- [Redux Toolkit](https://github.com/reduxjs/redux-toolkit)
- [React Redux](https://github.com/reduxjs/react-redux)
- [Downshift](https://github.com/downshift-js/downshift)
- [Styled Components](https://github.com/styled-components)
- [ESLint](https://github.com/eslint/eslint)

## Использованные API:

1. API погоды - openweathermap.org
2. API геоданных - http://geodb-free-service.wirefreethought.com/v1

## Запуск приложения

1. Убедитесь, что у вас установлен Node.js v12.18.0 и npm v6 или выше
2. Клонируйте репозиторий с помощью `git clone https://github.com/shahirov/weather-web-app.git`.
3. Переходите в соотвествующий каталог командой `cd weather-web-app`<br />
4. Установите пакеты `npm install`<br />
5. Теперь запускаем приложение командой `npm start` и открываем его по адресу `http://localhost:8000`
