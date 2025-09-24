export async function onRequest(context) {
    try {
      const response = await fetchGET('/')

      if (!response.ok) {
        console.error("Failed to fetch root endpoint", response.status);
        return new Response('We had a problem');
      }
      const data = await response.json();

      let xml = '<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0">'
      xml += '<channel>'

      xml += '<title>', xml += 'Wikiverse', xml += '</title>'
      xml += '<description>', xml += 'This is a description', xml += '</description>'

      data.map((b) => {
        xml += '<item>'

        xml += '<title>', xml += b.title, xml += '</title>'
        xml += '<author>', xml += b.author, xml += '</author>'
        xml += '<link>', xml += 'https://wikiverse.pages.dev/blog/' + b.id, xml += '</link>'
        xml += '<description>', xml += b.content, xml += '</description>'

        xml += '</item>'
      })
      
      xml += '</channel>'
      xml += '</rss>'

      return new Response(
        xml,
        { headers: { 'Content-Type': 'application/xml'} }
      );

    } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
  }