const id = window.location.pathname.slice(1).split('/')[1] || new URLSearchParams(window.location.search).get("")

async function useTheme(num) {
      try {
        const response = await fetch("https://wiki.souple.workers.dev/theme/" + num + "/use", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
  
        return response.ok
      } catch (error) {
        alert(`Error using theme: ` + error);
      }
  }

async function fetchTheme(id) {
    const data = await fetchGET('theme/' + id, true)
    const useThisButton = document.querySelector('button#use-this')
    if (!localStorage.token) {
        useThisButton.remove()
    } else {
        if (u.theme === id) {
            useThisButton.textContent = 'Remove this theme'
            useThisButton.classList.add('tog')
        }
        useThisButton.addEventListener('click', async () => {
            const response = useTheme(id)
            if (response) {
                if (u.theme === id) {
                    useThisButton.textContent = 'Remove this theme'
                    useThisButton.classList.add('tog')
                } else {
                    useThisButton.textContent = 'Use this theme'
                    useThisButton.classList.remove('tog')
                }
                u = { ...u, theme: id}
            }
        })
    }
    document.title = data.title + ' - '
    if (data.author.endsWith('s')) {
        document.title+=data.author + "' theme"
    } else {
        document.title+=data.author + "'s theme"
    }

    /* Profile data (banner, user-info) */
    if (data.profile && data.profile.banner_url) {
        const img = document.createElement('img')
        img.src = data.profile.banner_url
        document.getElementById('banner').appendChild(img)
    }
    if (data.profile && data.profile.pfp_url) {
        const pfp = document.querySelector('#avatar img')
        pfp.src = data.profile.pfp_url
    }
    const displayName = data.profile && data.profile.display_name || data.author
    document.getElementById('display_name').textContent = displayName
    document.getElementById('entry-title').textContent = data.title

    document.querySelector('table#profile-link-options td#linkTo-profile a').href = '/~' + data.author
    document.querySelector('table#profile-link-options td#linkTo-articles a').href = '/~' + data.author + '/articles'
    document.querySelector('table#profile-link-options td#linkTo-blogs a').href = '/~' + data.author + '/archive'
    document.querySelector('table#profile-link-options td#linkTo-polls a').href = '/~' + data.author + '/polls'
    document.querySelector('table#profile-link-options td#linkTo-themes a').href = '/~' + data.author + '/themes'
    
    /* Theme info */
    let date = new Date(data.created_at)
    let polishedDate = date.toLocaleString('UTC',{month:'long', day: 'numeric', year:'numeric'}) + 
                ' ~ ' + 
               date.toLocaleString('UTC',{ hour: 'numeric', minute: 'numeric'}).toLowerCase()
    document.querySelector('#entry-date.meta').innerHTML = 'Posted by <a href="/"></a> | ' + polishedDate
    document.querySelector('#entry-date.meta a').href = '/~' + data.author
    document.querySelector('#entry-date.meta a').textContent = data.author.toUpperCase()
    document.getElementById('view-count').textContent = data.view_count + " views"
    document.querySelector('.description').innerHTML += bbcodeparse(data.content)

    const disableJS = document.querySelector('input#disable-js[type="checkbox"]').checked

    const thumbnailEl = document.querySelector('#thumbnail-preview img')
    thumbnailEl.src = data.thumbnail
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
            iframe.contentWindow.document.body.querySelector('#user-style').innerHTML = data.layout_style
            if (!disableJS) {
                iframe.contentWindow.eval(data.layout_javascript)
            }
        }
    })

    document.querySelector('#more-info #created-at').textContent = returnUTCTime(new Date(data.created_at))
    document.querySelector('#more-info #accepted-at').textContent = returnUTCTime(new Date(data.approved_at))
    document.querySelector('#more-info #last-modified').textContent = returnUTCTime(new Date(data.last_modified))
    document.querySelector('#more-info #favorites').textContent = data.favorites || 0

    document.querySelector('#more-info #reviewer a').textContent = data.reviewer
    document.querySelector('#more-info #reviewer a').href = '/~' + data.reviewer

    document.querySelector('#more-info #author a').textContent = data.author
    document.querySelector('#more-info #author a').href = '/~' + data.author

    document.getElementById('html-content').innerHTML = data.layout_html
    document.getElementById('js-content').innerHTML = data.layout_javascript
    document.getElementById('css-content').innerHTML = data.layout_style

    const tagsEl = document.querySelector('#more-info #tags')
    const len = data.tags.length
    data.tags.map(t => {
        let a = document.createElement('a')
        a.href = '/tags/' + t
        a.textContent = t

        tagsEl.appendChild(a)
        if (len > 1) {
            tags.innerText += ', '
        }
    })

    // Display comments
    await displayComments('theme/' + id)
}

if (id) {
    fetchTheme(id)
}