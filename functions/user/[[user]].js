export async function onRequest(context) {
  const { request, env } = context;

  console.log("Attempting to fetch /user/index.html");

  try {
    const assetUrl = new URL('/user/index.html', request.url);
    console.log("Constructed asset URL:", assetUrl.toString());

    const response = await env.ASSETS.fetch(assetUrl);
    console.log("Fetch response status:", response.status);

    if (!response.ok) {
      console.error("Fetch failed with status:", response.status);
      return new Response(`Error fetching asset: Status ${response.status}`, { status: response.status });
    }

    console.log("Attempting to read response text.");
    const htmlContent = await response.text();
    console.log("Successfully read /user/index.html content.");

    return new Response(
      htmlContent,
      { headers: { 'Content-Type': 'text/html'} }
    );

  } catch (error) {
    console.error("Error in onRequest:", error);
    console.error("Error stack:", error.stack);
    return new Response("Internal Server Error", { status: 500 });
  }
}