export async function onRequest(context) {
    const { request, env } = context;
  
    try {
      const assetUrl = new URL('/blog/index.html', request.url);
      const response = await env.ASSETS.fetch(assetUrl);
  
      if (!response.ok) {
        console.error("Fetch failed with status:", response.status);
        return new Response(`Error fetching asset: Status ${response.status}`, { status: response.status });
      }
      const htmlContent = await response.text();
  
      return new Response(
        htmlContent,
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
  
    } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
  }