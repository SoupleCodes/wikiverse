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

async function fetchAll() {
    const contentParent = document.getElementById('results')
    const data = await fetchGET('all/' + type + '/' + page)
    
    data[type].map(data => {
        contentParent.appendChild(createContentEl(data, type))
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
/*
<div class="poll-group">
  <h5 class="title">Poll title</h5>
  <table>
    <tbody><tr height="18">
      <td>
        <input name="option-1" type="radio">
      </td><td>
        
        <small>Option 1</small>
      </td>
    </tr><tr height="18">
      <td>
        <input name="option-1" type="radio">
      </td><td>
        
        <small>Option 1</small>
      </td>
    </tr>
  </tbody></table>
<div style="display: flex;justify-content: center;margin-top: 11px;">
      
  <button>Vote</button><div style="width:20px"></div><button>Results</button>
  </div></div>
*/