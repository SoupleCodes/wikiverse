export async function onRequest(context) {
  const { request, env } = context;

  const response = await env.ASSETS.fetch('/user/index.html');
  const htmlContent = await response.text();

  return new Response(
    htmlContent,
    { headers: { 'Content-Type': 'text/html'} }
  );
}