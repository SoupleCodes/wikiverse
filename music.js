class MusicPlayer {
    updateTimer
    /**
     * 
     * @param {Array.<{name:String,author:String,path:String}>} data song data
     * @param {Object} controls controls
     * @param {Element} controls.prev Previous button
     * @param {Element} controls.play Play/Pause button
     * @param {Element} controls.next Next button
     * @param {Array} [style=["⏸","▶","⏮","⏭"]] Styles for controls, example: ['⏸','▶','⏮','⏭']
     * @param {Element} [seekSlider] Seek slider
     */
    constructor(data, controls={}, style='⏸▶⏮⏭'.split(""), seekSlider) {
        this.songs = data;
        if(!controls.prev) throw new Error('"previous" button element not provided in controls! (controls.prev)');
        if(!controls.play) throw new Error('"play/pause" button element not provided in controls! (controls.play)');
        if(!controls.next) throw new Error('"next" button element not provided in controls! (controls.next)');
        this.controls = controls;
        this.playing = false;
        this.currTrack = -1;
        this.style = style;
        this.controls.play.innerHTML = this.style[1];
        this.controls.prev.innerHTML = this.style[2];
        this.controls.next.innerHTML = this.style[3];
        this.player = document.createElement('audio');
        this.player.src = data[0].path
        if(seekSlider) {
            this.seekSlider = seekSlider;
            this.seekSlider.addEventListener('change', ()=>this.seekTo.call(this))
        }
        this.controls.play.addEventListener('click', ()=>this.playPause.call(this))
        this.player.addEventListener("ended", ()=>this.nextTrack.call(this));
    }
    nextTrack() {
        this.currTrack++;
        if(this.currTrack >= this.songs.length) this.currTrack = 0;
        this.playTrack(this.currTrack)
    }
    playPause() {
        if(this.playing) {
            this.pause()
        } else if(this.currTrack == -1) {
            this.currTrack = 0;
            this.playTrack(this.currTrack)
        } else {
            this.unpause()
        }
    }
    updatePlayPause() {
        this.controls.play.innerHTML = this.style[Number(!this.playing)];
    }
    async play(url) {
        if(this.updateTimer) clearInterval(this.updateTimer);
        this.playing = true;
        this.updatePlayPause();
        this.player.src = url;
        this.player.load()
        await this.player.play();
        if(this.seekSlider) {
            this.updateTimer = setInterval(()=>this.seekUpdate.call(this), 1000)
            console.log(this.player.duration, Math.round(this.player.duration))
            this.seekSlider.max = Math.ceil(this.player.duration);
            this.seekUpdate();
        }
    }
    pause() {
        this.playing = false;
        this.player.pause();
        this.updatePlayPause()
    }
    unpause() {
        this.playing = true;
        this.player.play();
        this.updatePlayPause()
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
        document.querySelectorAll('#mp-author').forEach(elem => elem.innerText = this.songs[id].author)
        document.querySelectorAll('#mp-name').forEach(elem => elem.innerText = this.songs[id].name)
    }
}