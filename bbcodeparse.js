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

const smileys = [
  ":alien:", "/images/smileys/alien.gif",
  ":angel:", "/images/smileys/angel.gif",
  ":angry:", "/images/smileys/angry.gif",
  ":applause:", "/images/smileys/applause.gif",
  ":april:", "/images/smileys/april.gif",
  ":attention:", "/images/smileys/attention.gif",
  ":atwitsend:", "/images/smileys/atwitsend.gif",
  ":batseyes:", "/images/smileys/batseyes.gif",
  ":beatup:", "/images/smileys/beatup.gif",
  ":bighug:", "/images/smileys/bighug.gif",
  ":billy:", "/images/smileys/billy.gif",
  ":blush:", "/images/smileys/blush.gif",
  ":bringiton:", "/images/smileys/bringiton.gif",
  ":brokenheart:", "/images/smileys/brokenheart.gif",
  ":bug:", "/images/smileys/bug.gif",
  ":callme:", "/images/smileys/callme.gif",
  ":chatterbox:", "/images/smileys/chatterbox.gif",
  ":clover:", "/images/smileys/clover.gif",
  ":clown:", "/images/smileys/clown.gif",
  ":coffee:", "/images/smileys/coffee.gif",
  ":confused:", "/images/smileys/confused.gif",
  ":cool:", "/images/smileys/cool.gif",
  ":cow:", "/images/smileys/cow.gif",
  ":cowboy:", "/images/smileys/cowboy.gif",
  ":crying:", "/images/smileys/crying.gif",
  ":dancing:", "/images/smileys/dancing.gif",
  ":daydream:", "/images/smileys/daydream.gif",
  ":devil:", "/images/smileys/devil.gif",
  ":doh:", "/images/smileys/doh.gif",
  ":drool:", "/images/smileys/drool.gif",
  ":eyebrow:", "/images/smileys/eyebrow.gif",
  ":eyeroll:", "/images/smileys/eyeroll.gif",
  ":frustrated:", "/images/smileys/frustrated.gif",
  ":giggle:", "/images/smileys/giggle.gif",
  ":grin:", "/images/smileys/grin.gif",
  ":haha:", "/images/smileys/haha.gif",
  ":hahayeahright:", "/images/smileys/hahayeahright.gif",
  ":hiro:", "/images/smileys/hiro.gif",
  ":hurryup:", "/images/smileys/hurryup.gif",
  ":hypnotized:", "/images/smileys/hypnotized.gif",
  ":idea:", "/images/smileys/idea.gif",
  ":idontknow:", "/images/smileys/idontknow.gif",
  ":idontwannasee:", "/images/smileys/idontwannasee.gif",
  ":itwasntme:", "/images/smileys/itwasntme.gif",
  ":kiss:", "/images/smileys/kiss.gif",
  ":liar:", "/images/smileys/liar.gif",
  ":loser:", "/images/smileys/loser.gif",
  ":love:", "/images/smileys/love.gif",
  ":moneyeyes:", "/images/smileys/moneyeyes.gif",
  ":monkey:", "/images/smileys/monkey.gif",
  ":nailbiting:", "/images/smileys/nailbiting.gif",
  ":nerd:", "/images/smileys/nerd.gif",
  ":nono:", "/images/smileys/nono.gif",
  ":notlistening:", "/images/smileys/notlistening.gif",
  ":nottalking:", "/images/smileys/nottalking.gif",
  ":onthephone:", "/images/smileys/onthephone.gif",
  ":party:", "/images/smileys/party.gif",
  ":peace:", "/images/smileys/peace.gif",
  ":pig:", "/images/smileys/pig.gif",
  ":pirate:", "/images/smileys/pirate.gif",
  ":praise:", "/images/smileys/praise.gif",
  ":praying:", "/images/smileys/praying.gif",
  ":pumpkin:", "/images/smileys/pumpkin.gif",
  ":puppydogeyes:", "/images/smileys/puppydogeyes.gif",
  ":rockon:", "/images/smileys/rockon.gif",
  ":rofl:", "/images/smileys/rofl.gif",
  ":rose:", "/images/smileys/rose.gif",
  ":sad:", "/images/smileys/sad.gif",
  ":shhhh:", "/images/smileys/shhhh.gif",
  ":shocked:", "/images/smileys/shocked.gif",
  ":sick:", "/images/smileys/sick.gif",
  ":sigh:", "/images/smileys/sigh.gif",
  ":silly:", "/images/smileys/silly.gif",
  ":skull:", "/images/smileys/skull.gif",
  ":sleepy:", "/images/smileys/sleepy.gif",
  ":smile:", "/images/smileys/smile.gif",
  ":smug:", "/images/smileys/smug.gif",
  ":star:", "/images/smileys/star.gif",
  ":straightface:", "/images/smileys/straightface.gif",
  ":talktohand:", "/images/smileys/talktohand.gif",
  ":thinking:", "/images/smileys/thinking.gif",
  ":thumbsdown:", "/images/smileys/thumbsdown.gif",
  ":thumbsup:", "/images/smileys/thumbsup.gif",
  ":timeout:", "/images/smileys/timeout.gif",
  ":tongue:", "/images/smileys/tongue.gif",
  ":tongue2:", "/images/smileys/tongue2.gif",
  ":usa:", "/images/smileys/usa.gif",
  ":waiting:", "/images/smileys/waiting.gif",
  ":wave:", "/images/smileys/wave.gif",
  ":whew:", "/images/smileys/whew.gif",
  ":whistling:", "/images/smileys/whistling.gif",
  ":worried:", "/images/smileys/worried.gif",
  ":yawn:", "/images/smileys/yawn.gif",
  ":yinyang:", "/images/smileys/yinyang.gif",
]

window.bbcodeparse = function bbcodeparse(t) {

    const bbcodeTags = [
      { html: "<b></b>", tag: "b" },
      { html: "<u></u>", tag: "u" },
      { html: "<s></s>", tag: "s" },
      { html: "<i></i>", tag: "i" },
      { html: "<span style='display:flow;place-self:center;text-align: center;'></span>", tag: "center" },
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
      { html: "<span id='$attr$></span>", tag: "section" }

    ];
    let result = t;
    if (!t) {
      return "";
    }
    result = replaceSmileysWithRegex(result);
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
      result = DOMPurify.sanitize(result, {ADD_TAGS: ['rainbow', 'safe']});
    }
    return result;
}

function replaceSmileysWithRegex(text) {
  const smileyCodes = smileys.filter((_, index) => index % 2 === 0);
  const regexString = smileyCodes.map(code => code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(regexString, 'g');

  return text.replace(regex, (match) => {
      const index = smileys.indexOf(match);
      if (index !== -1 && index % 2 === 0 && index + 1 < smileys.length) {
          const imagePath = smileys[index + 1];
          return `<img src="${imagePath}" class="emoji" title="${match}">`;
      }
      return match;
  });
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
      if (contentWithAttr === "" && contentWithoutAttr === undefined) {
        return newHtml;
      } else {
        return putStrOntoChild(contentWithAttr || contentWithoutAttr, newHtml);
      }
    });
}