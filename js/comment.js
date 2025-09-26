let token = localStorage.token
let u = JSON.parse(localStorage.user || '[]')

async function postComment(route, val) {
    try {
      const response = await fetch('https://wiki.souple.workers.dev/' + route + '/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          comment: val,
        })
      });

      if (response.ok) {
        let data = await response.json()
        console.log('Comment posted successfully');
        return data.newID
      } else {
        console.error('Failed to post comment');
        alert('Something went wrong with posting this comment.')
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
}

function createCommentElement(data, pg) {
    const comment = document.createElement('div')
    comment.classList.add('comment')
    comment.id = "comment-" + data.id

    const img = document.createElement('img')
    img.classList.add('post-pfp')
    img.src = data.profile && data.profile.pfp_url || '/images/ui/default.png'
    comment.appendChild(img)

    const post = document.createElement('div')
    const postUserInfo = document.createElement('div')
    const postMessage = document.createElement('div')
    post.classList.add('post')
    postUserInfo.classList.add('post-user-info')
    postMessage.classList.add('post-message')

    const smallInfo = document.createElement('small')
    smallInfo.textContent = data.profile && data.profile.display_name + " "
    const a = document.createElement('a')
    a.href = '/~' + data.commenter
    a.textContent = '(@' + data.commenter + ')'
    smallInfo.appendChild(a)
    postUserInfo.appendChild(smallInfo)

    const pMessage = document.createElement('p')
    pMessage.innerHTML = bbcodeparse(data.content)
    postMessage.appendChild(pMessage)

    const postDate = document.createElement('div')
    postDate.style.marginTop = '17px'
    postDate.style.width = '100%'
    const smallDate = document.createElement('small')
    smallDate.style.color = '#bfbfbf'
    smallDate.textContent = dateDiff(new Date(data.created_at), new Date())
    smallDate.title = new Date(data.created_at).toUTCString()
    postDate.appendChild(smallDate)

    post.appendChild(postUserInfo)
    post.appendChild(postMessage)
    post.appendChild(postDate)
    comment.appendChild(post)
    comment.setAttribute("page", pg)

    return comment
}

async function changePage(route, num) {
    let k = document.querySelector(`[page='${num}']`)
    const pageNav = document.getElementById('page-nav')
    const curr = Number(pageNav.getAttribute("currentpage"))
    const comments = document.querySelectorAll('.comment')

    if (k) { 
        if (curr == num) { return '' }
        for (var i = 0, len = comments.length; i < len; i++) {
            let child = comments[i]
            child.classList.add('hidden')
        }
        let hiddenElements = document.querySelectorAll(`.comment.hidden[page='${num}']`)
        for (var i = 0, len = hiddenElements.length; i < len; i++) {
            let child = hiddenElements[i]
            child.classList.remove('hidden')
        }
        pageNav.setAttribute("currentpage", num)
        return '' 
    }

    for (var i = 0, len = comments.length; i < len; i++) {
        let child = comments[i]
        child.classList.add('hidden')
    }

    const response = await fetchGET(route + '/comments' + '?page=' + num)
    let commentParent = document.querySelector('#comments-section #comments')
    if (response && response.comments.length > 0) {
        response.comments.forEach(c => {
            commentParent.appendChild(createCommentElement(c, num))
        });
    }

    pageNav.setAttribute("currentpage", num)
}

function commentNav(route, len) {
    const pageNav = document.getElementById('page-nav')
    const page = Number(pageNav.getAttribute("currentpage"))
    pageNav.querySelector('#pages').textContent = 'Page ' + page + ' of ' + len
    let limit = Math.min(len, 10)
    let start = Math.max(1, page - Math.floor(limit / 2));
    let end = Math.min(len, start + limit - 1);

    if (end - start < limit - 1) {
      start = Math.max(1, end - limit + 1);
    }

    if (page > 1) {
        pageNav.innerHTML += `<button id="first" onclick="javascript:changePage(;'${route}', 1);';">first ≤</button><button onclick="javascript:changePage('${route}', ${page - 1});" id="prev" >&lt;</button>`;
    }
    for (let i = start; i <= end; i++) {
        pageNav.innerHTML += `<button onclick="javascript:changePage('${route}', ${i});">${i}</button>`;
    }
    if (page < len) {
        pageNav.innerHTML += `<button id="next" onclick="javascript:changePage('${route}', ${page + 1});';">&gt;</button><button onclick="javascript:changePage('${route}', ${len});" id="last">≥ last</button>`;
    }
}

async function displayComments(route) {
    let commentsSection = document.getElementById('comments-section')
    let commentCountElement = document.querySelector('#comments-section #comment-count')
    let showing = document.querySelector('#comments-section #showing')
    let commentParent = document.querySelector('#comments-section #comments')

    commentParent.insertAdjacentHTML("afterend", '<div id="page-nav" currentpage="1"><small id="pages"></small></div></div>')
    
    let inframe = window.inIframe
    let c
    if (inframe) {
        c = dummyData.comments
    } else {
        c = await fetchGET(route + '/comments')
    }
    const commentsCount = c.comment_count || 0
    commentNav(route, c.page_count)

    if (c && commentsCount > 0) {
        c.comments.forEach(c => {
            commentParent.appendChild(createCommentElement(c, 1))
        });
    }

    const hash = window.location.hash
    if (hash && hash.startsWith('#comment-')) {
        const focusedComment = document.querySelector(hash + '.comment')
        if (focusedComment) {
            focusedComment.scrollIntoView({ behavior: 'smooth' })
            // glow
            focusedComment.classList.add('focus');
            setTimeout(() => {
                focusedComment.classList.remove('focus');
            }, 1500)
        }
    }

    commentCountElement.textContent = commentsCount + ' comment'
    if (commentsCount != 1) {
        commentCountElement.textContent += 's'
    }
    showing.textContent = 'showing latest ' + Math.min(Math.max(commentsCount, 0), 40) + ' out of ' + commentsCount + ' comments'
    
    const commentBox = document.querySelector('#comments-section #comment-box')
    const typearea = commentBox.querySelector('#typearea')
    const submitButton = document.querySelector('#submit')

    let isSpam = false
    submitButton.addEventListener('click', async () => {
        let val = typearea.value
        let comments = document.getElementById('comments').children
        if(comments[0] && comments[1]) {
            isSpam = val === comments[0].textContent === comments[1].textContent
        }
        if(isSpam) {
            alert('No spamming!')
        } else if (!isSpam && val && val.trim() !== '') {
            let count = comments.length
            let data = {
                content: val,
                commenter: u.username,
                created_at: new Date().toISOString(),
                profile: {
                    pfp_url: u.pfp_url,
                    display_name: u.display_name
                }
            }
            const newID = await postComment(route, val)
            if (commentParent.children.length < 1) {
                commentParent.appendChild(createCommentElement(data, newID))
            } else {
                commentParent.insertBefore(createCommentElement(data, newID), commentParent.children[0])
            }

            count++
            commentCountElement.textContent = count + ' comment'
            if (count > 1) {
                commentCountElement.textContent += 's'
            }
            showing.textContent = 'showing latest ' + count + ' out of ' + count + ' comments'
            typearea.value = ''
        }
    })
    commentBox.appendChild(typearea)
    commentBox.appendChild(submitButton)
    commentsSection.appendChild(commentBox)
}