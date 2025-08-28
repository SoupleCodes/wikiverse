export async function onRequest(context) {
  const { request, env } = context;

  console.log("Attempting to fetch /user/index.html");

  try {
    const response = await env.ASSETS.fetch('/user/index.html');
    console.log("Fetch response status:", response.status); 

    if (!response.ok) {
      console.error("Fetch failed with status:", response.status);
      return new Response("Error fetching asset", { status: response.status });
    }

    const htmlContent = await response.text();
    console.log("Successfully fetched and read /user/index.html");

    return new Response(
      htmlContent,
      { headers: { 'Content-Type': 'text/html'} }
    );

  } catch (error) {
    console.error("Error in onRequest:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
