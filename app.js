const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const musicListUl = document.querySelector("ul");
const add = document.querySelector("#add");
const replay = document.querySelector("#replay");
const modalContainer = document.querySelector(".modal-container");
const submitBtn = document.querySelector("#submit-button");


const player = new MusicPlayer(musicList);



window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
});

function displayMusic(music){
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "music/" + music.file;
};

//Buttons
let replayMusicCounter = 0;
play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
    skipMusic();
});

function pauseMusic(){
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}

function playMusic(){
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
}


next.addEventListener("click", () => {
    nextMusic();
    isPlayingNow();
});
function nextMusic(){
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
};

prev.addEventListener("click", () => {
    prevMusic();
    isPlayingNow();
});
function prevMusic(){
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
};

replay.addEventListener("click", () =>{    
    replayMusicCounter++;
    if(replayMusicCounter%2==0){
        replay.querySelector("i").classList = "fa-solid fa-arrow-rotate-right";
    } else{
        replay.querySelector("i").classList = "fa-solid fa-arrows-rotate";
    }
});

function skipMusic(){
    audio.addEventListener("ended", () => {
        if(replayMusicCounter%2==0){
            nextMusic();
        } else{
            playMusic();
        }
        if(replayMusicCounter==2) replayMusicCounter=0;
    });
}
//Buttons end
const calculateTime = (seconds) => {
    const deqiqe = Math.floor(seconds / 60);
    const saniye = Math.floor(seconds % 60);
    const guncellenenSaniye = saniye < 10 ? `0${saniye}`: `${saniye}`;
    const netice = `${deqiqe}:${guncellenenSaniye}`;
    return netice;
}

audio.addEventListener("loadedmetadata", () =>{
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () =>{
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value
})

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value/100;

    if(value == 0){
        audio.muted = true;
        muteSate = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else{
        audio.muted = false;
        muteSate = "sesli";
        volume.classList = "fa-solid fa-volume-high";
    }
});


let muteSate = "sesli";

volume.addEventListener("click", () => {
    if(muteSate === "sesli"){
        audio.muted = true;
        muteSate = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else{
        audio.muted = false;
        muteSate = "sesli";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});


const displayMusicList = (list) => {
    for(i=0;i<list.length;i++){
        let liTag=`
            <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class="music-${i}" src="music/${list[i].file}"></audio>
            </li> 
        `;

        musicListUl.insertAdjacentHTML("beforeend", liTag);

        let liAudioDuration = musicListUl.querySelector(`#music-${i}`);
        let liAudioTag = musicListUl.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });

    }
}

const selectedMusic = (li) => {
    const index = li.getAttribute("li-index");
    player.index = index;
    player.getMusic();
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
};

const isPlayingNow = () =>{
    for(let li of musicListUl.querySelectorAll("li")) {
        if(li.classList.contains("playing")) {
            li.classList.remove("playing");
        }

        if(li.getAttribute("li-index") == player.index) { 
            li.classList.add("playing");
        }
    }
}



//Modal box start
async function uploadFile() {
    let formData = new FormData();           
    formData.append("file", fileupload.files[0]);
    await fetch('/uploaddata.php', {
      method: "POST", 
      body: formData
    });
    alert('The file has been uploaded successfully.');
}

function addNewMusic(){
    musicList.push(new Music("Və bir də Həsrətindən(remix)", "Şəfiqə Axundova & Xpert","4.jpeg","4.mp3"));
}

add.addEventListener("click", () => {
    modalContainer.classList.add("show");
});

submitBtn.addEventListener("click", (event) => {
    modalContainer.classList.remove("show");
    event.preventDefault();
    //ADDNEWMUSIC ISLEMIRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
    addNewMusic();
}); 
//Modal box end


//Upload data start



//Upload data end