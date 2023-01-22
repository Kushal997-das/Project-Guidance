console.log('Welcome to Spotify');

// initialize the variables 
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar');

let songs = [
    { songName: "sukidara", filePath: "song/1.mp3", coverPath: "cover/cover.webp" },
    { songName: "sukidara", filePath: "song/1.mp3", coverPath: "cover/cover.webp" },
    { songName: "sukidara", filePath: "song/1.mp3", coverPath: "cover/cover.webp" },
    { songName: "sukidara", filePath: "song/1.mp3", coverPath: "cover/cover.webp" },
    { songName: "sukidara", filePath: "song/1.mp3", coverPath: "cover/cover.webp" },
    { songName: "sukidara", filePath: "song/1.mp3", coverPath: "cover/cover.webp" },
    { songName: "sukidara", filePath: "song/1.mp3", coverPath: "cover/cover.webp" },
    { songName: "sukidara", filePath: "song/1.mp3", coverPath: "cover/cover.webp" },
]

// audioElement.play(); 
masterPlay.addEventListener('click', ()=>{
if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play(); 
}
})
// listen to events 
myProgressBar.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    // update seekbar 

})