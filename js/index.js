const submit = document.querySelector('form#login-form input[type="submit"]')
const loginForm = document.querySelector('form#login-form')

const categoriesArray = [
    "Other"
    ,"Technology"
    ,"Gaming"
    ,"Food"
    ,"Animals"
    ,"Websites"
    ,"Music"
    ,"Bands"
    ,"Software"
    ,"Souple"
    ,"Biography"
    ,"Science"
    ,"Geography"
    ,"History"
    ,"Literature"
    ,"Media"
    ,"Sports & Recreation"
    ,"Art & Design"
    ,"Astronomy"
    ,"Chemistry"
    ,"Computer Science"
    ,"Education"
    ,"Film"
]

function createArticleBody(data) {
    const parent = document.createElement('div')
    parent.classList.add('article')

    const articleTitle = document.createElement('h5')
    articleTitle.classList.add('article-title')
    articleTitle.textContent = data.title
    parent.appendChild(articleTitle)

    const p = document.createElement('p')
    p.innerHTML = bbcodeparse(data.content, true)
    parent.appendChild(p)

    const articleNav = document.createElement('div')
    articleNav.classList.add('nav')
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

function createBlogBody(data, idx) {
    const parent = document.createElement('div')
    parent.classList.add('blog')
    if (idx % 2) {
        parent.style.background = 'linear-gradient(125deg, rgb(239, 239, 239), #f9f9f9)'
    }

    const avatar = document.createElement('div')
    avatar.id = 'avatar'
    const avatarIMG = document.createElement('img')
    if (data.profile) {
        avatarIMG.src = data.profile.pfp_url
    } else {
        avatarIMG.src = '/images/ui/default.png'
    }
    
    avatar.appendChild(avatarIMG)
    parent.appendChild(avatar)

    const content = document.createElement('div')
    content.classList.add('blog-content')

    const blogTitle = document.createElement('h4')
    blogTitle.classList.add('blog-title')
    blogTitle.textContent = data.title
    content.appendChild(blogTitle)

    const p = document.createElement('p')
    p.innerHTML = bbcodeparse(data.content, true)
    content.appendChild(p)

    const nav = document.createElement('div')
    nav.classList.add('nav')
    const small = document.createElement('small')
    const author = document.createElement('a')
    author.href = "/~" + data.author
    author.textContent = data.author
    small.appendChild(author)
    small.innerHTML += '&nbsp;&nbsp;-&nbsp;&nbsp;'
    small.innerHTML += new Date(data.created_at).toLocaleDateString('en-US', {  year: 'numeric', month: 'long', day: 'numeric' })
    small.innerHTML += '&nbsp;&nbsp;-&nbsp;&nbsp;'
    small.innerHTML += data.view_count + ' views&nbsp;&nbsp;-&nbsp;&nbsp;'
    const blogLink = document.createElement('a')
    blogLink.href = '/blog/' + data.id
    blogLink.textContent = (data.comment_count | 0) + ' comments'
    small.appendChild(blogLink)
    nav.appendChild(small)
    content.appendChild(nav)

    parent.appendChild(content)

    return parent
}

async function fillHomepageContent() {
    const categoriesUL = document.querySelector('#categories ul')
    categoriesArray.map((c) => categoriesUL.innerHTML += `<li class="link" onclick="window.location.href='/category/${c.toLowerCase()}'">${c}</li>` )

    const fArticleEl = document.getElementById('featured-article')
    let data = await fetchGET('article/featured')
    fArticleEl.appendChild(createArticleBody(data))

    const rArticleEl = document.getElementById('random-article')
    data = await fetchGET('article/random')
    rArticleEl.appendChild(createArticleBody(data))

    const pArticleEl = document.getElementById('popular-article')
    data = await fetchGET('article/popular')
    pArticleEl.appendChild(createArticleBody(data))

    const blogsEl = document.getElementById('blogs')
    data = await fetchGET('blog/latest')
    data.map((blog, index) => {
        blogsEl.appendChild(createBlogBody(blog, index))
    })

    const newUsers = document.querySelector('#newest-users .w-content')
    data = await fetchGET('')
    data.new_users.map((u) => {
        const avatarURL = document.createElement('a')
        avatarURL.href = '/~' + u.username

        const avatar = document.createElement('div')
        avatar.id = 'avatar'
        const avatarIMG = document.createElement('img')
        avatarIMG.src = u.pfp_url || '/images/ui/default.png'
        avatar.appendChild(avatarIMG)
        avatarURL.appendChild(avatar)
        
        newUsers.appendChild(avatarURL)
    })
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