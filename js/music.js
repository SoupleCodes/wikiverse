class MusicPlayer {
    constructor(data, controls={}, seekSlider) {
        console.log(data)

        if(!controls.toggle) throw new Error('"play/pause" button element not provided in controls! (controls.toggle)');
        if(!controls.next) throw new Error('"next" button element not provided in controls! (controls.next)');
        if(!controls.prev) throw new Error('"previous" button element not provided in controls! (controls.prev)');
        if(!seekSlider) throw new Error('"slider" input range element not provided! (seekSlider)');
        
        this.songs = data
        this.controls = controls
        this.playing = false
        this.currTrack = 0
        this.player = document.createElement('audio');
        this.slider = seekSlider
        this.slider.addEventListener('change', () => this.seekTo.call(this))

        this.controls.toggle.addEventListener('click', () => {
            if (this.player.src) {
                if (this.playing) {
                    this.pause.call(this)
                    this.playing = false
                    this.controls.toggle.querySelector('img').src = '/images/ui/play.png'
                } else {
                    this.playing = true
                    this.player.play()
                    this.controls.toggle.querySelector('img').src = '/images/ui/pause.png'
                    if (!this.slider && !this.updateTimer) {
                        this.updateTimer = setInterval(()=>this.update.call(this), 700);
                    }
                }
            } else {
                this.playTrack(this.currTrack)
                this.controls.toggle.querySelector('img').src = '/images/ui/pause.png'
            }
        })
        this.controls.next.addEventListener('click', ()=>this.nextTrack.call(this))
        this.controls.prev.addEventListener('click', ()=>this.prevTrack.call(this))
        this.player.addEventListener("timeupdate", ()=>this.update.call(this))
        this.player.addEventListener("ended", ()=>this.nextTrack.call(this));
    }
    async play(url) {
        if (this.updateTimer) {
            clearInterval(this.updateTimer)
        }
        this.playing = true
        this.player.src = url
        this.player.load()
        await this.player.play()

        if(this.slider) {
            if(this.updateTimer) {
                this.updateTimer = setInterval(()=>this.update.call(this), 1000)
            }
            this.slider.max = Math.ceil(this.player.duration);
            this.update();
        }
    }
    nextTrack() {
        this.currTrack ++
        if (this.currTrack >= this.songs.length) {
            this.currTrack = 0
        }
        this.playTrack(this.currTrack)
    }
    prevTrack() {
        this.currTrack --
        if (this.currTrack < 0) {
            this.currTrack = this.songs.length - 1
        }
        this.playTrack(this.currTrack)    
    }
    pause() {
        this.playing = false;
        this.player.pause();
    }
    update() {
        let pos = this.player.currentTime * (this.slider.max / this.player.duration)
        this.slider.value = pos

        let progress = document.querySelector('td#progress-bar')
        let timeElapsed = document.querySelector('td#time-elapsed small')
        let timeDuration = document.querySelector('td#time-duration small')

        progress.width = Math.floor((this.player.currentTime / this.player.duration) * 100) + '%'
        timeElapsed.innerHTML = '&nbsp;' + new Date(1000 * this.player.currentTime).toISOString().slice(15, 19) + '&nbsp;&nbsp;'
        timeDuration.innerHTML = '&nbsp;&nbsp;' + new Date(1000 * this.player.duration).toISOString().slice(15, 19) + '&nbsp;'
    }
    seekTo() {
        let seekTo = this.player.duration * (this.slider.value / this.slider.max);
        this.player.currentTime = seekTo;
    }
    playTrack(id) {
        this.currTrack = id
        this.play(this.songs[id].song_url)

        document.querySelector('.track.selected').classList.remove('selected')
        document.querySelector('#tracklist').children[id].classList.add('selected')

        document.querySelector('#song-thum').src = this.songs[id].cover_art
        document.querySelector('h4#song-name').textContent = this.songs[id].song_name
        document.querySelector('small#song-author').textContent = this.songs[id].artist_name

        this.controls.toggle.querySelector('img').src = '/images/ui/pause.png'
    }
}

window.musicPlayer = MusicPlayer