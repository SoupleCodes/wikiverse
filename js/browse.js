let page = Number(new URLSearchParams(window.location.search).get("page")) || 1
let order = new URLSearchParams(window.location.search).get("order") || ''
let type = new URLSearchParams(window.location.search).get("type") || 'articles'

function createContentEl(data, type) {
    const contentEl = document.createElement('div')
    contentEl.classList.add('group')

    const heading = document.createElement('h3')
    heading.textContent = data.title
    contentEl.appendChild(heading)

    const div = document.createElement('div')
    const small = document.createElement('small')
    small.textContent = 'by '
    const userA = document.createElement('a')
    userA.href = '/~' + data.author
    userA.textContent = '~' + data.author
    small.appendChild(userA)
    div.appendChild(small)
    const small2 = document.createElement('small')
    small2.textContent = dateDiff(new Date(data.created_at), new Date())
    small2.style.float = 'right'
    div.appendChild(small2)
    contentEl.appendChild(div)

    const p = document.createElement('p')
    var maxWords = 25;
    var words = (data.content).match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
    var result = words.slice(0, maxWords).join(" ")
    contentEl.appendChild(p)
    
    p.innerHTML = bbcodeparse(result, true) + ` (<a href="/${type.slice(0,-1)}/${data.id}">Full ${type.slice(0,-1)}...</a>)`
    contentEl.appendChild(p)

    return contentEl
}

function createPollBody(data) {
  const contentEl = document.createElement('div')
  contentEl.classList.add('group')

  const heading = document.createElement('h3')
  heading.textContent = data.question
  contentEl.appendChild(heading)

  const table = document.createElement('table')
  const tbody = document.createElement('tbody')

  data.options.map((o, index) => {
    let optionsTr = document.createElement('tr')
    optionsTr.height = 18
      let optionTd = document.createElement('td')
        let optionInputRadio = document.createElement('input')
        optionInputRadio.name = data.question
        optionInputRadio.id = index + "-" + o.option
        optionInputRadio.value = o.option
        optionInputRadio.type = "radio"
      optionTd.appendChild(optionInputRadio)
      let optionNameTd = document.createElement('td')
        let nameSmall = document.createElement('small')
          nameSmall.textContent = o.option
      optionNameTd.appendChild(nameSmall)

    optionsTr.appendChild(optionTd)
    optionsTr.appendChild(optionNameTd)
    tbody.appendChild(optionsTr)
  })
  
  table.appendChild(tbody)
  contentEl.appendChild(table)

  const pollButtons = document.createElement('div')
  pollButtons.classList.add('poll-buttons')
  const voteButton = document.createElement('button')
  voteButton.textContent = 'Vote'
  voteButton.onclick = async () => {
    const response = await fetch("https://wiki.souple.workers.dev/poll/" + data.poll_id + '/vote', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}` 
      },
      body: JSON.stringify({
          option: Number(tbody.querySelector('tr input:checked').id.split("-")[0]) + 1
      })
    });
    if(!response.ok) {
        throw new Error(response.message)
    }
  }
  const resultsButton = document.createElement('button')
  resultsButton.textContent = 'Results'
  resultsButton.onclick = () => {
    location.href=`/poll/${data.poll_id}`
  }

  pollButtons.appendChild(voteButton)
  pollButtons.appendChild(resultsButton)

  contentEl.appendChild(pollButtons)

  return contentEl
}

function createThemeBody(data) {
  const contentEl = document.createElement('div')
  contentEl.classList.add('group', 'column', 'theme')

  const thum = document.createElement('img')
  thum.classList.add('link')
  thum.src = data.thumbnail
  thum.onclick = () => {
    location.href=`/theme/${data.id}`
  }
  contentEl.appendChild(thum)

  const h5 = document.createElement('h5')
  h5.textContent = data.title
  contentEl.appendChild(h5)

  const smallEl = document.createElement('small')
  smallEl.textContent = 'by '
  const a = document.createElement('a')
  a.href = '/~' + data.author
  a.textContent = '~' + data.author
  smallEl.appendChild(a)

  contentEl.appendChild(smallEl)

  return contentEl
}

async function fetchAll() {
    const contentParent = document.getElementById('results')
    const data = await fetchGET('all/' + type + '/' + page)
    
    data[type].map(data => {
        let child
        if (type === 'polls') {
          child = createPollBody(data)
        } else {
          if (type === 'themes') {
            child = createThemeBody(data)
          } else {
            child = createContentEl(data, type)
          }
        }
        contentParent.appendChild(child)
    })

    pageNav(data.totalPages)
}

function pageNav(len) {
    const pageNav = document.getElementById('page-nav')
    pageNav.querySelector('#pages').textContent = 'Page ' + page + ' of ' + len
    let limit = Math.min(len, 10)
    let start = Math.max(1, page - Math.floor(limit / 2));
    let end = Math.min(len, start + limit - 1);

    if (end - start < limit - 1) {
      start = Math.max(1, end - limit + 1);
    }

    if (page > 1) {
        pageNav.innerHTML += `<button id="first" onclick="location.href='?page=1&type=${type}&order=${order}';">first ≤</button><button onclick="location.href='?page=${page - 1}&type=${type}&order=${order}';" id="prev" >&lt;</button>`;
    }
    for (let i = start; i <= end; i++) {
        pageNav.innerHTML += `<button onclick="location.href='?page=${i}&type=${type}&order=${order}';" ${i == page ? 'class="current"' : ''}>${i}</button>`;
    }
    if (page < len) {
        pageNav.innerHTML += `<button id="next" onclick="location.href='?page=${page + 1}&type=${type}&order=${order}';">&gt;</button><button onclick="location.href='?page=${len}&type=${type}&order=${order}'" id="last">≥ last</button>`;
    }
}

fetchAll()