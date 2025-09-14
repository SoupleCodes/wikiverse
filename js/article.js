const id = window.location.pathname.slice(1).split('/')[1] || new URLSearchParams(window.location.search).get("")

function returnPolishedDate(t) {
    return t.toLocaleString('UTC',{month:'long', day: 'numeric', year:'numeric'}) + 
                ' ~ ' + 
           t.toLocaleString('UTC',{ hour: 'numeric', minute: 'numeric'}).toLowerCase()
}

async function updateArticle(id, content) {
    try {
        let response
        response = await fetch('https://wiki.souple.workers.dev/article/' + id, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${localStorage.token}` 
            },
            body: JSON.stringify({ content: content })
        })
        if(response.ok) {
            alert('Article updated')
        }
    } catch (err) {
        console.error('Something went wrong with editing this article...', err)
    }
}

async function fetchArticle(id) {
    const data = await fetchGET('article/' + id)

    document.title= data.title

    let entryTitle = document.querySelector('h5#entry-title')
    document.querySelector('#entry-body')
    entryTitle.textContent = data.title
    
    let date = new Date(data.created_at)
    let lastModifiedDate = new Date(data.last_modified)

    let dateElement = document.querySelector('#entry-date.meta')
    dateElement.innerHTML = 'Posted at ' + returnPolishedDate(date)

    let lastDateElement = document.createElement('div')
    lastDateElement.id = 'last-modified'
    lastDateElement.textContent = 'Last modified at ' + returnPolishedDate(lastModifiedDate)
    dateElement.appendChild(lastDateElement)

    const navSmall = document.createElement('small')
    navSmall.style.float = 'right'

    let navEditElement = document.createElement('a')
    navEditElement.id = 'edit'
    navEditElement.textContent = 'Edit'
    navEditElement.href = '#'

    const navHElement = document.createElement('a')
    navHElement.id = 'history'
    navHElement.textContent = 'History'
    navHElement.href = '#'

    navSmall.appendChild(navEditElement)
    navSmall.innerHTML += '&nbsp;&nbsp;&nbsp;'
    navSmall.appendChild(navHElement)

    entryTitle.appendChild(navSmall)
    document.querySelector("textarea#articleEdit").value = data.content
    document.querySelector('#entry-body p').innerHTML = bbcodeparse(data.content)

    // Display comments
    await displayComments('article/' + id)

    const navEdit = document.querySelector('#entry a#edit')
    const entryBody = document.querySelector('#entry-body')
    const entryEditArea = document.querySelector('#entry-edit')
    const articleEdit = entryEditArea.querySelector("textarea#articleEdit")
    const articleEditButton = entryEditArea.querySelector("button#article-edit")
    let oldContent = articleEdit.value
   
    navEdit.addEventListener("click", () => {
        entryBody.classList.toggle("hidden")
        entryEditArea.classList.toggle("hidden")
    })
    articleEditButton.addEventListener("click", async () => {
        let newContent = articleEdit.value
        if (oldContent !== newContent) {
            entryBody.innerHTML = bbcodeparse(newContent)
            await updateArticle(id, newContent)
            oldContent = newContent
        }
        entryBody.classList.toggle("hidden")
        entryEditArea.classList.toggle("hidden")
    })

}

if (id) {
    fetchArticle(id)
}