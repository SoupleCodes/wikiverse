export async function onRequest(context) {
  const { request, env } = context;

  console.log("Attempting to fetch /user/index.html");

  try {
    const response = await env.ASSETS.fetch('/user/index.html');
    console.log("Fetch response received.");
    console.log("Response status:", response.status);
    console.log("Response headers:", JSON.stringify([...response.headers]));

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
