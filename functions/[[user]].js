export async function onRequest(context) {
    const { request, env } = context;
    console.log(request, env)
    console.log('context: ', context)
    const segments = JSON.stringify(context.params.catchall)
    const user = segments[0]
    const page = segments[1]

    try {
      if (!user.startsWith('~')) {
        return new Response("Page not found!")
      }

      if (page) {
        return new Response("Viewing " + user + "'s " + page + " is currently not accessible. Try again later!")
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