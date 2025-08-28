const user = new URLSearchParams(window.location.search).get("")

function returnUTCTime(t) { return new Date(t).toLocaleDateString('UTC') }
function createBlog(data) {
    const blog = document.createElement('div')
    blog.classList.add('weblog')

    const blogDate = document.createElement('p')
    blogDate.classList.add('blog-date')

    const blogBody = document.createElement('p')
    blogBody.classList.add('blog-body')
    blogBody.textContent = data.content

    const blogTitle = document.createElement('h6')
    blogTitle.classList.add('entry-title')
    blogTitle.textContent = data.title

    const blogContent = document.createElement('div')
    blogContent.classList.add('blog-content')
    blogContent.appendChild(blogTitle)
    blogContent.appendChild(blogBody)

    const blogLinks = document.createElement('div')
    blogLinks.classList.add('blog-links')
    blogLinks.innerHTML = `<p>${data.view_count || 0} views</p><p> - </p><p><a href="/blog/?=${data.id}">${data.comment_count || 0} comments</a></p>`

    const date = new Date(data.created_at)
    blogDate.textContent = date.toLocaleString('UTC',{month:'long', day: 'numeric', year:'numeric'}) + 
                            ' ~ ' + 
                           date.toLocaleString('UTC',{ hour: 'numeric', minute: 'numeric'}).toLowerCase()
    blog.appendChild(blogDate)
    blog.appendChild(blogContent)
    blog.appendChild(blogLinks)

    return blog
}
async function fetchGET(endpoint) {
    let response
    response = await fetch('https://wiki.souple.workers.dev/' + endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    const json = await response.json()
    return json
}

function createModule(id, title) {
    let titleElement = document.createElement('h4')
    titleElement.textContent = title
    titleElement.classList.add('w-title')

    let header = document.createElement('div')
    header.classList.add('w-header')
    header.appendChild(titleElement)

    let content = document.createElement('div')
    content.classList.add('w-content')

    let module = document.createElement('div')
    module.classList.add('w-modul')
    module.id = id
    module.appendChild(header)
    module.appendChild(content)

    return module
}

function newElement(name, elementType, classname) {
    let element = document.createElement(elementType || 'div')
    if(name) {
        element.id = name
    }
    if(classname) {
        element.classList.add(classname)
    }
    
    return element
}

function createTrackElement(songData) {
    const table = newElement(null, 'table', 'track')
    table.cellpadding = 2

    const tr = newElement(null, 'tr', null)
        const imgTD = newElement(null, 'td', null)
        imgTD.width = 26
            const trackIMG = newElement(null, 'img', 'track-img')
            trackIMG.src = songData.cover_art
        imgTD.appendChild(trackIMG)
    tr.appendChild(imgTD)
        const infoTD = newElement(null, 'td', null)
        infoTD.width = 93
        infoTD.align = 'left'
            const trackTitle = newElement(null, 'p', 'track-title')
            trackTitle.textContent = songData.song_name
            const trackAuthor = newElement(null, 'small', 'track-author')
            trackAuthor.textContent = songData.artist_name
        infoTD.appendChild(trackTitle)
        infoTD.appendChild(newElement(null, 'br', null))
        infoTD.appendChild(trackAuthor)
    tr.appendChild(infoTD)
        const albumTD = newElement(null, 'td', null)
        albumTD.align = 'center'
        const album = newElement(null, 'p', 'album')
        album.textContent = songData.album
        albumTD.appendChild(album)
    tr.appendChild(albumTD)
        const genreTD = newElement(null, 'td', null)
        genreTD.align = 'center'
        const genre = newElement(null, 'p', 'genre')
        genre.textContent = songData.genre
        genreTD.appendChild(genre)
    tr.appendChild(genreTD)
    
    const tbody = newElement(null, 'tbody', null)
    tbody.appendChild(tr)
    table.appendChild(tbody)

    return table;
}

async function fetchProfilePage(user) {
    const data = await fetchGET('user/' + user)

    document.title=user + "'s profile - wikiverse"

    document.querySelector('#header #display').textContent = data.username + "'s profile"
    if (data.banner_url) {
        const img = document.createElement('img')
        img.src = data.banner_url
        document.querySelector('#banner').appendChild(img)
    }
    if (data.pfp_url) {
        const pfp = document.querySelector('#avatar img')
        pfp.src = data.pfp_url
    }
    document.querySelector('#display_name').textContent = data.display_name
    document.querySelector('#join-date').textContent = returnUTCTime(data.created_at)
    document.querySelector('#last-seen').textContent = returnUTCTime(data.last_activity)
    document.querySelector('#user-location').textContent = data.location
    document.querySelector('p#aboutme').textContent = data.about_me

    const recentComments = await fetchGET('user/' + user + '/recent/comments')
    if (recentComments && recentComments.length > 0) {
        const recentUL = document.querySelector('ul#recent-comments')
        recentComments.slice(0, 5).forEach(r => {
            let a = newElement(null, 'a', null)
            a.href = `/blog/?=${r.blog_id}#comment-${r.comment_id}`
            a.textContent = r.author

            let li = newElement(null, 'li', null)
            li.appendChild(a)
            let p = newElement(null, 'p', null)
            p.innerText = 'on ' + r.blog_title
            li.appendChild(p)

            recentUL.appendChild(li)
        })
    }

    const table = document.querySelector('table#contactme')
    if (!data.social_links == null || (data.social_links && data.social_links.length > 0)) {
        const links = data.social_links
        let tbody = newElement(null, 'tbody', null)
        links.map((link) => {
            let tr = newElement(null, 'tr', null)

            let nameTd = newElement(null, 'td', 'social-name')
            nameTd.width = '25%'
            nameTd.textContent = link.name
            nameTd.valign = 'top'

            let linkTd = newElement(null, 'td', 'social-link')
            let a = newElement(null, 'a', null)
            a.href = link.url
            a.textContent = link.username
            linkTd.width = '75%'
            linkTd.appendChild(a)

            tr.appendChild(nameTd)
            tr.appendChild(linkTd)
            tbody.appendChild(tr)
        })
        table.appendChild(tbody)
    }

    let r_editedResponse
    r_editedResponse = await fetch('https://wiki.souple.workers.dev/user/' + user + '/recent/articles', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const e = await r_editedResponse.json()
    if (e && e.length > 0) {
        const recentArticlesUL = document.querySelector('ul#recent-articles')
        e.slice(0, 5).forEach(e => {
            let a = newElement(null, 'a', null)
            a.href = '/article/?=' + e.id
            a.textContent = e.title

            let li = newElement(null, 'li', null)
            li.appendChild(a)
            let p = newElement(null, 'p', null)
            p.innerText = 'by ' + e.author
            li.appendChild(p)

            recentArticlesUL.appendChild(li)
        })
    }

    const blogResponse = await fetchGET('user/' + user + '/blogs/1')
    const blogsDIV = document.querySelector('#side3')

    if (blogResponse.totalBlogs > 0) {
        const blogs = blogResponse.blogs.slice(0, 2)
        blogs.forEach(blog => {
            blogsDIV.appendChild(createBlog(blog))
        })
    }

    const archivetable = document.querySelector('table#archive')
    if (blogResponse.archive && blogResponse.archive.length > 0) {
        const archive = blogResponse.archive
        let tbody = newElement(null, 'tbody', null)
        archive.map((a) => {
            let tr = newElement(null, 'tr', null)

            let monthTD = newElement(null, 'td', 'social-name')
            let month = Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(a.month))
            monthTD.innerHTML = `<a href="/user/${user}/archive">${month} ${a.year}</a> (${a.count})`
            monthTD.valign = 'top'

            tr.appendChild(monthTD)
            tbody.appendChild(tr)
        })
        archivetable.appendChild(tbody)
    }

    // Add modules
    const side4 = document.getElementById('side4')

    if (!data.music == null || (data.music && data.music.length > 0)) {
        const musicModule = createModule('music', 'Music player.')
        const musicContent = musicModule.querySelector('.w-content')
        let nowPlaying = newElement('now-playing')
            const nowPlayingIMG = newElement('song-thum', 'img')
            nowPlayingIMG.src = data.music[0].cover_art
            nowPlaying.appendChild(nowPlayingIMG)

            // Song player div
            const songPlayer = newElement('song-player')

            const songInfo = newElement('song-info')
                songName = newElement('song-name', 'h4')
                songName.textContent = data.music[0].song_name
                songInfo.appendChild(songName, 'h5')

                songAuthor = newElement('song-author', 'small')
                songAuthor.textContent = data.music[0].artist_name
                songInfo.appendChild(songAuthor)
            songPlayer.appendChild(songInfo)
            const songControls = newElement('song-contols')
                songSlider = newElement('song-slider')
                songSlider.innerHTML = `
                    <table cellspacing="0">
                        <tbody>
                            <tr>
                                <td id="time-elapsed">
                                    <small>&nbsp;0:00&nbsp;&nbsp;</small>
                                </td>
                                <td id="progress-bar" width="0%" bgcolor="#CE5151">
                                </td>
                                <td id="seek-slider" width="155">
                                    <input type="range" value="0" min="0" max="100">
                                </td>
                                <td id="seek-bar" width="100%" bgcolor="#BFA2A2">
                                </td>
                                <td id="time-duration">
                                    <small>&nbsp;&nbsp;0:00&nbsp;</small>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                `
            songControls.appendChild(songSlider)
                let songButtonControls = newElement('song-button-controls')
                    songButtonControls.innerHTML = `
                        <div style="flex-grow: .5;">
                        </div>
                        <a id="prev-btn" href="#">
                            <img src="/images/prev.png">
                        </a>
                        <a id="toggle-btn" href="#">
                            <img src="/images/play.png">
                        </a>
                        <a id="next-btn" href="#">
                            <img src="/images/next.png">
                        </a>
                    `
            songControls.appendChild(songButtonControls)
            songPlayer.appendChild(songControls)
            nowPlaying.appendChild(songPlayer)
            musicContent.appendChild(nowPlaying)   

        let trackList = newElement('tracklist')
        const music = data.music
        music.map(((music, index) => {
            let track = createTrackElement(music)
            track.addEventListener('click', () => {
                window.musicPlayer.playTrack(index)
            })
            trackList.appendChild(track)
        }))
        trackList.children[0].classList.add('selected')

        musicContent.appendChild(trackList)
        musicModule.appendChild(musicContent)
        side4.appendChild(musicModule)

        const controls = {
            prev: document.getElementById('prev-btn'),
            toggle: document.getElementById('toggle-btn'),
            next: document.getElementById('next-btn'),
        };

        window.musicPlayer = new MusicPlayer(music, controls, songSlider.querySelector('#seek-slider input'))
    }

    const following = await fetchGET('user/' + user + '/following')
    if (following && following.length > 0) {
        const fwngModule = createModule('following', 'Following.')
        const fwngContent = fwngModule.querySelector('.w-content')
        const fwngCarousel = newElement('following-carousel', 'div', null)
        fwngContent.appendChild(fwngCarousel)
        fwngModule.appendChild(fwngContent)
        side4.appendChild(fwngModule)

        let carouselContent = document.createDocumentFragment();
        following.map((u => {
            let a = newElement(null, 'a', null)
            a.href = `/user/?=${u.user}`

            let img = newElement(null, 'img', 'pfp')
            img.src = u.profile.pfp_url || '/images/default.png'
            img.title = u.user
            a.appendChild(img)
            carouselContent.appendChild(a)
        }))
        setupCarousel('following-carousel', carouselContent, 61)
    }
    const followers = await fetchGET('user/' + user + '/followers')
    if (followers && followers.length > 0) {
        const fwrsModule = createModule('followers', 'Followers.')
        const fwrsContent = fwrsModule.querySelector('.w-content')
        const fwrsCarousel = newElement('followers-carousel', 'div', null)
        fwrsContent.appendChild(fwrsCarousel)
        fwrsModule.appendChild(fwrsContent)
        side4.appendChild(fwrsModule)

        let carouselContent = document.createDocumentFragment();
        followers.map((u => {
            let a = newElement(null, 'a', null)
            a.href = `/user/?=${u.user}`

            let img = newElement(null, 'img', 'pfp')
            img.src = u.profile.pfp_url || '/images/default.png'
            img.title = u.user
            a.appendChild(img)
            carouselContent.appendChild(a)
        }))
        setupCarousel('followers-carousel', carouselContent, 61)
    }
}

if (user) {
    fetchProfilePage(user)   
}