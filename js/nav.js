// Check if token expired
const JWT = localStorage.token

if(JWT) {
    const jwtPayload = JSON.parse(window.atob(JWT.split('.')[1]))
    const isExpired = Date.now() >= jwtPayload.exp * 1000;
    if(isExpired) { localStorage.clear() }
}

window.fetchGET = async function fetchGET(endpoint) {
    let response
    response = await fetch('https://wiki.souple.workers.dev/' + endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    return await response.json()
}

async function logOut() {
    await fetch('https://wiki.souple.workers.dev/logout/', {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${localStorage.token}` 
        },
    })
    localStorage.clear()
    window.location.href = '/'
}

const nav = document.querySelector('nav#topbar')

if(nav) {
    nav.innerHTML = `
        <a href="/">
            <img id="logo" src="/images/ui/logo.png"/>
        </a>
        <ul id="site-options">
            <a href="/browse"><li>browse</li></a>
            <a id="create"><li class="link">create</li></a>
            <a href="/themes"><li>themes</li></a>
            <a href="/tos"><li>tos</li></a>
            <a href="/docs"><li>documentation</li></a>
        </ul>
        <ul id="user-options">
            <a href="/help"><li>help</li></a>
            <a href="/join"><li>join</li></a>
        </ul>
    `
}

let storage = localStorage.getItem('user')
let userData = JSON.parse(storage)
let userOptions = nav.querySelector('#user-options')
if(storage) {
    userOptions.innerHTML += `
        <li>|</li>
        <a id="my-profile"><li class="link">my profile</li></a>
    `
    setupDropdown({
        view: '/~' + userData.username,
        edit: '/me',
        "log out": 'javascript:logOut();'
    }, 'a#my-profile')
    setupDropdown({
        article: '/create/article',
        blog: '/create/blog',
        poll: '/create/poll',
        theme: '/create/theme'
    }, 'a#create')
} else {
    userOptions.innerHTML += '<a href="/login"><li>login</li></a>'
    nav.querySelector('#site-options a#create').href = '/login'
}