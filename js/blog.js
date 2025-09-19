const id = window.location.pathname.slice(1).split('/')[1] || new URLSearchParams(window.location.search).get("")

async function fetchBlog(id) {
    const data = await fetchGET('blog/' + id)

    document.title = data.title + ' - '
    if (data.author.endsWith('s')) {
        document.title+=data.author + "' blog"
    } else {
        document.title+=data.author + "'s blog"
    }

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
    document.querySelector('h5#entry-title').textContent = data.title
    
    let date = new Date(data.created_at)
    let polishedDate = date.toLocaleString('UTC',{month:'long', day: 'numeric', year:'numeric'}) + 
                ' ~ ' + 
               date.toLocaleString('UTC',{ hour: 'numeric', minute: 'numeric'}).toLowerCase()
    document.querySelector('#entry-date.meta').innerHTML = 'Posted by <a href="/"></a> | ' + polishedDate
    document.querySelector('#entry-date.meta a').href = '/~' + data.author
    document.querySelector('#entry-date.meta a').textContent = data.author.toUpperCase()
    document.getElementById('view-count').textContent = data.view_count + " views"
    document.querySelector('#entry-body p').innerHTML = bbcodeparse(data.content)

    const entry = document.getElementById('entry')
    if(data.music && typeof data.music === 'object') {
        const mPlayer = document.createElement('div')
        mPlayer.id = 'music-player'

        const mTable = document.createElement('table')
        mTable.innerHTML = `
        <table cellspacing="0">
            <tbody>
                <tr>
                    <td onclick="javascript:void();" id="play-toggle">
                        <img src="/images/ui/play.png" id="toggle-btn">
                    </td>
                    <td id="time-elapsed">
                        <small>&nbsp;0:00&nbsp;&nbsp;</small>
                    </td>
                    <td id="progress-bar" width="0%" bgcolor="#CE5151">
                    </td>
                    <td id="seek-slider" width="149">
                        <input type="range" value="0" min="0" max="100">
                    </td>
                    <td id="seek-bar" width="100%" bgcolor="#BFA2A2">
                    </td>
                    <td id="time-duration">
                        <small>&nbsp;&nbsp;0:00&nbsp;</small>
                    </td>
                </tr>
            </tbody>
        </table>
        `
        mPlayer.appendChild(mTable)

        const pEl = document.createElement('p')
        pEl.textContent = '♪ ♩ ♬ ' + data.music.song_name + ' -- ' + data.music.artist_name
        mPlayer.appendChild(pEl)
        entry.insertBefore(mPlayer, document.getElementById('entry-body'))

        const controls = {
            toggle: mPlayer.querySelector('#play-toggle'),
        };

        window.musicPlayer = new MusicPlayer([data.music], controls, mPlayer.querySelector('#seek-slider input'))
    }
    document.querySelector('style#blog-style').innerHTML = data.style
    
    document.querySelector('table#profile-link-options td#linkTo-profile a').href = '/~' + data.author
    document.querySelector('table#profile-link-options td#linkTo-articles a').href = '/~' + data.author + '/articles'
    document.querySelector('table#profile-link-options td#linkTo-blogs a').href = '/~' + data.author + '/archive'
    document.querySelector('table#profile-link-options td#linkTo-polls a').href = '/~' + data.author + '/polls'
    document.querySelector('table#profile-link-options td#linkTo-themes a').href = '/~' + data.author + '/themes'

    // Display comments
    await displayComments('blog/' + id)
}

if (id) {
    fetchBlog(id)
}