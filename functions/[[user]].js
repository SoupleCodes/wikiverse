const pages = [
  "articles",
  "blogs",
  "themes",
  "polls"
]

async function getPageContent(p, user, pidx) {
  if (!pages.includes(p)) {
    return null
  }
  const response = await fetch(`https://wiki.souple.workers.dev/user/${user}/${p}/${pidx}`)
  if (!response.ok) {
    console.log(response)
    return null
  }
  let html =
`
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="en">
    <head>
        <link rel="stylesheet" href="/styles/main.css"/>
        <link rel="stylesheet" href="/styles/user.css"/>
        <link rel="icon" type="image/png" href="/favicon.png"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="keywords" content="friends online social networking wiki articles blog poll">
        <script type="text/javascript" src="/js/helper.js"></script>
        <script type="text/javascript" src="/js/comment.js"></script>
        <script type="text/javascript" src="/js/music.js"></script>
        <script type="text/javascript" src="/js/carousel.js"></script>
    </head>
    <nav id="topbar"></nav>
    <style id="user-style"></style>
    <body>
        <div id="main">
            <div id="header">
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
                <div class="col2">
                Raw json response: ${JSON.stringify(response)}
                </div>
            </div>
        </div>
    </body>
    <script type="text/javascript" src="/js/nav.js"></script>
    <script type="text/javascript" src="/js/user.js"></script>
</html>
</div>
`

return html
}

export async function onRequest(context) {
    const { request, env } = context;
    const segments = context.params.user
    const user = segments[0]
    const page = segments[1]

    try {
      if (!user.startsWith('~')) {
        return new Response("Page not found!")
      }

      if (page) {
        const html = await getPageContent(page, user.split('~')[1], 1)
        if (!html) {
          return new Response("Page doesn't exist!")
        }
        return new Response(
          html,
          { headers: { 'Content-Type': 'text/html; charset=utf-8'} }
        );
      }

      const assetUrl = new URL('/user/index.html', request.url);
      const response = await env.ASSETS.fetch(assetUrl);

      if (!response.ok) {
        console.error("Fetch failed with status:", response.status);
        return new Response(`Error fetching asset: Status ${response.status}`, { status: response.status });
      }
      const htmlContent = await response.text();

      return new Response(
        htmlContent,
        { headers: { 'Content-Type': 'text/html; charset=utf-8'} }
      );

    } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
  }