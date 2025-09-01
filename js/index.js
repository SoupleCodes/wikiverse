const submit = document.querySelector('form#login-form input[type="submit"]')
const loginForm = document.querySelector('form#login-form')

function createArticleBody(data) {
    const parent = document.createElement('div')
    parent.classList.add('article')

    const articleTitle = document.createElement('h5')
    articleTitle.classList.add('article-title')
    articleTitle.textContent = data.title
    parent.appendChild(articleTitle)

    const p = document.createElement('p')
    p.innerHTML = bbcodeparse(data.content)
    parent.appendChild(p)

    const articleNav = document.createElement('div')
    articleNav.classList.add('article-nav')
    const small = document.createElement('small')
    const author = document.createElement('a')
    author.href = "/~" + data.author
    author.textContent = data.author
    small.appendChild(author)
    small.innerHTML += '&nbsp;&nbsp;-&nbsp;&nbsp;'
    small.innerHTML += new Date(data.created_at).toLocaleDateString('en-US', {  year: 'numeric', month: 'long', day: 'numeric' })
    small.innerHTML += '&nbsp;&nbsp;-&nbsp;&nbsp;'
    small.innerHTML += data.view_count + ' views&nbsp;&nbsp;-&nbsp;&nbsp;'
    const articleLink = document.createElement('a')
    articleLink.href = '/article/' + data.id
    articleLink.textContent = (data.comment_count | 0) + ' comments'
    small.appendChild(articleLink)
    articleNav.appendChild(small)
    parent.appendChild(articleNav)

    return parent
}

async function fillHomepageContent() {
    const fArticleEl = document.getElementById('featured-article')
    let data = await fetchGET('article/featured')
    fArticleEl.appendChild(createArticleBody(data))

    const rArticleEl = document.getElementById('random-article')
    data = await fetchGET('article/random')
    rArticleEl.appendChild(createArticleBody(data))

    const pArticleEl = document.getElementById('popular-article')
    data = await fetchGET('article/popular')
    pArticleEl.appendChild(createArticleBody(data))
}
fillHomepageContent()

submit.addEventListener('click', async (e) => {
    e.preventDefault()

    const formData = new FormData(loginForm)
    const data = Object.fromEntries(formData.entries())

    try {
        const response = await fetch("https://wiki.souple.workers.dev/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if(!response.ok) {
            throw new Error(response.message)
        }
        
        const responseData = await response.json()
        localStorage.clear()
        localStorage.setItem('token', responseData.token)
        localStorage.setItem('user', JSON.stringify(responseData.user))

        window.location.reload()
    } catch (error) {
        alert('Error: ' + error)
    }
})