const form = document.querySelector('form#create-form')
const textarea = document.querySelector('textarea#content')
let txtHTML = document.querySelector('#edit-html textarea')
let txtCSS = document.querySelector('#edit-style textarea')
let txtJS = document.querySelector('#edit-scripts textarea')
if (txtHTML && !txtHTML.value) {
  txtHTML.value = 
`<div id="header">
    <h5 id="display"></h5>
</div>
<div id="banner"></div>
<div id="content">
    <div id="userside" class="col1">
        <div id="avatar">
            <img src="/images/ui/default.png"/>
            <button title="Follow this user?" id="follow">+</button>
        </div>
        <h5 id="display_name"></h5>
        <div id="stats">
            <h6>Member since:</h6>
            <small id="join-date"></small>
            <h6>Last seen:</h6>
            <small id="last-seen"></small>
            <h6>Location:</h6>
            <small id="user-location"></small>
        </div>
    </div>
    <div id="userinfo" class="col2">
        <div class="group">
            <h5 class="title">About me:</h5>
            <p id="aboutme"></p>
        </div>
        <div class="group">
            <h5 class="title">Recently edited articles:</h5>
            <ul id="recent-articles"></ul>
        </div>
        <div class="group">
            <h5 class="title">Recent comments:</h5>
            <ul id="recent-comments"></ul>
        </div>
        <div class="group">
            <h5 class="title">Archive:</h5>
            <table id="archive" class="list noline"></table>
        </div>
        <div class="group">
            <h5 class="title">Contact me:</h5>
            <table id="contactme" class="list"></table>
        </div>
    </div>
    <div id="weblogs" class="col3">
        <h5 class="title">My weblog...</h5>
    </div>
    <div id="modules" class="col4">
      <div class="w-modul" id="music"></div>
      <div class="w-modul" id="following"></div>
      <div class="w-modul" id="followers"></div>
    </div>
</div>
<div id="comments-section">
    <h5 id="comment-count" class="title"></h5>
    <p id="showing"></p>
    <div id="comments"></div>
    <div id="comment-box">
        <textarea id="typearea" placeholder="Type something here!"></textarea>
        <button id="submit">submit</button>
    </div>
</div>`
}

const preview = document.querySelector('div#content')
const musicPreview = document.querySelector('#edit-music #music-editor')
const ppartsinputs = document.querySelector('#inputs-for-parent-part')
const prevToggl = document.querySelector('input[name=toggle-preview]')
const partsToggl = document.querySelector('input[name=toggle-parent]')
const commentsToggl = document.querySelector('input[name=toggle-comments]')
const globalCSSToggl = document.querySelector('input[name=toggle-globalcss]')
const musicToggl = document.querySelector('input[name=toggle-music]')

const addTagBtn = document.querySelector('button#add-tag')
const tagsElement = document.getElementById('tags')
const tagAddInput = document.querySelector('input#add-tags')

const addOptionBtn = document.querySelector('button#add-option')
const optionsElement = document.getElementById('options')
const optionAddInput = document.querySelector('input#add-option')

const tabsMusic = document.querySelector('#tabs-music.tab-content')
function updateMusicPreview() {
  const previewTarg = musicPreview.querySelector('.song-group')
  previewTarg.querySelector('.song-detail small').textContent = tabsMusic.children[0].value
  previewTarg.querySelector('.song-detail p').textContent = tabsMusic.children[1].value
  previewTarg.querySelector('.song-date').textContent = tabsMusic.children[4].value
  previewTarg.querySelector('.song-album').textContent = tabsMusic.children[5].value
  previewTarg.querySelector('.song-genre').textContent = tabsMusic.children[6].value

  previewTarg.setAttribute('songurl', tabsMusic.children[2].value)

  previewTarg.querySelector('img').src = tabsMusic.children[3].value
}

if (tabsMusic) {
  const inputs = tabsMusic.querySelectorAll('input')
  inputs.forEach(el => el.addEventListener('input', () => updateMusicPreview()))
}

const emojiList = document.getElementById('emoji-list')
if (prevToggl) {
  prevToggl.checked = false;
  prevToggl.addEventListener('change', function() {
    textarea.classList.toggle('hidden')
    preview.querySelector('p').innerHTML = bbcodeparse(textarea.value)
    preview.classList.toggle('hidden')
  });
}
if (partsToggl) { 
  partsToggl.checked = false;
  partsToggl.addEventListener('change', function() {
    ppartsinputs.classList.toggle('hidden')
  });
}
if (commentsToggl) commentsToggl.checked = true;
if (globalCSSToggl) globalCSSToggl.checked = false
if (musicToggl) { 
  musicToggl.checked = false;
  musicToggl.addEventListener('change', function() {
    musicPreview.classList.toggle('hidden')
  });
}

const token = localStorage.token

async function submitArticle() {
  let title = document.getElementById('title').value
  let content = document.querySelector('textarea#content').value
  let subject = document.querySelector('select#subject').value
    try {
      const response = await fetch("https://wiki.souple.workers.dev/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content,
          subject
        })
      });

      if (response.ok) {
        const re = await response.json();
        alert("Article submitted successfully!");
        window.location.href = `/article/${re.id}`
      }
    } catch (error) {
      alert(`Error submitting article: ` + error);
    }
}

async function submitPoll() {
  let question = document.getElementById('question').value
  let options = document.getElementById('options')
  let optionsArray = []
  Array.from(options.children).map((o) => {
    optionsArray.push(o.firstChild.value)
  }) 

  try {
    const response = await fetch("https://wiki.souple.workers.dev/poll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        question,
        options: optionsArray
      })
    });

    if (response.ok) {
      const re = await response.json();
      alert("Poll submitted successfully!");
      window.location.href = `/poll/${re.id}`
    }
  } catch (error) {
    alert(`Error submitting poll: ` + error);
  }
}

async function submitTheme() {
  let title = document.getElementById('title').value
  let thumbnail = document.getElementById('thumurl').value
  let content = document.querySelector('textarea#content').value
  let layout_html = document.getElementById('html').value
  let layout_style = document.getElementById('style').value
  let layout_javascript = document.getElementById('scripts').value

  let tags = []
  Array.from(tagsElement.children).map((t) => {
    tags.push(t.firstChild.textContent)
  })

  try {
    const response = await fetch("https://wiki.souple.workers.dev/theme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        content,
        thumbnail,
        layout_html,
        layout_style,
        layout_javascript,
        tags
      })
    });

    if (response.ok) {
      alert("Theme submitted successfully! Awaiting to be accepted by a reviewer!");
      window.location.href = `/`
    }
  } catch (error) {
    alert(`Error submitting theme: ` + error);
  }
}

async function submitBlog() {
  let title = document.getElementById('title').value
  let content = document.querySelector('textarea#content').value
  let parent = 0
  let part = 0
  if (partsToggl.checked) {
    parent = document.querySelector('input#parent-id').value
    part = document.querySelector('input#part-id').value
  }
  let comments_enabled = commentsToggl.checked | 0
  let includeglobal = globalCSSToggl.checked | 0
  let style = document.querySelector('#edit-style textarea').value
  let tags = []
  let music = {}
  if (musicToggl.checked) {
    const detailOptions = document.querySelector('#tabs-music.tab-content').children

    let artist_name = detailOptions[0].value
    let song_name = detailOptions[1].value
    let song_url = detailOptions[2].value
    let cover_art = detailOptions[3].value
    let published = detailOptions[4].value
    let album = detailOptions[5].value
    let genre = detailOptions[6].value

    if (!artist_name) throw new Error('Artist name missing!')
    if (!song_name) throw new Error('Song name missing!')
    if (!song_url) throw new Error('Song url missing!')
    if (!published) throw new Error('Date missing!')

    music = {
      artist_name,
      song_name,
      song_url,
      cover_art,
      published,
      album,
      genre
    } 
  }
  Array.from(tagsElement.children).map((t) => {
    tags.push(t.firstChild.textContent)
  })

  try {
    const response = await fetch("https://wiki.souple.workers.dev/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        content,
        parent,
        part,
        comments_enabled,
        style,
        tags,
        includeglobal,
        music
      })
    });

    if (response.ok) {
      const re = await response.json();
      alert("Blog submitted successfully!");
      window.location.href = `/blog/${re.id}`
    }
  } catch (error) {
    alert(`Error submitting blog: ` + error);
  }
}

function insertAtStart(s) {
  let sStart = textarea.selectionStart
  let sEnd = textarea.selectionEnd
  let textAreaVal = textarea.value
  let newStr = textAreaVal.substr(0, sStart) + s + textAreaVal.substr(sStart);

  textarea.value = newStr
}

if (emojiList) {
  let keyValPairs = {}
  for (let i = 0; i < smileys.length; i+=2) {
    const k = smileys[i]
    const val = smileys[i + 1]
    keyValPairs[k] = val
  }

  for (const [k, v] of Object.entries(keyValPairs)) {
    let imgEl = document.createElement('img')
    imgEl.src = v
    imgEl.title = k
    imgEl.onclick = function () {
      insertAtStart(k)
    }

    emojiList.appendChild(imgEl)
  }
}

addTagBtn && addTagBtn.addEventListener('click', function() {
  if (!tagAddInput.value) {
    return ''
  }

  let tagDiv = document.createElement('div')
  tagDiv.textContent = tagAddInput.value
  tagDiv.classList.add('tag')

  let removeEl = document.createElement('small')
  removeEl.classList.add('remove-tag')
  removeEl.textContent = 'x'
  removeEl.addEventListener('click', function() {
    removeEl.parentElement.remove()
  })

  tagDiv.appendChild(removeEl)

  tagsElement.appendChild(tagDiv)
  tagAddInput.value = ''
})
addOptionBtn && addOptionBtn.addEventListener('click', function() {
  if (!optionAddInput.value) {
    return ''
  }

  let optionEl = document.createElement('div')
  optionEl.classList.add('option')

  let optionInp = document.createElement('input')
  optionInp.value = optionAddInput.value
  optionEl.appendChild(optionInp)

  const button = document.createElement('button')
    button.classList.add('remove-link')
    button.textContent = '-'
    button.addEventListener('click', function() {
      optionEl.remove()
    })
  optionEl.appendChild(button)

  optionsElement.appendChild(optionEl)
  optionAddInput.value = ''
})
tagAddInput && tagAddInput.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      addTagBtn.click();
    }
});

function popupPreview(disableJS) {
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
      ${txtHTML.value}
    </div>
</body>
<script type="text/javascript" src="/js/nav.js"></script>
<script>
  window.inIframe = true
  ${disableJS ? '' : txtJS.value}
</script>
<script type="text/javascript" src="/js/music.js"></script>
<script type="text/javascript" src="/js/user.js"></script>
`
  iframe.srcdoc = html;
  setupPopup(iframe)

  iframe.onload = function() {
    iframe.contentWindow.document.body.querySelector('#user-style').innerHTML = txtCSS.value
  }
}