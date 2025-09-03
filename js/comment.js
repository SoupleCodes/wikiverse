let token = localStorage.token
let val
let u = JSON.parse(localStorage.user || '[]')

function dateDiff(a, b) {
    // https://stackoverflow.com/a/15289883
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    let r = Math.floor((utc2 - utc1) / _MS_PER_DAY)
    let msg
    if (r > 1) {
        msg = r + ' days ago'
    } else {
        msg = r + ' day ago'
    }
    
    if (r == 0) {
        r = new Date(a).toLocaleString('UTC',{ hour: 'numeric', minute: 'numeric'}).toLowerCase()
        msg = r
    }
  
    return msg;
}

async function postComment(route, val) {
    try {
      const response = await fetch('https://wiki.souple.workers.dev' + route + '/comment', {
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
        console.log('Comment posted successfully');
      } else {
        console.error('Failed to post comment');
        alert('Something went wrong with posting this comment.')
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
}

function createCommentElement(data, idx) {
    const comment = document.createElement('div')
    comment.classList.add('comment')
    comment.id = "comment-" + idx

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

    return comment
}

async function displayComments(route) {
    let commentsSection = document.getElementById('comments-section')
    let commentCountElement
    let showing
    let commentParent

    if (commentsSection) {
        commentCountElement = document.createElement('h5')
        commentCountElement.id = 'comment-count'
        commentCountElement.classList.add('title')
        commentsSection.appendChild(commentCountElement)

        showing = document.createElement('p')
        showing.id = 'showing'
        commentsSection.appendChild(showing)

        commentParent = document.createElement('div')
        commentParent.id = 'comments'
        commentsSection.appendChild(commentParent)
    }
    
    let commentsResponse
    commentsResponse = await fetch('https://wiki.souple.workers.dev' + route + '/comments', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const c = await commentsResponse.json()
    const commentsCount = c.length || 0

    if (c && commentsCount > 0) {
        c.slice(0, 40).forEach((c, idx) => {
            commentParent.appendChild(createCommentElement(c, idx + 1))
        });
    }

    commentCountElement.textContent = commentsCount + ' comment'
    if (commentsCount != 1) {
        commentCountElement.textContent += 's'
    }
    showing.textContent = 'showing latest ' + Math.min(Math.max(commentsCount, 0), 40) + ' out of ' + commentsCount + ' comments'
    
    const commentBox = document.createElement('div')
    commentBox.id = 'comment-box'

    const textarea = document.createElement('textarea')
    textarea.placeholder = 'Type something here!'
    const submitButton = document.createElement('button')
    submitButton.id = 'submit'
    submitButton.textContent = 'submit'

    let isSpam = false
    submitButton.addEventListener('click', async () => {
        let val = textarea.value
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
            postComment(route, val)
            if (commentParent.children.length < 1) {
                commentParent.appendChild(createCommentElement(data, 1))
            } else {
                commentParent.insertBefore(createCommentElement(data, count + 1), commentParent.children[0])
            }

            count++
            commentCountElement.textContent = count + ' comment'
            if (count > 1) {
                commentCountElement.textContent += 's'
            }
            showing.textContent = 'showing latest ' + count + ' out of ' + count + ' comments'
            textarea.value = ''
        }
    })
    commentBox.appendChild(textarea)
    commentBox.appendChild(submitButton)
    commentsSection.appendChild(commentBox)
}