const form = document.querySelector('form#create-form')
const textarea = document.querySelector('textarea#content')

const preview = document.querySelector('div#content')
const ppartsinputs = document.querySelector('#inputs-for-parent-part')
const prevToggl = document.querySelector('input[name=toggle-preview]')
const partsToggl = document.querySelector('input[name=toggle-parent]')
const commentsToggl = document.querySelector('input[name=toggle-comments]')
const globalCSSToggl = document.querySelector('input[name=toggle-globalcss]')

const addTagBtn = document.querySelector('button#add-tag')
const tagsElement = document.getElementById('tags')
const tagAddInput = document.querySelector('input#add-tags')

const addOptionBtn = document.querySelector('button#add-option')
const optionsElement = document.getElementById('options')
const optionAddInput = document.querySelector('input#add-option')

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
        form.reset();
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
      form.reset();
    }
  } catch (error) {
    alert(`Error submitting poll: ` + error);
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
        includeglobal
      })
    });

    if (response.ok) {
      const re = await response.json();
      alert("Blog submitted successfully!");
      window.location.href = `/blog/${re.id}`
      form.reset();
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