export function onRequest(context) {
    console.log("catchall:", context.params.catchall);
    return new Response(
      `<a href="/">Hello, ` + context.params.catchall + `!</a>`, 
      { headers: { 'Content-Type': 'text/html'} }
  );
}