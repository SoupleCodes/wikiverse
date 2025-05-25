class MusicPlayer {
    /**
     * 
     * @param {Array.<{name:String,author:String,path:String}>} data song data
     * @param {Object} controls controls
     * @param {Element} controls.prev Previous button
     * @param {Element} controls.play Play/Pause button
     * @param {Element} controls.next Next button
     * @param {Element} controls.pause Pause button
     * @param {Element} [seekSlider] Seek slider
     */
     
    constructor(data, controls={}, seekSlider) {
        this.songs = data;
        console.log(data)
        if(!controls.play) throw new Error('"play/pause" button element not provided in controls! (controls.play)');
        if(!controls.next) throw new Error('"next" button element not provided in controls! (controls.next)');
        this.controls = controls;
        this.playing = false;
        this.currTrack = 0;
        this.player = document.createElement('audio');
        if(seekSlider) {
            this.seekSlider = seekSlider;
            this.seekSlider.addEventListener('change', ()=>this.seekTo.call(this))
        }
        this.controls.play.addEventListener('click', ()=>this.playTrack(this.currTrack))
        this.controls.pause.addEventListener('click', ()=>this.pause.call(this))
        this.controls.next.addEventListener('click', ()=>this.nextTrack.call(this))
        this.controls.prev.addEventListener('click', ()=>this.prevTrack.call(this))
        this.player.addEventListener("timeupdate", ()=>this.seekUpdate.call(this))
        this.player.addEventListener("ended", ()=>this.nextTrack.call(this));
    }
    nextTrack() {
        this.currTrack++;
        if(this.currTrack >= this.songs.length) this.currTrack = 0;
        this.playTrack(this.currTrack)
    }
    prevTrack() {
        this.currTrack--;
        if(this.currTrack < 0) this.currTrack = this.songs.length - 1;
        this.playTrack(this.currTrack)
    }
    pause() {
        this.playing = false;
        this.player.pause();
    }
    async play(url) {
        if(this.updateTimer) {
            clearInterval(this.updateTimer)
        }
        console.log(url)
        this.playing = true;
        this.player.src = url;
        this.player.load()
        await this.player.play();
        if(this.seekSlider) {
            if(this.updateTimer) this.updateTimer = setInterval(()=>this.seekUpdate.call(this), 1000)
            console.log(this.player.duration, Math.round(this.player.duration))
            this.seekSlider.max = Math.ceil(this.player.duration);
            this.seekUpdate();
        }
    }
    seekUpdate() {
        let seekPosition = this.player.currentTime * (this.seekSlider.max / this.player.duration);
        this.seekSlider.value = seekPosition;
    }
    seekTo() {
        let seekto = this.player.duration * (this.seekSlider.value / this.seekSlider.max);
        this.player.currentTime = seekto;
    }
    playTrack(id) {
        this.play(this.songs[id].path);
        document.querySelector('#song-info').textContent = `${this.songs[id].name} - ${this.songs[id].author}`;
    }
}