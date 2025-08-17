export function onRequest(context) {
    return new Response(
        `<a href="/">Hello, world!</a>`, 
        { headers: { 'Content-Type': 'text/html'} }
    );
}