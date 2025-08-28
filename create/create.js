const m = document.getElementById('main')
const c_param = new URLSearchParams(window.location.search).get('')

if (!(c_param == 'article' || c_param == 'blog' || c_param == 'poll' || c_param == 'theme')) {
} else {
    buildPage(c_param)
}

async function submitD() {
    const form = document.querySelector('form#create-form')
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const token = localStorage.token

    try {
      const response = await fetch("https://wiki.souple.workers.dev/" + c_param, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const re = await response.json();
        const message = c_param.charAt().toUpperCase() + c_param.slice(1)
        alert(message + " submitted successfully!");
        form.reset();
        window.location.href = `/${c.param}/?id=${re.id}`
      }
    } catch (error) {
      alert("Error submitting article: " + error);
    }
}

function buildPage(c) {
    if (c == 'article') {
        m.innerHTML = `
            <form id="create-form" onsubmit="submitD(); return false;">
                <label for="title">Title:
                    <input type="text" id="title" name="title" placeholder="What is le title" required>
                </label>
                <label for="subject">
                Subject:
                <select name="subject" id="subject">
                    <option>Other</option>
                    <option>Technology</option>
                    <option>Gaming</option>
                    <option>Food</option>
                    <option>Animals</option>
                    <option>Websites</option>
                    <option>Music</option>
                    <option>Bands</option>
                    <option>Software</option>
                    <option>Souple</option>
                    <option>Biography</option>
                    <option>Science</option>
                    <option>Geography</option>
                    <option>History</option>
                    <option>Literature</option>
                    <option>Media</option>
                    <option>Sports & Recreation</option>
                    <option>Art & Design</option>
                    <option>Astronomy</option>
                    <option>Chemistry</option>
                    <option>Computer Science</option>
                    <option>Education</option>
                    <option>Film</option>
                </select>
                </label>
                <div style="height: 12px;"></div>

                <textarea id="content" name="content" required></textarea>
                <button id="post-button" type="submit">Submit</button>
            </form>
        `

        
    }
}