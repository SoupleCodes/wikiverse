const token = localStorage.token
let u = localStorage.user

const previewIframeEl = document.querySelector('#preview-window iframe').contentWindow.document
const displayInputEl = document.querySelector('input[name="display_name"]')
const pfpUrlEl = document.querySelector('input[name="pfp_url"]')
const bannerUrlEl = document.querySelector('input[name="banner_url"]')
const locationEl = document.querySelector('input[name="location"]')
const aboutMeEl = document.querySelector('#edit-content textarea#content')
const styleEl = document.querySelector('#edit-style textarea#content')
const linksEl = document.getElementById('social-links')
const typelinksEl = document.getElementById('social-links-inputarea').querySelectorAll('input')
const addLinkEl = document.getElementById('add-link')
if (u) {
    u = JSON.parse(u)
    displayInputEl.value = u.display_name
    pfpUrlEl.value = u.pfp_url
    bannerUrlEl.value = u.banner_url
    locationEl.value = u.location
    aboutMeEl.value = u.about_me
    styleEl.value = u.style
}

function addLink(data) {
    const parent = document.createElement('div')
    parent.classList.add('s-link')

    const userLabel = document.createElement('label')
    const linkUserInput = document.createElement('input')
    linkUserInput.name = 'link-user'
    linkUserInput.value = data.username
    userLabel.appendChild(linkUserInput)

    const siteNameLabel = document.createElement('label')
    const siteNameInput = document.createElement('input')
    siteNameInput.name = 'link-sitename'
    siteNameInput.value = data.name
    siteNameLabel.appendChild(siteNameInput)

    const urlLabel = document.createElement('label')
    const urlInput = document.createElement('input')
    urlInput.name = 'link-sitename'
    urlInput.value = data.url
    urlLabel.appendChild(urlInput)

    const button = document.createElement('button')
    button.classList.add('remove-link')
    button.textContent = '-'
    button.addEventListener('click', function() {
        parent.remove()
    })

    parent.appendChild(userLabel)
    parent.appendChild(siteNameLabel)
    parent.appendChild(urlLabel)
    parent.appendChild(button)

    return parent
}

if (linksEl && u.social_links) {
    u.social_links.map((s) => {
        linksEl.appendChild(addLink(
            {
                username: s.username,
                name: s.name,
                url: s.url
            }
        ))
    })

    addLinkEl.addEventListener('click', function() {
        linksEl.appendChild(addLink(
            {
                username: typelinksEl[0].value,
                name: typelinksEl[1].value,
                url: typelinksEl[2].value
            }
        ))
    })
}

const content = previewIframeEl.createElement('div'); content.id = 'content'
const userStyle = previewIframeEl.createElement('style'); userStyle.id = 'user-style'

function updateStyle() { userStyle.innerHTML = styleEl.value }

const header = previewIframeEl.createElement('div'); header.id = 'header';
const headerDisplay = previewIframeEl.createElement('h5'); headerDisplay.id = 'display';
if (u.username.endsWith('s')) {
    headerDisplay.textContent= u.username + "' profile"
} else {
    headerDisplay.textContent= u.username + "'s profile"
}
headerDisplay.title = 'h5#display'
header.appendChild(headerDisplay)

const banner = previewIframeEl.createElement('div'); banner.id = 'banner';
if (u.banner_url) {
    const img = previewIframeEl.createElement('img')
    img.src = u.banner_url
    banner.appendChild(img)
}
banner.title = '#banner img'
function updateBanner() { banner.querySelector('img').src = bannerUrlEl.value }

const side1 = previewIframeEl.createElement('div'); side1.classList.add = 'col1';
    const avatarDiv = previewIframeEl.createElement('div'); avatarDiv.id = 'avatar'
    const img = previewIframeEl.createElement('img'); img.src = u.pfp_url || '/images/ui/default.png'; 
    img.title = '#avatar img'
    avatarDiv.appendChild(img); side1.appendChild(avatarDiv)
    const h5display = previewIframeEl.createElement('h5'); h5display.id = 'display_name'; h5display.textContent = u.display_name || ''
    h5display.title = 'h5#display_name'
    side1.appendChild(h5display)

    const statsEl = previewIframeEl.createElement('div'); statsEl.id = 'stats'; statsEl.title = '#stats'
        const ustatsM = previewIframeEl.createElement('h6'); ustatsM.textContent = 'Member since:'
        const ujoinDateEl = previewIframeEl.createElement('small'); ujoinDateEl.id = 'join-date'; ujoinDateEl.textContent = returnUTCTime(u.created_at)
        const ustatsEl = previewIframeEl.createElement('h6'); ustatsEl.textContent = 'Last seen:'
        const ulastSeenEl = previewIframeEl.createElement('small'); ulastSeenEl.id = 'last-seen'; ulastSeenEl.textContent = returnUTCTime(u.last_activity)
        const uLocationEl = previewIframeEl.createElement('h6'); uLocationEl.textContent = 'Location:'
        const uLocationSmallEl = previewIframeEl.createElement('small'); uLocationSmallEl.id = 'user-location'; uLocationSmallEl.textContent = u.location
    statsEl.appendChild(ustatsM)
    statsEl.appendChild(ujoinDateEl)
    statsEl.appendChild(ustatsEl)
    statsEl.appendChild(ulastSeenEl)
    statsEl.appendChild(uLocationEl)
    statsEl.appendChild(uLocationSmallEl)
side1.appendChild(statsEl)

function updateDisplayName() { h5display.textContent = displayInputEl.value }
function updateLocation() { uLocationSmallEl.textContent = locationEl.value }
function updatePfp() { avatarDiv.querySelector('img').src = pfpUrlEl.value }

const side2 = previewIframeEl.createElement('div'); side2.classList.add('col2')
function makeGroup(title, contentID, contentElType) {
    const group = previewIframeEl.createElement('div');
    group.classList.add('group')
    
    const titleEl = previewIframeEl.createElement('h5');
    titleEl.classList.add('title')
    titleEl.textContent = title
    group.appendChild(titleEl)

    const contentEl = previewIframeEl.createElement(contentElType || 'ul');
    contentEl.id = contentID
    contentEl.title = contentElType + '#' + (contentID || 'ul')
    group.appendChild(contentEl)

    side2.appendChild(group)
    return contentEl
}
const uAboutMeEl = makeGroup('About me:', 'aboutme', 'p')
uAboutMeEl.innerHTML = bbcodeparse(u.about_me)
function updateAboutMe() { uAboutMeEl.innerHTML = bbcodeparse(aboutMeEl.value) }

const urecentlyEl = makeGroup('Recently edited articles:', 'recent-articles')
urecentlyEl.innerHTML = `
    <li><a href="#">Article</a><p>by someone</p></li>
    <li><a href="#">Article</a><p>by someone</p></li>
    <li><a href="#">Article</a><p>by someone</p></li>
    <li><a href="#">Article</a><p>by someone</p></li>
`
const urecentlyCommentsEl = makeGroup('Recent comments:', 'recent-comments')
urecentlyCommentsEl.innerHTML = `
    <li><a href="#">souple</a><p>on your blog</p></li>
    <li><a href="#">souple</a><p>on your blog</p></li>
    <li><a href="#">souple</a><p>on your blog</p></li>
    <li><a href="#">souple</a><p>on your blog</p></li>
`
const archiveEl = makeGroup('Archive:', 'archive', 'table')
archiveEl.classList.add('list')
archiveEl.innerHTML = `<tbody><tr><td class="social-name"><a href="/~${u.username}/archive">December 1969</a> (999)</td></tr></tbody>`

const socialLinksEl = makeGroup('Contact me:', 'contactme', 'table')
socialLinksEl.classList.add('list')
if (u.social_links) {
    Array.from(u.social_links).map((s) => {
        let trEl = previewIframeEl.createElement('tr')

        let tdEl = previewIframeEl.createElement('td');
        tdEl.classList.add('social-name')
        tdEl.width = '25%'
        tdEl.textContent = s.name
        
        let tdEl2 = previewIframeEl.createElement('td');
        tdEl2.classList.add('social-name')
        tdEl2.width = '75%'

        let aEl = previewIframeEl.createElement('a');
        aEl.href = s.url
        aEl.textContent = s.username
        tdEl2.appendChild(aEl)

        trEl.appendChild(tdEl)
        trEl.appendChild(tdEl2)
        socialLinksEl.appendChild(trEl)
    })
}


const side3 = previewIframeEl.createElement('div'); side3.classList.add('col3')
side3.innerHTML = `
    <h5 class="title">My weblog...</h5>
        <div class="weblog">
            <p class="blog-date">December 31, 1969 ~ 12:59 pm</p>
            <div class="blog-content">
                <h6 class="entry-title">Lorem ipsum</h6>
                <p class="blog-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div class="blog-links">
                <p>47 views</p><p> - </p><p><a href="#">0 comments</a></p>
            </div>
        </div>
    </div>
`

const side4 = previewIframeEl.createElement('div'); side4.classList.add('col4')

previewIframeEl.querySelector('body').appendChild(header); previewIframeEl.querySelector('body').appendChild(banner);
content.appendChild(side1); content.appendChild(side2);
content.appendChild(side3); content.appendChild(side4);
previewIframeEl.querySelector('body').appendChild(content)
previewIframeEl.querySelector('body').appendChild(userStyle)

var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = '/styles/main.css'
previewIframeEl.querySelector('head').appendChild(link)

var link2 = document.createElement('link');
    link2.type = 'text/css';
    link2.rel = 'stylesheet';
    link2.href = '/styles/user.css'
previewIframeEl.querySelector('head').appendChild(link2)

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
        })
        group.appendChild(button)

        return group
}
if (musicDetails && u && u.music) {
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