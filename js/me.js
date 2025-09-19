/* Intialise vars */
const token = localStorage.token
let u = localStorage.user
const iframe = document.querySelector('#preview-window iframe')
window.frames = iframe
const displayInputEl = document.querySelector('input[name="display_name"]')
const pfpUrlEl = document.querySelector('input[name="pfp_url"]')
const bannerUrlEl = document.querySelector('input[name="banner_url"]')
const locationEl = document.querySelector('input[name="location"]')
const aboutMeEl = document.querySelector('#edit-content textarea#content')
const styleEl = document.querySelector('#edit-style textarea#content')
if (u.theme) {
    styleEl.disabled = true;
    styleEl.title = 'You can\'t edit your css because you have a theme enabled'
}
const linksEl = document.getElementById('social-links')
const typelinksEl = document.getElementById('social-links-inputarea').querySelectorAll('input')
const addLinkEl = document.getElementById('add-link')

/* Autofill input fields */
if (u) {
    u = JSON.parse(u)
    displayInputEl.value = u.display_name
    pfpUrlEl.value = u.pfp_url
    bannerUrlEl.value = u.banner_url
    locationEl.value = u.location
    aboutMeEl.value = u.about_me
    styleEl.value = u.style
}

/* Update iframe */
var html = `
<head>
    <link rel="stylesheet" href="/styles/main.css"/>
    <link rel="stylesheet" href="/styles/user.css"/>
    <link rel="icon" type="image/png" href="/favicon.png"/>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="friends online social networking wiki articles blog poll">
    <script type="text/javascript" src="/js/helper.js"></script>
    <script type="text/javascript" src="/js/comment.js"></script>
    <script type="text/javascript" src="/js/carousel.js"></script>
</head>
<nav id="topbar"></nav>
<style>
    body {
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;  /* Firefox, Safari 18.2+, Chromium 121+ */
    }
    body::-webkit-scrollbar { 
        display: none;  /* Older Safari and Chromium */
    }
</style>
<style id="user-style">
</style>
<body>
    <div id="main">
        <div id="header">
            <h5 id="display"></h5>
        </div>
        <div id="banner">
        </div>
        <div id="content">
            <div id="userside" class="col1">
                <div id="avatar">
                    <img src="/images/ui/default.png"/>
                    <button title="Follow this user?" id="follow">+</button>
                </div>
                <h5 id="display_name"></h5>
                <div id="stats">
                    <h6>Member since:</h6>
                    <small id="join-date"></small>
                    <h6>Last seen:</h6>
                    <small id="last-seen"></small>
                    <h6>Location:</h6>
                    <small id="user-location"></small>
                </div>
            </div>
            <div id="userinfo" class="col2">
                <div class="group">
                    <h5 class="title">About me:</h5>
                    <p id="aboutme"></p>
                </div>
                <div class="group">
                    <h5 class="title">Recently edited articles:</h5>
                    <ul id="recent-articles"></ul>
                </div>
                <div class="group">
                    <h5 class="title">Recent comments:</h5>
                    <ul id="recent-comments"></ul>
                </div>
                <div class="group">
                    <h5 class="title">Archive:</h5>
                    <table id="archive" class="list noline"></table>
                </div>
                <div class="group">
                    <h5 class="title">Contact me:</h5>
                    <table id="contactme" class="list"></table>
                </div>
            </div>
            <div id="weblogs" class="col3">
                <h5 class="title">My weblog...</h5>
            </div>
            <div id="modules" class="col4">
            <div class="w-modul" id="music"></div>
            <div class="w-modul" id="following"></div>
            <div class="w-modul" id="followers"></div>
            </div>
        </div>
        <div id="comments-section">
            <h5 id="comment-count" class="title"></h5>
            <p id="showing"></p>
            <div id="comments"></div>
            <div id="comment-box">
                <textarea id="typearea" placeholder="Type something here!"></textarea>
                <button id="submit">submit</button>
            </div>
        </div>
    </div>
</body>
<script type="text/javascript" src="/js/nav.js"></script>
<script>
    let preview_user = '${u.username}'
</script>
<script type="text/javascript" src="/js/music.js"></script>
<script type="text/javascript" src="/js/user.js"></script>
`
iframe.srcdoc = html;
iframe.onload = function () {
    const iframeContent = iframe.contentWindow.document.body
    iframeContent.querySelector('#user-style').innerHTML = u.theme ? u.theme.layout_style : ''
    if (u.theme) {
        iframe.contentWindow.eval(u.theme.layout_javascript)
    }
}

function updateStyle() { iframe.contentWindow.document.body.querySelector('#user-style').innerHTML = styleEl.value }
function updateBanner() { 
    const select = iframe.contentWindow.document.body.querySelector('#banner')
    if (!select.querySelector('img')) {
        const img = document.createElement('img')
        img.src = bannerUrlEl.value
        select.appendChild(img)
    } else {
        if (bannerUrlEl.value) {
            select.querySelector('img').src = bannerUrlEl.value 
        } else {
            if (select.querySelector('img')) {
                select.querySelector('img').remove()
            }
            return ''
        }
    }
}
function updateDisplayName() { iframe.contentWindow.document.body.querySelector('#display_name').textContent = displayInputEl.value }
function updateLocation() { iframe.contentWindow.document.body.querySelector('#user-location').textContent = locationEl.value }
function updatePfp() { iframe.contentWindow.document.body.querySelector('#avatar img').src = pfpUrlEl.value }

/* Left side (user-edit) */
let musicDetails = document.getElementById('music-details')
let addMusicDetailButton = document.querySelector('#music-input button')
function addMusicDetail(m) {
    let group = document.createElement('div')
        group.classList.add('song-group')
        group.setAttribute('songurl', m.song_url || '')
        group.setAttribute('link', m.link || '')

        let img = document.createElement('img')
        img.src = m.cover_art ?? 'https://legoshi.pages.dev/music/noart.png'
        group.appendChild(img)

        let songDetail = document.createElement('div')
        songDetail.classList.add('song-detail')
        let p = document.createElement('p')
        p.textContent = m.song_name
        let author = document.createElement('small')
        author.textContent = m.artist_name
        songDetail.appendChild(p)
        songDetail.appendChild(author)
        group.appendChild(songDetail)

        let smallDate = document.createElement('small')
        smallDate.classList.add('song-date')
        smallDate.textContent = m.published
        group.appendChild(smallDate)

        let smallAlbum = document.createElement('small')
        smallAlbum.classList.add('song-album')
        smallAlbum.textContent = m.album
        group.appendChild(smallAlbum)

        let smallGenre = document.createElement('small')
        smallGenre.classList.add('song-genre')
        smallGenre.textContent = m.genre
        group.appendChild(smallGenre)

        const button = document.createElement('button')
        button.classList.add('remove-link')
        button.textContent = '-'
        button.addEventListener('click', function() {
            group.remove()
            let index = Array.prototype.indexOf.call(musicDetails.children, group)
            frame.contentWindow.document.querySelector('#tracklist').children[index].remove()
        })
        group.appendChild(button)

        return group
}
if (musicDetails && u) {
    Array.from(u.music).map(m => {
        musicDetails.appendChild(addMusicDetail(m, m.song_url, m.link))
    })

    const detailOptions = document.querySelector('#tabs-music.tab-content').children
    addMusicDetailButton.addEventListener('click', () => {
        let artist_name = detailOptions[0].value
        let song_name = detailOptions[1].value
        let song_url = detailOptions[2].value
        let published = detailOptions[4].value
        if (!artist_name) throw new Error('Artist name missing!')
        if (!song_name) throw new Error('Song name missing!')
        if (!song_url) throw new Error('Song url missing!')
        if (!published) throw new Error('Date missing!')

        musicDetails.appendChild(addMusicDetail(
            {
                artist_name: artist_name,
                song_name: song_name,
                song_url: song_url,
                cover_art: detailOptions[3].value,
                published: published,
                album: detailOptions[5].value,
                genre: detailOptions[6].value,
            }
        ))
    })
}

async function updateProfile() {
    let display_name = displayInputEl.value
    let pfp_url = pfpUrlEl.value
    let banner_url = bannerUrlEl.value
    let location = locationEl.value
    let about_me = aboutMeEl.value
    let style = styleEl.value
    let social_links = []
    let music = []

    Array.from(linksEl.children).map(s => {
        social_links.push({
            username: s.children[0].querySelector('input').value,
            name: s.children[1].querySelector('input').value,
            url: s.children[2].querySelector('input').value,
        })
    })

    Array.from(musicDetails.children).map(m => {
        music.push({
            artist_name: m.childNodes[1].childNodes[1].textContent,
            song_name: m.childNodes[1].childNodes[0].textContent,
            song_url: m.getAttribute('songurl'),
            cover_art: m.childNodes[0].src,
            published: Number(m.childNodes[2].textContent),
            album: m.childNodes[3].textContent,
            genre: m.childNodes[4].textContent,
            link: m.getAttribute('link'),
        })
    })

    const response = await fetch(`https://wiki.souple.workers.dev/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            display_name,
            pfp_url,
            banner_url,
            location,
            about_me,
            style,
            social_links,
            music
        })
    });
    try {
        if (response.ok) {
            u = { ...u, display_name, pfp_url, banner_url, location, about_me, style, social_links, music }
            localStorage.setItem('user', JSON.stringify(u))
            alert('Profile updated successfully');
        } else {
            const error = await response.text();
            console.error("Error updating user:", error);
            throw new Error(error)
        }
    } catch (error) {
        console.error("Error updating the user", error);
    }
}