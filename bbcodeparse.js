const DOMPurify = require("dompurify");

function putStrOntoChild(a, b) {
    if (typeof a !== "string" || typeof b !== "string") {
      return "";
    }
    const match = b.match(/<([a-z]+)[^>]*>/i)
    if(!match){
        return b;
    }
    const temp = document.createElement(match[1] || 'div');
    temp.innerHTML = a;
    return b.replace(
      new RegExp(`(<${temp.tagName.toLowerCase()}\\b[^>]*>)(.*?)(</${temp.tagName.toLowerCase()}>)`, 'gi'),
      `$1${temp.innerHTML}$3`
    );
}

window.bbcodeparse = function bbcodeparse(t) {
    const bbcodeTags = [
      { html: "<b></b>", tag: "b" },
      { html: "<u></u>", tag: "u" },
      { html: "<s></s>", tag: "s" },
      { html: "<i></i>", tag: "i" },
      { html: "<span style='display:flow;place-self:center;'></span>", tag: "center" },
      { html: "<span style='float: left'>$attr$</span>", tag: "left" },
      { html: "<span style='float: right'>$attr$</span>", tag: "right" },
      { html: "<marquee></marquee>", tag: "marquee" },
      { html: "<rainbow></rainbow>", tag: "rainbow" },
      { html: "<blink></blink>", tag: "blink" },
      { html: "<code></code>", tag: "code" },
      { html: "<span style='color: $attr$;'></span>", tag: "color" },
      { html: "<a href='$attr$'></a>", tag: "url" },
      { html: "<a href='$attr$'>$attr$</a>", tag: "email" },
      { html: "<img src='$attr$'></img>", tag: "img" },
      { html: "<a href='/article/?id=$attr$'></a>", tag: "article" },
      { html: "<span style='font-size: $attr$px;'></span>", tag: "size" },
      { html: "<span style='font-family: $attr$;'></span>", tag: "font" },
      { html: "<h1 style='margin: 0'>", tag: "h1" },
      { html: "<h2 style='margin: 0'>", tag: "h2" },
      { html: "<h3 style='margin: 0'>", tag: "h3" },
      { html: "<h4 style='margin: 0'>", tag: "h4" },
      { html: "<h5 style='margin: 0'>", tag: "h5" },
      { html: "<h6 style='margin: 0'>", tag: "h6" },
      { html: "<audio src='$attr$'></audio>", tag: "audio"},
      { html: "<video src='$attr$'></video>", tag: "video"},
      { html: "<span style='cursor:pointer;border-bottom: 1px dashed sienna;color: sienna;' title=$attr$></span>", tag: "abbr" },
      { html: "<span style='background-color: $attr$'></span>", tag: "bgcolor"},
      { html: "<img class='emoji' src='https://www.pixelcatsend.com/images/catmojis/$attr$.png'></img>", tag: "catmoji" },

    ];
    let result = t;
    let changed = true;
    while (changed) {
        changed = false;
        for (const { html, tag } of bbcodeTags) {
          const prevResult = result
          result = replaceBBCodeWithHTML(result, html, tag);
          changed = changed || prevResult !== result
        }
    }
    let allowXSS = localStorage.getItem('allowXSS') || '0';
    if (allowXSS === '0') {
      result = DOMPurify.sanitize(result);
    }
    return result;
}

function replaceBBCodeWithHTML(t, htmlTemplate, bbtag) {
    const regex = new RegExp(
      `\\[${bbtag}=([^\\]]+)\\]([\\s\\S]*?)\\[\\/${bbtag}\\]|\\[${bbtag}\\]([\\s\\S]*?)\\[\\/${bbtag}\\]`,
      "gi"
    );
    return t.replace(regex, (match, attrValue, contentWithAttr, contentWithoutAttr) => {
      let newHtml = htmlTemplate;
      if (attrValue) {
        newHtml = newHtml.replace(/\$attr\$/gi, attrValue);
      }
      return putStrOntoChild(contentWithAttr || contentWithoutAttr || match[0], newHtml);
    });
}