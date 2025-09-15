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
                var iframe = document.createElement('iframe');
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
                    ${data.layout_style}
                </style>
                <body>
                    <div id="main">
                        ${data.layout_html}
                    </div>
                </body>
                <script type="text/javascript" src="/js/nav.js"></script>
                <script>window.inIframe = true</script>
                <script type="text/javascript" src="/js/music.js"></script>
                <script type="text/javascript" src="/js/user.js"></script>
                `
                iframe.srcdoc = html;
                setupPopup(iframe)
              
                iframe.onload = function() {
                    iframe.contentWindow.document.body.querySelector('#user-style').innerHTML += data.layout_style
                    if (!disableJS) {
                        iframe.contentWindow.eval(data.layout_javascript)
                    }
                }
            })

            themeEl.appendChild(themeSourceEl)
            pendingThemesEl.appendChild(themeEl)
        }))
    }
}

spawnThemes()