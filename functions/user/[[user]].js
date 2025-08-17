export function onRequest(context) {
    console.log("catchall:", context.params.catchall);
    return new Response(context.params.catchall);
}