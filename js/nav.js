// Check if token expired
const JWT = localStorage.token

if(JWT) {
    const jwtPayload = JSON.parse(window.atob(JWT.split('.')[1]))
    const isExpired = Date.now() >= jwtPayload.exp * 1000;
    if(isExpired) { localStorage.clear() }
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

document.addEventListener('DOMContentLoaded', function() {
    let nav = document.querySelector('nav#topbar')
    if(nav) {
        nav.innerHTML = `
            <a href="/">
                <img id="logo" src="/images/ui/logo.png"/>
            </a>
            <ul id="site-options">
                <a href="/browse"><li>browse</li></a>
                <a id="create"><li class="link">create</li></a>
                <a href="/about"><li>about</li></a>
                <a href="/tos"><li>tos</li></a>
                <a href="/docs"><li>documentation</li></a>
            </ul>
            <ul id="user-options">
                <a href="/help"><li>help</li></a>
                <a href="/join"><li>join</li></a>
            </ul>
        `

        let storage = localStorage.getItem('user')
        let userData = JSON.parse(storage)
        let userOptions = nav.querySelector('#user-options')
        if(storage) {
            userOptions.innerHTML += `
                <li id="separator">|</li>
                <a id="my-profile"><li class="link">my profile</li></a>
            `
            setupDropdown({
                view: '/~' + userData.username,
                edit: '/me',
                inbox: '/inbox',
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
    }
})