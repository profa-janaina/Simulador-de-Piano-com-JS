// Elementos do HTML
const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input")

// Array para as teclas do app
const mapedKeys = [];
const audios = {}; 

// FIX : Função que reproduz as notas.
const playTune = (key) => {
    const audio = new Audio(`src/tunes/${key.toLowerCase()}.wav`);
    audios[key] = audio;

    // Adicionando dinâmica sonora. 
    audio.addEventListener('ended', () => delete audios[key]);
    audio.volume = volumeSlider.value;// lê a posição do slider de volume.
    audio.play();

    // Animação das teclas
    const clickedKey = document.querySelector(`[data-key="${key.toLowerCase()}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => clickedKey.classList.remove("active"), 150);
};

// Função queas notas
const stopTune = (key) => (audios[key]) ? delete audios[key] : void(0);

// Adicionando as notas para a array adicionando um listener pra cada uma delas.
pianoKeys.forEach((keyParameter) => {
    keyParameter.addEventListener('click', () => playTune(keyParameter.dataset.key));
    mapedKeys.push(keyParameter.dataset.key);
});

// FIX : Escutando os botões do teclado para as notas.
document.addEventListener('keydown', (e) => {
    // Operador ternário para teste lógico.
    // Operador ternário nada mais é que um if voltada para apenas uma linha de codigo
    // tanto no true quanto no false, no qual voce consegue colocar dentro de uma variavel se quiser.
    // Syntax : <condição> ? <operação 1> : <operação 2>;
    (mapedKeys.includes((e.key.toLowerCase() || e.key.toUpperCase())) && !audios[e.key]) ? playTune(e.key) : void(0);
});

// FIX : Restaurando o trigger para os botões do teclado.
document.addEventListener('keyup', (e) => stopTune(e.key));

// Som
// Um pequeno errinho que deixei passar no meu codigo original na hora de dar push no git
const handleVolume = (e) => {
    // Modifica o audio de todos da array
    Object.values(audios).forEach(audio => { audio.volume = e.target.value });
};

// Escondendo teclas.
const showHideKeys = () => {pianoKeys.forEach((key) => key.classList.toggle("hide"))};

// Listeners do volume e das keys.
volumeSlider.addEventListener("input", handleVolume);
keysCheck.addEventListener('click', showHideKeys);
