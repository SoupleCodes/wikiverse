const token = localStorage.token
let u = localStorage.user

const displayInputEl = document.querySelector('input[name="display_name"]')
const pfpUrlEl = document.querySelector('input[name="pfp_url"]')
const bannerUrlEl = document.querySelector('input[name="banner_url"]')
const locationEl = document.querySelector('input[name="location"]')
const aboutMeEl = document.querySelector('#edit-content textarea#content')
const styleEl = document.querySelector('#edit-style textarea#content')
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
            style
        })
    });
    try {
        if (response.ok) {
            u = { ...u, display_name, pfp_url, banner_url, location, about_me, style }
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