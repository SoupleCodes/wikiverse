const token = localStorage.token
let u = localStorage.user

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
    linkUserInput.placeholder = 'John Doe'
    linkUserInput.value = data.username
    userLabel.appendChild(linkUserInput)

    const siteNameLabel = document.createElement('label')
    const siteNameInput = document.createElement('input')
    siteNameInput.name = 'link-sitename'
    siteNameInput.placeholder = 'Wikiverse'
    siteNameInput.value = data.name
    siteNameLabel.appendChild(siteNameInput)

    const urlLabel = document.createElement('label')
    const urlInput = document.createElement('input')
    urlInput.name = 'link-sitename'
    urlInput.placeholder = 'https://wikiverse.pages.dev'
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