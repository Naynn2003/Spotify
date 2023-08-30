// Your script.js

console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let volumeSlider = document.getElementById("volumeSlider");
let repeatButton = document.getElementById("repeat");
let shuffleButton = document.getElementById("shuffle");
let isRepeatOn = false;
let isShuffleOn = false;

let songs = [
  { songName: "Jaan Nisaar", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Main Rahoon Ya Naa Rahu", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Nayan ne Band rakhi ne", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "O Re Piya", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Quafiraana", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "Shayad", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "Tum Se Hi", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
];

// Set up audio element
function loadSong(songIndex) {
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterSongName.innerText = songs[songIndex].songName;
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
}

// Load the first song
loadSong(songIndex);

// Update song list
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

// Listen to events
audioElement.addEventListener("timeupdate", () => {
  // Update seekbar
  let progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("input", () => {
  audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

// Play the selected song when a song item is clicked
songItems.forEach((element) => {
  element.addEventListener("click", (e) => {
    songIndex = parseInt(e.currentTarget.querySelector("i").id);
    loadSong(songIndex);
  });
});

// Play the next song
document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
});

// Play the previous song
document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
});

// Volume control
volumeSlider.addEventListener("input", () => {
  audioElement.volume = volumeSlider.value / 100;
});

// Repeat button
repeatButton.addEventListener("click", () => {
  isRepeatOn = !isRepeatOn;
  // Implement repeat logic (e.g., repeat single song or playlist)
  if (isRepeatOn) {
    repeatButton.classList.add("active");
  } else {
    repeatButton.classList.remove("active");
  }
});

// Shuffle button
shuffleButton.addEventListener("click", () => {
  isShuffleOn = !isShuffleOn;
  // Implement shuffle logic (e.g., shuffle the playlist)
  if (isShuffleOn) {
    shuffleButton.classList.add("active");
  } else {
    shuffleButton.classList.remove("active");
  }
});
