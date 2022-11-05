class Music {
    constructor(title, singer, img, file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName(){
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Sənce nədən?", "Mehdi Sadiq & Noton","3.jpeg","3.mp3"),
    new Music("Mən istədim", "MadTeen & Rəssam","1.jpeg","1.mp3"),
    new Music("Yaşamaq lazım", "Mehdi Sadiq & Noton","2.jpeg","2.mp3"),
    
    
];


