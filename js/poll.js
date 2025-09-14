const id = window.location.pathname.slice(1).split('/')[1] || new URLSearchParams(window.location.search).get("")

async function voteInPoll(id, index) {
    const response = await fetch("https://wiki.souple.workers.dev/poll/" + id + '/vote', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}` 
        },
        body: JSON.stringify({
            option: index
        })
    });
    if(!response.ok) {
        throw new Error(response.message)
    }
}

async function fetchPoll(id) {
    let data
    if (localStorage.token) {
        data = await fetchGET(('poll/' + id), true)
    } else {
        data = await fetchGET(('poll/' + id))
    }

    document.title = data.question + ' - '
    if (data.author.endsWith('s')) {
        document.title+=data.author + "' poll"
    } else {
        document.title+=data.author + "'s poll"
    }

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
    document.querySelector('h5#poll-title').textContent = data.question

    let date = new Date(data.created_at)
    let polishedDate = date.toLocaleString('UTC',{month:'long', day: 'numeric', year:'numeric'}) + 
                ' ~ ' + 
               date.toLocaleString('UTC',{ hour: 'numeric', minute: 'numeric'}).toLowerCase()
    document.querySelector('#entry-date.meta').innerHTML = 'Posted by <a href="/"></a> | ' + polishedDate
    document.querySelector('#entry-date.meta a').href = '/~' + data.author
    document.querySelector('#entry-date.meta a').textContent = data.author.toUpperCase()
    document.querySelector('#view-count').textContent = data.view_count + " views"

    const table = document.querySelector('#poll-options tbody')
    let voteCount = 0
    let votedFor = data.user_vote ? data.user_vote - 1 : -1
    console.log(votedFor)
    data.options.map(o => { voteCount += o.votes })
    data.options.map(o => {
        const tr = document.createElement('tr')

        const td = document.createElement('td')
        td.classList.add('poll')
        td.height = 11

        const div = document.createElement('div')
        div.classList.add('tube')
        if (voteCount < 1) {
            div.style.right = '100%'
        } else {
            div.style.right = (1 - (o.votes / voteCount)) * 100 + '%'
        }
        td.appendChild(div)

        const small = document.createElement('small')
        small.textContent = o.votes + " people said "

        const b = document.createElement('b')
        b.textContent = o.option
        small.appendChild(b)

        td.appendChild(small)
        tr.appendChild(td)
        table.appendChild(tr)
    })

    const options = data.options
    Array.from(table.children).map((c) => {
        function updateBars() {
            Array.from(table.children).map((c) => {
                if (voteCount < 1) {
                    c.querySelector('.tube').style.right = '100%'
                } else {
                    c.querySelector('.tube').style.right = (1 - (options[c.rowIndex].votes / voteCount)) * 100 + '%'
                }
            })
        }
        c.addEventListener("click", async function() {
            if (votedFor > -1) {
                options[votedFor].votes--
                table.children[votedFor].querySelector('small').childNodes[0].textContent = options[votedFor].votes + " people said "
                voteCount--
            }
            if (votedFor === c.rowIndex) {
                if (options[votedFor].votes > 0) {
                    voteCount--
                    options[votedFor].votes--
                }
                updateBars()
                votedFor=-1
                return ''
            } else {
                votedFor = c.rowIndex
                options[votedFor].votes++
                voteCount++
                await voteInPoll(id, votedFor + 1)
            }
            c.querySelector('small').childNodes[0].textContent = options[votedFor].votes + " people said "
            updateBars()
        })
    })

    // Display comments
    await displayComments('poll/' + id)
}

if (id) {
    fetchPoll(id)
}