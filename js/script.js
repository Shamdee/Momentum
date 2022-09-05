import * as audioPlayer from "./audioPlayer.js"
const time = document.querySelector('.time')
const date = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const input = document.querySelector('.name')
const body = document.querySelector('.body')
const timeOfDay = getTimeOfDay()
let randomNum
const slidePrev = document.querySelector('.slide-prev')
const slideNext = document.querySelector('.slide-next')
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const city = document.querySelector('.city')
const quote = document.querySelector('.quote')
const author= document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')

//Settings
const settingsTitle = document.querySelector('.settings-title')
const settings = document.querySelector('.settings')

const state = {
  language: ['en', 'ua'],
  photoSource: ['github', 'unsplash', 'flickr'],
  blocks: ['time', 'date', 'greeting', 'quote', 'weather', 'audio']
}

let mySettings = {
  language: 'en',
  photoSource: 'github',
  blocks: ['time', 'date', 'greeting', 'quote', 'weather', 'audio']
}



//Time and Calendar
function showTime() {
  const now = new Date()
  const currentTime = now.toLocaleTimeString()
  time.textContent = currentTime
  setTimeout(showTime, 1000)
  showDate()
  getTimeOfDay()
  showGreeting()
}
showTime()

function showDate() {
  const now = new Date()
  const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'}
  const currentDate = now.toLocaleDateString('en-En', options)
  date.textContent = currentDate
}

//Greeting
function getTimeOfDay() {
  const now = new Date()
  const hours = now.getHours()
  if(hours >= 6 && hours < 12) {
    return 'morning'
  } else if(hours >= 12 && hours < 18) {
    return 'afternoon'
  } else if(hours >= 18 && hours <= 23) {
    return 'evening'
  } else {
    return 'night'
  }
}

function showGreeting() {
  greeting.textContent = `Good ${timeOfDay},`
}

//LocalStorage
function setLocalStorage() {
  localStorage.setItem('name', input.value)
  localStorage.setItem('city', city.value)
  localStorage.setItem('mySettings', JSON.stringify(mySettings))

}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    input.value = localStorage.getItem('name')
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city')
  }else {
    city.value = 'Minsk'
  }
  getWeather()
  if (localStorage.getItem('mySettings')) {
    mySettings = localStorage.getItem('mySettings')
    mySettings = JSON.parse(mySettings)
    let index = state.photoSource.indexOf(mySettings.photoSource)
      bg[index].checked = true
    if (bg[1].checked) {
      getLinkToImageUnsplash()
    } else if (bg[2].checked) {
      getLinkToImageFlickr()
    } else {
      setBg()
    }
  }
}
window.addEventListener('load', getLocalStorage)


//Image Background
function getRandomNum(min, max) {
  randomNum = Math.floor(Math.random() * (max - min) + min)
}
getRandomNum(1, 21)

function setBg() {
  const img = new Image()
  const bgNum = randomNum.toString().padStart(2, '0')
  img.src = `https://github.com/Shamdee/stage1-tasks/raw/assets/images/${timeOfDay}/${bgNum}.jpg`
  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`
  }
  mySettings.photoSource = state.photoSource[0]
}
setBg()
function checkBg() {
  if(getComputedStyle(body).backgroundImage === 'none, none') {
    setBg()
  }
}


//Image slider
function getSlideNext() {
if(bg[1].checked){
  getLinkToImageUnsplash()
}else if(bg[2].checked){
  getLinkToImageFlickr()
}else{
  if (randomNum === 20){
    randomNum = 1
  } else {
    randomNum++
  }
  setBg()
}
}

function getSlidePrev() {
  if(bg[1].checked){
    getLinkToImageUnsplash()
  }else if(bg[2].checked){
    getLinkToImageFlickr()
  }else{
    if (randomNum === 1){
        randomNum = 20
      }else{
        randomNum--
      }
    setBg()
  }
}

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

//Weather
async function getWeather() {
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=1bfe73ea1e205a36275532c4cdf448dc&units=metric`
  const res = await fetch(url)
  const data = await res.json()
  if (data.cod) {
    weatherDescription.textContent = `error: ${data.message}`
    temperature.textContent = ''
    wind.textContent = ''
    humidity.textContent = ''
  }
  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`)
  temperature.textContent = `${Math.floor(data.main.temp)}°C`
  weatherDescription.textContent = data.weather[0].description
  wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`
  humidity.textContent = `Humidity: ${data.main.humidity}%`
}

city.addEventListener('change', getWeather)

//Quotes
async function getQuotes() {
  const quotes = 'assets/quotes/quotes_en.txt'
  const res = await fetch(quotes)
  const data = await res.json()
  const num = Math.floor(Math.random() * data.length)
  quote.textContent = data[num].text
  author.textContent = data[num].author
  changeQuote.addEventListener('click', getQuotes)
}
getQuotes()

// bg images api
async function getLinkToImageUnsplash() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=B27M0_3e0TjHe5LYauakdOws-dwlw9Ywnp3V1y3DmcM`
  const res = await fetch(url)
  const data = await res.json()
  const image = data.urls.regular
  body.style.backgroundImage = `url('${image}')`
  mySettings.photoSource = state.photoSource[1]
}


async function getLinkToImageFlickr() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=01b29ee6116cffaf28c0d15b3f40be82&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`
  const res = await fetch(url)
  const data = await res.json()
  const num = Math.floor(Math.random() * 100)
  const image = data.photos.photo[num].url_l
  body.style.backgroundImage = `url('${image}')`
  mySettings.photoSource = state.photoSource[2]
}

const bg = document.querySelectorAll('.change-bg input')
bg[0].addEventListener('click', setBg)
bg[1].addEventListener('click', getLinkToImageUnsplash)
bg[2].addEventListener('click', getLinkToImageFlickr)

settingsTitle.addEventListener('click', () => {
  settings.classList.toggle('hide')
})

const widgets = document.querySelectorAll('.hide-item input')


widgets.forEach(item => {
  item.addEventListener('click', (e) => {
    const id = document.getElementById(e.target.name)
    id.classList.toggle('hide')
  })
});