export function onRequest(context) {
    return new Response(
      `<a href="/">Hello, ` + context.params.user + `!</a>`, 
      { headers: { 'Content-Type': 'text/html'} }
  );
}