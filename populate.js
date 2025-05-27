import './bundle.js'

function populateElements()  {
    const leftNav = document.querySelector('#left');
    const rightNav = document.querySelector('#right');
    const navbar = document.querySelector('#navbar');

    if (leftNav) {
        leftNav.innerHTML =
        `
      <div style="height: 100px"></div>
      <div id="explore" style="position: relative; width: 120px; height: 112px;">
        <ul id="box-elements">
          <li><a href="/">home</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="/all">all articles</a></li>
          <li><a href="/myarticles">my articles</a></li>
          <li><a href="/latest">latest articles</a></li>
        </ul>
      </div>
      <div id="trending" style="position: relative; width: 120px; height: 111px;">
        <ul id="box-elements">
        </ul>
      </div>
      <div id="customisation" style="position: relative; width: 120px; height: 100px;">
        <ul id="box-elements">
          <li><a href="/you">your page</a></li>
          <li><a href="/site">this website</a></li>
          <li><a href="/layouts">page layouts</a></li>
        </ul>
      </div>
        `
    }
    if (rightNav) {
        rightNav.innerHTML =
        `
              <div style="height: 120px"></div>
      <div id="login" style="position: relative; width: 125px; height: 109px;">
        <div id="box-elements">
          <form id="login-form">
            <div>
              <label for="username">
                Username:</label>
              <input type="text" name="username" id="username" value="" maxlength="24" style="width: 60px;
                      height: 8px;" required>
            </div>
            <div>
              <label for="password">
                Password:</label>
              <input type="password" name="password" id="password" value="" style="width: 60px;
                      height: 8px;" required>
            </div>
            <div style="float: right">
              <input type="checkbox" style="width: 10px; vertical-align: middle; margin-right: -4px;">
              <label for="remember-me">Remember me?</label>
            </div>
            <div id="loginregister">
              <input type="submit" value="login" style="height: 16px;">
              <input type="submit" value="register" style="height: 16px;">
            </div>
        </div>
      </div>
      <div id="newpeople" style="position: relative; width: 125px; height: 190px;">
        <div id="box-elements">
          <div id="new-users">
          </div>
        </div>
      </div>
        `
    }
    if (navbar) {
        navbar.innerHTML =
        `
        <div id="top">
          <div>
            <a href="/">
              <img id="logo" src="/images/navbar/logo.png" width="138">
            </a>
          </div>
          <div style="flex-grow:0.5"></div>
          <form id="searchbar">
            <div class="input">
              <input type="text" placeholder="Search">
            </div>
            <div>
              <button type="submit"></button>
            </div>
          </form>
        </div>
        <div id="bottom">
          <ul id="leftNav">
            <li><a href="/">Home</a></li>
            <li><a href="/">Browse Users</a></li>
            <li><a href="/">Create</a></li>
            <li><a href="/inbox">Inbox</a></li>
          </ul>
          <ul id="rightNav">
            <li><a href="/">Terms of Service</a></li>
            <li><a href="/">Log-In</a></li>
            <li><a href="/">Register</a></li>
          </ul>
        </div>
        `
    }
   
      const response = fetch('https://wiki.souple.workers.dev');
      response.then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      }).then((data) => {
        const subjects = data.popularSubjects
        let container = document.querySelector('#trending ul#box-elements')
        container.innerHTML = ''
        subjects.forEach(subject => {
          container.innerHTML += `<li><a href="/all/?subject=${subject}">${subject}</a></li>`
        });

        const newUsers = data.newestUsers
        container = document.querySelector('#newpeople #new-users')
        container.innerHTML = ''
        newUsers.forEach(user => {
          container.innerHTML += `
                <li>
                  <a href="/user/?=${user.username}">
                    <div style="display: grid">
                      <p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 1; margin-block: 5px;">${bbcodeparse(user.username)}</p>
                      <img src=${bbcodeparse(user.pfp_url) || "/images/default.png"}>
                    </div>
                  </a>
                </li>`
        });

        const featuredArticle = data.featuredArticle
        const options = {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour12: true
        };
        let formattedDate = new Date(featuredArticle.creation_date).toLocaleString('en-US', options);
        container = document.querySelector('.featured-article')
        if (container) {
        container.innerHTML +=
          `
              <div style="display: flex">
                <h4 style="max-width: 200px; color: #B92828">${featuredArticle.title}</h4>
                <div id="spacing" style="width: 9px;"></div>
                <div style="max-width: 100px; color: #AF3939">
                  <i><small>by <a href="/user?=${featuredArticle.author}" style="color: #AF3939">${featuredArticle.author}</a></small></i>
                </div>
                <div class="date" style="margin-left: auto">
                  <time>${formattedDate}</time>
                </div>
              </div>
              <p id="sampletext">${featuredArticle.content}</p>
              <div id="see-more" class="row-reverse">
                <small><a href="/article/?id=${featuredArticle.id}">see more</a></small>
              </div>
        `

        const popularArticle = data.popularArticles[0]
        formattedDate = new Date(popularArticle.creation_date).toLocaleString('en-US', options);
        container = document.querySelector('.popular-article')
          container.innerHTML +=
          `
                <div style="display: flex">
                  <h4 style="max-width: 200px; color: chocolate">${popularArticle.title}</h4>
                  <div id="spacing" style="width: 9px;"></div>
                  <div style="max-width: 100px; color: darkgoldenrod">
                    <i><small>by <a href="/user?=${popularArticle.author}" style="color: darkgoldenrod">${popularArticle.author}</a></small></i>
                  </div>
                  <div class="date" style="margin-left: auto">
                    <time>${formattedDate}</time>
                  </div>
                </div>
                <p id="sampletext">${popularArticle.content}</p>
                <div id="see-more" class="row-reverse">
                  <small><a href="/article/?id=${popularArticle.id}">see more</a></small>
                </div>
          `
        }

      }
      ).catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

      document.getElementById("login-form").addEventListener("submit", async function (event) {
        event.preventDefault();
      
        const submitButtonValue = event.submitter.value;
        const request = submitButtonValue;
      
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
      
        if (!data.username || !data.password) {
          alert("Please enter a username and password.");
          return;
        }
      
        try {
          const response = await fetch("https://wiki.souple.workers.dev/" + request, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
      
          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData)

            if (submitButtonValue === "login") {
              localStorage.setItem(responseData.user.username, JSON.stringify({ token: responseData.token, user: responseData.user }))
              localStorage.setItem("loggedInAs", responseData.user.username)
        
              const accounts = localStorage.getItem("accounts")
              if (!accounts) {
                localStorage.setItem("accounts", JSON.stringify([responseData.user.username]))
              } else {
                const accountsArray = JSON.parse(accounts)
                if (!accountsArray.includes(responseData.user.username)) {
                  accountsArray.push(responseData.user.username)
                }
                localStorage.setItem("accounts", JSON.stringify(accountsArray))
              }
                alert("Logged in to your account successfully!");
                window.location.href = "/"
            } else if (submitButtonValue === "register") {
              alert("Registered successfully! Please log in.");
            }
            this.reset();
          } else {
            const error = await response.text();
            alert("Error while executing action: " + error);
          }
        } catch (error) {
          alert("Error while executing action: " + error);
        }
      
      });

      const yourPageAElement = document.querySelector("#customisation ul li");
      const welcomeAElement = document.querySelector("#info h4");
      if (localStorage.getItem("loggedInAs")) {
        // Check if JWT Token expired
        const account = localStorage.getItem(localStorage.getItem("loggedInAs"))
        const authToken = JSON.parse(account).token
        if (authToken) {
          const payload = JSON.parse(window.atob(authToken.split('.')[1]))
          const isExpired = Date.now() >= payload.exp * 1000;
          if (isExpired) {
            localStorage.removeItem("loggedInAs")
            localStorage.removeItem(localStorage.getItem("loggedInAs"))
            alert("Your session has expired. Please log in again.")
            if (yourPageAElement && welcomeAElement) {
              yourPageAElement.innerHTML = `<a href="/login/">your page</a>`
              welcomeAElement.textContent = `Hello, Guest!`
            }
          } else {
            if (yourPageAElement && welcomeAElement) {
              yourPageAElement.innerHTML = `<a href="/you">your page</a>`
              welcomeAElement.textContent = `Welcome back, ${localStorage.getItem("loggedInAs")}!`
            }
          }
        }

      } else {
        yourPageAElement.innerHTML = `<a href="/login/">your page</a>`
        welcomeAElement.textContent = `Hello, Guest!`
      }
}

populateElements()