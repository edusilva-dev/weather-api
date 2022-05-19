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
      city: document.querySelector('.card__location'),
      time: document.querySelector('.card__hour'),
      currently: document.querySelector('.card__weather_label'),
      temp: document.querySelector('.card__temperature'),
      wind_speedy: document.querySelector('.card__wind'),
      humidity: document.querySelector('.card__humidity'),
      minMax: document.querySelector('.card__min_max')
    }

    const currentWeather = data.forecast[0]

    for (let key in fields) {
      if (key !== 'minMax') fields[key].innerHTML = data[key] + this.getSymbol(key)
    }

    fields.minMax.innerHTML = `${currentWeather.min}°/${currentWeather.max}°`
  }

  this.getSymbol = key => {
    if (key === 'temp') return '°'
    if (key === 'humidity') return '%'
    return ''
  }
}
