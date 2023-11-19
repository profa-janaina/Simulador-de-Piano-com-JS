const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input")

let mapedKeys = [];

let audio = new Audio('src/tunes/a.wav')

const playTune = (key) => {
    audio.src = `src/tunes/${key}.wav`
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

pianoKeys.forEach((keyParameter)=>{
    keyParameter.addEventListener('click', () => playTune(keyParameter.dataset.key));

    mapedKeys.push(keyParameter.dataset.key);
});

document.addEventListener('keydown', (e) => {
    if(mapedKeys.includes(e.key)){
        playTune(e.key);
    }    
})

const handleVolume = (e) => {
audio.volume = e.target.value;
};

const showHideKeys = () => {
    pianoKeys.forEach((key) => key.classList.toggle("hide"));
}

volumeSlider.addEventListener("input", handleVolume);

keysCheck.addEventListener('click', showHideKeys);