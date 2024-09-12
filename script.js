const songList = [{
    name: "É Ele",
    artist: "DROPS",
    src: "assets/1.mp3",
    cover: "assets/1.jpg"
},
{
    name: "Tudo que você quiser",
    artist: "Luan Santana",
    src: "assets/2.mp3",
    cover: "assets/2.jpg"
},
{
    name: "Chuva de Arroz",
    artist: "Luan Santana",
    src: "assets/3.mp3",
    cover: "assets/3.jpg"
},
{
    name: "Te Vivo",
    artist: "Luan Santana",
    src: "assets/4.mp3",
    cover: "assets/2.jpg"
},
{
    name: "Alas",
    artist: "Soy Luna",
    src: "assets/5.mp3",
    cover: "assets/5.jpg"
},
{
    name: "Better in Stereo",
    artist: "Liv and Maddie",
    src: "assets/6.mp3",
    cover: "assets/6.jpg"
},
{
    name: "You Are the Music in Me",
    artist: "High School Musical 2",
    src: "assets/7.mp3",
    cover: "assets/7.jpg"
},
{
    name: "Fugir agora",
    artist: "Larissa Manoela",
    src: "assets/8.mp3",
    cover: "assets/8.jpg"
},
{
    name: "Bondade de Deus",
    artist: "Fhop Music",
    src: "assets/9.mp3",
    cover: "assets/9.jpg"
},
{
    name: "Tu és + Águas Purificadoras",
    artist: "Fhop Music",
    src: "assets/10.mp3",
    cover: "assets/11.jpg"
},
{
    name: "A Boa Parte",
    artist: "Fhop Music",
    src: "assets/11.mp3",
    cover: "assets/11.jpg"
},
{
    name: "SE HOJE ME TOCA",
    artist: "Fhop Music",
    src: "assets/12.mp3",
    cover: "assets/12.jpg"
},
{
    name: "Me Ama",
    artist: "Diante do Trono",
    src: "assets/13.mp3",
    cover: "assets/13.jpg"
},
{
    name: "Iris",
    artist: "Goo Goo Dolls",
    src: "assets/14.mp3",
    cover: "assets/14.jpg"
},
{
    name: "Yellow",
    artist: "Coldplay",
    src: "assets/15.mp3",
    cover: "assets/15.jpg"
},
{
    name: "Perfect",
    artist: "Ed Sheeran",
    src: "assets/16.mp3",
    cover: "assets/16.jpg"
},
{
    name: "Just The Way You Are",
    artist: "Bruno Mars",
    src: "assets/17.mp3",
    cover: "assets/17.jpg"
},
{
    name: "Hino do Corinthians",
    artist: "Corinthians",
    src: "assets/last.mp3",
    cover: "assets/last.jpg"
}]

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songList.length;
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songList.length) % songList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}