const DOMPurify = require("dompurify");

function putStrOntoChild(a, b) {
    if (typeof a !== "string" || typeof b !== "string") {
      return "";
    }
    const temp = document.createElement(b.match(/<([a-z]+)[^>]*>/i)[1] || 'div');
    temp.innerHTML = a;
    return b.replace(
      new RegExp(`(<${temp.tagName.toLowerCase()}\\b[^>]*>)(.*?)(</${temp.tagName.toLowerCase()}>)`, 'gi'),
      `$1${temp.innerHTML}$3`
    );
}

window.bbcodeparse = function bbcodeparse(t) {
    let prev;
    let result = t;
    do {
      prev = DOMPurify.sanitize(result);
      result = replaceBBCodeWithHTML(result, "<b></b>", "b");
      result = replaceBBCodeWithHTML(result, "<u></u>", "u");
      result = replaceBBCodeWithHTML(result, "<s></s>", "s");
      result = replaceBBCodeWithHTML(result, "<i></i>", "i");
      result = replaceBBCodeWithHTML(result, "<span style=\"color: $attr;\"></span>", "color");
      result = replaceBBCodeWithHTML(result, "<a href=\"$attr$\"></a>", "url");
    } while (result !== prev);

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
      return putStrOntoChild(contentWithAttr|| contentWithoutAttr, newHtml);
    });
}

