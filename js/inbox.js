async function acceptTheme(id) {
    const response = await fetch("https://wiki.souple.workers.dev/theme/" + id + '/accept', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}` 
        },
    });
    if(!response.ok) {
        throw new Error(response.message)
    }
}

async function getInbox() {
    const data = await fetchGET('inbox', true)
    const inbox = document.querySelector('ul#inbox')
    data.inbox.forEach(message => {
        const li = document.createElement('li')
        let link
        if(message.origin_type === 'user') {
            link = '/~' + message.origin_id
        } else {
            link = '/' + message.origin_type + '/' + message.origin_id
        }
        li.innerHTML = `
            <div>
                <a href="#" style="padding-left: 12px;">@${message.sender || 'unnamed'}</a>
                <a href="#" class="date">${returnUTCTime(message.created_at)}</a>
            </div>
            <div>
                <p>${message.content}</p>
                <a href="${link}${message.comment_id ? `#comment-${message.comment_id}` : ''}" class="date">${message.comment_id ?? '(View this comment.)'}</a>
            </div>
        `
        inbox.appendChild(li)
    })
}

async function spawnThemes() {
    const pendingThemesEl = document.getElementById('pending-themes')
    const data = await fetchGET('theme/pending', true)
    if (data) {
        data.map((data => {
            const themeEl = document.createElement('div')
            themeEl.classList.add('theme')

            const themeViewEl = document.createElement('div')
            themeViewEl.classList.add('theme-view')

            const thumbnailEl = document.createElement('img')
            thumbnailEl.classList.add('thumbnail')
            thumbnailEl.src = data.thumbnail || ''
            themeViewEl.appendChild(thumbnailEl)

            const themeInfoEl = document.createElement('div')
            themeInfoEl.classList.add('theme-info')
            const title = document.createElement('p')
            title.textContent = data.title
            themeInfoEl.appendChild(title)
            const small = document.createElement('small')
            small.textContent = 'by ~' + data.author + " | " + new Date(data.created_at).toUTCString()
            themeInfoEl.appendChild(small)
            const description = document.createElement('p')
            description.classList.add('description')
            description.textContent = bbcodeparse(data.content)
            themeInfoEl.appendChild(description)
            themeViewEl.appendChild(themeInfoEl)

            const buttons = document.createElement('div')
            buttons.classList.add('buttons')
            const rejectButton = document.createElement('button')
            rejectButton.textContent = 'Reject'
            buttons.appendChild(rejectButton)
            buttons.innerHTML += '&nbsp;'
            const acceptButton = document.createElement('button')
            acceptButton.textContent = 'Accept'
            acceptButton.addEventListener('click', async() => {
                await acceptTheme(data.id)
                themeEl.remove()
            })
            buttons.appendChild(acceptButton)
            themeViewEl.appendChild(buttons)
            themeEl.appendChild(themeViewEl)

            const themeSourceEl = document.createElement('div')
            themeSourceEl.classList.add('theme-source')
            themeSourceEl.innerHTML = `
<div>
    <small>HTML:</small>
    <textarea disabled></textarea>
</div>
<div>
    <small>Javascript</small>
    <textarea disabled></textarea>
    <div style="color: gray;font-size: 8px;float: right;">
        <input type="checkbox" style="height: 8px;">Disable JS?
    </div>
</div>
<div>
    <small>CSS</small>
    <textarea disabled></textarea>
</div>
            `

            const htmlEl = themeSourceEl.querySelectorAll('div textarea')[0]
            const scriptsEl = themeSourceEl.querySelectorAll('div textarea')[1]
            const cssEl = themeSourceEl.querySelectorAll('div textarea')[2]
            const disableJS = themeSourceEl.querySelector('input[type="checkbox"]').checked
            htmlEl.innerHTML = data.layout_html
            scriptsEl.innerHTML = data.layout_javascript
            cssEl.innerHTML = data.layout_style

            thumbnailEl.addEventListener("click", function() {
                previewTheme(
                    data.layout_html, 
                    data.layout_style, 
                    disableJS ? null : data.layout_javascript
                )
            })

            themeEl.appendChild(themeSourceEl)
            pendingThemesEl.appendChild(themeEl)
        }))
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const main = document.getElementById('main')
    let u = localStorage.getItem('user')
    if (u) u = JSON.parse(u)
    if (u.role === 'reviewer') main.insertAdjacentHTML('afterbegin', '<label><h5>Themes pending for review:</h5><div id="pending-themes"></div></label>'); spawnThemes()

    getInbox()
})