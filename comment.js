let account = JSON.parse(localStorage.getItem(localStorage.getItem("loggedInAs")))
if (account) { const token = account.token }

let pElement = document.querySelector('#avatar #username');
let imgElement = document.querySelector("#avatar img")
pElement.textContent = account.user.username;
imgElement.src = account.user.pfp_url || '/images/default.png';

function createCommentElement(commentData, index) {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.id = "comment-" + (index + 1);

            commentElement.innerHTML = `
                  <div id="profile">
                    <img src=${commentData.pfp_url || '/images/default.png'}>
                    <p id="username"><a href="/user/?=${commentData.user}" style="color: black;">${commentData.user}</a></p>
                  </div>
                  <div id="post">
                    <div>
                      <img src="/images/tri.png" style="width: 11px;">
                    </div>
                  <div id="comment-box">
                    <time>posted at ${new Date(commentData.creation_date).toLocaleString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour12: true,
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                      timeZoneName: 'short'
                    })}</time>
                    <p>${bbcodeparse(commentData.post && commentData.post)}</p>
 ${commentData.signature ?
                    `<hr style="border-top-color: white;background-color: #e5e5e5;margin: 3px;width: inherit;">
                      <small><i>${bbcodeparse(commentData.signature)}</i></small>`
 :
                    ''
                    }
                  </div>
                        `;
    return commentElement;
}

function displayComments(comments, commentSectionElement) {
    commentSectionElement.innerHTML = '';
    if (comments && comments.length > 0) {
        comments.forEach((comment, index) => {
            commentSectionElement.appendChild(createCommentElement(comment, index));
        });
    }
}

async function postComment(endpoint, comment) {
    try {
      const response = await fetch(`https://wiki.souple.workers.dev/${endpoint}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          content: comment,
        })
      });

      if (response.ok) {
        console.log('Comment posted successfully');
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
}

function handlePost(type, i) {
    const commentInput = document.querySelector('#comment-textbox #textarea #typebox')
    const comments = document.querySelectorAll('#comments .comment #post')
    const commentSectionElement = document.querySelector('#comments')
    const data = {
        user: account.user.username, 
        pfp_url: account.user.pfp_url, 
        post: commentInput.textContent,
        creation_date: new Date().toISOString(),
        signature: account.user.signature
    }
    
    let isSpam = false
    let secondsSinceLastPost = 99
    if (comments[1]) {
        isSpam = commentInput.textContent === comments[0].textContent === comments[1].textContent
        secondsSinceLastPost = (new Date().getTime() - new Date(comments[comments.length - 1].querySelector('#comment-box time').textContent.replace('posted at ', '').replace('at', '')).getTime()) / 1000;
    }

    if (commentInput && commentInput.textContent.trim() !== '' && !isSpam && secondsSinceLastPost > 10) {
      postComment((type + "/" + i), commentInput.textContent)

      const newCount = comments.length + 1
      document.querySelector('#comment-heading h4 a').textContent = `(${newCount}) comments.`

      commentSectionElement.appendChild(createCommentElement(data, comments.length))
      commentInput.textContent = ''
    }
}