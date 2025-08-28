const id = window.location.pathname.slice(1).split('/')[1] || new URLSearchParams(window.location.search).get("")

async function fetchGET(endpoint) {
    let response
    response = await fetch('https://wiki.souple.workers.dev/' + endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    const json = await response.json()
    return json
}

async function fetchBlog(id) {
    const data = await fetchGET('blog/' + id)

    document.title= data.title + ' - ' + data.author + "'s blog"

    if (data.profile && data.profile.banner_url) {
        const img = document.createElement('img')
        img.src = data.profile.banner_url
        document.querySelector('#banner').appendChild(img)
    }
    if (data.profile && data.profile.pfp_url) {
        const pfp = document.querySelector('#avatar img')
        pfp.src = data.profile.pfp_url
    }
    const displayName = data.profile && data.profile.display_name || data.author
    document.querySelector('#display_name').textContent = displayName
    document.querySelector('h5#entry-title').textContent = data.title
    
    let date = new Date(data.created_at)
    let polishedDate = date.toLocaleString('UTC',{month:'long', day: 'numeric', year:'numeric'}) + 
                ' ~ ' + 
               date.toLocaleString('UTC',{ hour: 'numeric', minute: 'numeric'}).toLowerCase()
    document.querySelector('#entry-date.meta').innerHTML = 'Posted by <a href="/"></a> | ' + polishedDate
    document.querySelector('#entry-date.meta a').href = '/user/?=' + data.author
    document.querySelector('#entry-date.meta a').textContent = data.author.toUpperCase()
    document.querySelector('#entry-body').innerText = data.content
    
    document.querySelector('table#profile-link-options td#linkTo-profile a').href = '/user/?=' + data.author
    document.querySelector('table#profile-link-options td#linkTo-articles a').href = '/user/?=' + data.author + '/articles'
    document.querySelector('table#profile-link-options td#linkTo-blogs a').href = '/user/?=' + data.author + '/archive'
    document.querySelector('table#profile-link-options td#linkTo-polls a').href = '/user/?=' + data.author + '/polls'
    document.querySelector('table#profile-link-options td#linkTo-themes a').href = '/user/?=' + data.author + '/themes'
}

if (id) {
    fetchBlog(id)   
}