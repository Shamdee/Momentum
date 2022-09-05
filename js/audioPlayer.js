import playList from "./playList.js"


const playBtn = document.querySelector('.play')
const playPrevBtn = document.querySelector('.play-prev')
const playNextBtn = document.querySelector('.play-next')
const audio = new Audio()
let isPlay = false
let playNum = 0

function playAudio(){
  audio.src = playList[playNum].src
  audio.currentTime = 0
  if (isPlay) {
    audio.pause()
    isPlay = false
    playBtn.classList.remove('pause')
  } else {
    audio.play()
    isPlay = true
    playBtn.classList.add('pause')
  }
    items[playNum].classList.add('item-active') 
}

function playNext() {
  items[playNum].classList.remove('item-active')

  if (playNum === playList.length-1){
    playNum = 0
  }else{
    playNum++
  }
  isPlay = false
  playAudio()
}

function playPrev() {
  items[playNum].classList.remove('item-active')

  if (playNum === 0){
    playNum = playList.length-1
  }else{
    playNum--
  }
  isPlay = false
  playAudio()
}

playBtn.addEventListener('click', playAudio)
playNextBtn.addEventListener('click', playNext)
playPrevBtn.addEventListener('click', playPrev)

for(let i=0; i<playList.length; i++){
  const playListContainer = document.querySelector('.play-list')
  const li = document.createElement('li')
  li.classList.add('play-item')
  li.textContent = playList[i].title
  playListContainer.append(li)
}

const items = document.querySelectorAll('.play-item')
