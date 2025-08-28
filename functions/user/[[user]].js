export async function onRequest(context) {
    const { request, env } = context

    const response = await env.ASSETS.fetch('/user/index.html')
    const content = await response.text()
    
    return new Response(
      content, response
  );
}