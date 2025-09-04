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

async function updateProfile() {
    let display_name = displayInputEl.value
    let pfp_url = pfpUrlEl.value
    let banner_url = bannerUrlEl.value
    let location = locationEl.value
    let about_me = aboutMeEl.value
    let style = styleEl.value
    let social_links = []

    Array.from(linksEl.children).map((s) => {
        social_links.push({
            username: s.children[0].querySelector('input').value,
            name: s.children[1].querySelector('input').value,
            url: s.children[2].querySelector('input').value,
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
            social_links
        })
    });
    try {
        if (response.ok) {
            u = { ...u, display_name, pfp_url, banner_url, location, about_me, style, social_links }
            localStorage.setItem('user', JSON.stringify(u))
            alert('Profile updated successfully');
        } else {
            const error = await response.text();
            console.error("Error updating user:", error);
        }
    } catch (error) {
        console.error("Error updating the user", error);
    }
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

if (linksEl) {
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

const side1 = previewIframeEl.createElement('div'); side1.id = 'side1';
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

const side2 = previewIframeEl.createElement('div'); side2.id = 'side2'
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
archiveEl.innerHTML = `<tbody><tr><td class="social-name"><a href="/~${u.username}/archive">December 1969</a> (999)</td></tr></tbody>`

const socialLinksEl = makeGroup('Contact me:', 'contactme', 'table')
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


const side3 = previewIframeEl.createElement('div'); side3.id = 'side3'
const side4 = previewIframeEl.createElement('div'); side4.id = 'side4'

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