import env from '../env.js'

window.onload = () => {
  new Weather().init()
}

function Weather() {
  this.init = async () => {
    const data = await this.getData()
    this.setInfos(data)
  }

  this.getData = async () => {
    const response = await fetch(
      `${env.API_URL}?key=${env.API_KEY}&city_name=Porto+Alegre,RS&format=json-cors`,
      {
        method: 'GET'
      }
    )

    return (await response.json()).results
  }

  this.setInfos = data => {
    const fields = {
      location: document.querySelector('.card__location'),
      hour: document.querySelector('.card__hour'),
      label: document.querySelector('.card__weather_label'),
      temperature: document.querySelector('.card__temperature'),
      minMax: document.querySelector('.card__min_max'),
      humidity: document.querySelector('.card__humidity'),
      wind: document.querySelector('.card__wind')
    }

    const currentWeather = data.forecast[0]

    fields.location.innerHTML = data.city
    fields.hour.innerHTML = data.time
    fields.label.innerHTML = data.currently
    fields.temperature.innerHTML = `${data.temp}°`
    fields.minMax.innerHTML = `${currentWeather.min}°/${currentWeather.max}°`
    fields.humidity.innerHTML = `${data.humidity}%`
    fields.wind.innerHTML = data.wind_speedy
  }
}
