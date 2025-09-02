const token = localStorage.token
let u = localStorage.user

const displayInputEl = document.querySelector('input[name="display_name"]')
const pfpUrlEl = document.querySelector('input[name="pfp_url"]')
const locationEl = document.querySelector('input[name="location"]')
const aboutMeEl = document.querySelector('textarea#content')
const styleEl = document.querySelector('#edit-style textarea#content')
if (u) {
    u = JSON.parse(u)
    displayInputEl.value = u.display_name
    pfpUrlEl.value = u.pfp_url
    locationEl.value = u.location
    aboutMeEl.value = u.about_me
    styleEl.value = u.style
}

async function updateProfile() {
    const response = await fetch(`https://wiki.souple.workers.dev/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            display_name: displayInputEl.value,
            pfp_url: pfpUrlEl.value,
            location: locationEl.value,
            about_me: aboutMeEl.value,
            style: styleEl.value
        })
    });
    try {
        if (response.ok) {
            alert('Profile updated successfully');
        } else {
            const error = await response.text();
            console.error("Error updating user:", error);
        }
    } catch (error) {
        console.error("Error updating the user", error);
    }
}