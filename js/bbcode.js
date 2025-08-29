const smileys = [
    ":alien:", "/images/emoijs/smileys/alien.gif",
    ":angel:", "/images/emoijs/smileys/angel.gif",
    ":angry:", "/images/emoijs/smileys/angry.gif",
    ":applause:", "/images/emoijs/smileys/applause.gif",
    ":april:", "/images/emoijs/smileys/april.gif",
    ":attention:", "/images/emoijs/smileys/attention.gif",
    ":atwitsend:", "/images/emoijs/smileys/atwitsend.gif",
    ":batseyes:", "/images/emoijs/smileys/batseyes.gif",
    ":beatup:", "/images/emoijs/smileys/beatup.gif",
    ":bighug:", "/images/emoijs/smileys/bighug.gif",
    ":billy:", "/images/emoijs/smileys/billy.gif",
    ":blush:", "/images/emoijs/smileys/blush.gif",
    ":bringiton:", "/images/emoijs/smileys/bringiton.gif",
    ":brokenheart:", "/images/emoijs/smileys/brokenheart.gif",
    ":bug:", "/images/emoijs/smileys/bug.gif",
    ":callme:", "/images/emoijs/smileys/callme.gif",
    ":chatterbox:", "/images/emoijs/smileys/chatterbox.gif",
    ":clover:", "/images/emoijs/smileys/clover.gif",
    ":clown:", "/images/emoijs/smileys/clown.gif",
    ":coffee:", "/images/emoijs/smileys/coffee.gif",
    ":confused:", "/images/emoijs/smileys/confused.gif",
    ":cool:", "/images/emoijs/smileys/cool.gif",
    ":cow:", "/images/emoijs/smileys/cow.gif",
    ":cowboy:", "/images/emoijs/smileys/cowboy.gif",
    ":crying:", "/images/emoijs/smileys/crying.gif",
    ":dancing:", "/images/emoijs/smileys/dancing.gif",
    ":daydream:", "/images/emoijs/smileys/daydream.gif",
    ":devil:", "/images/emoijs/smileys/devil.gif",
    ":doh:", "/images/emoijs/smileys/doh.gif",
    ":drool:", "/images/emoijs/smileys/drool.gif",
    ":eyebrow:", "/images/emoijs/smileys/eyebrow.gif",
    ":eyeroll:", "/images/emoijs/smileys/eyeroll.gif",
    ":frustrated:", "/images/emoijs/smileys/frustrated.gif",
    ":giggle:", "/images/emoijs/smileys/giggle.gif",
    ":grin:", "/images/emoijs/smileys/grin.gif",
    ":haha:", "/images/emoijs/smileys/haha.gif",
    ":hahayeahright:", "/images/emoijs/smileys/hahayeahright.gif",
    ":hiro:", "/images/emoijs/smileys/hiro.gif",
    ":hurryup:", "/images/emoijs/smileys/hurryup.gif",
    ":hypnotized:", "/images/emoijs/smileys/hypnotized.gif",
    ":idea:", "/images/emoijs/smileys/idea.gif",
    ":idontknow:", "/images/emoijs/smileys/idontknow.gif",
    ":idontwannasee:", "/images/emoijs/smileys/idontwannasee.gif",
    ":itwasntme:", "/images/emoijs/smileys/itwasntme.gif",
    ":kiss:", "/images/emoijs/smileys/kiss.gif",
    ":liar:", "/images/emoijs/smileys/liar.gif",
    ":loser:", "/images/emoijs/smileys/loser.gif",
    ":love:", "/images/emoijs/smileys/love.gif",
    ":moneyeyes:", "/images/emoijs/smileys/moneyeyes.gif",
    ":monkey:", "/images/emoijs/smileys/monkey.gif",
    ":nailbiting:", "/images/emoijs/smileys/nailbiting.gif",
    ":nerd:", "/images/emoijs/smileys/nerd.gif",
    ":nono:", "/images/emoijs/smileys/nono.gif",
    ":notlistening:", "/images/emoijs/smileys/notlistening.gif",
    ":nottalking:", "/images/emoijs/smileys/nottalking.gif",
    ":onthephone:", "/images/emoijs/smileys/onthephone.gif",
    ":party:", "/images/emoijs/smileys/party.gif",
    ":peace:", "/images/emoijs/smileys/peace.gif",
    ":pig:", "/images/emoijs/smileys/pig.gif",
    ":pirate:", "/images/emoijs/smileys/pirate.gif",
    ":praise:", "/images/emoijs/smileys/praise.gif",
    ":praying:", "/images/emoijs/smileys/praying.gif",
    ":pumpkin:", "/images/emoijs/smileys/pumpkin.gif",
    ":puppydogeyes:", "/images/emoijs/smileys/puppydogeyes.gif",
    ":rockon:", "/images/emoijs/smileys/rockon.gif",
    ":rofl:", "/images/emoijs/smileys/rofl.gif",
    ":rose:", "/images/emoijs/smileys/rose.gif",
    ":sad:", "/images/emoijs/smileys/sad.gif",
    ":shhhh:", "/images/emoijs/smileys/shhhh.gif",
    ":shocked:", "/images/emoijs/smileys/shocked.gif",
    ":sick:", "/images/emoijs/smileys/sick.gif",
    ":sigh:", "/images/emoijs/smileys/sigh.gif",
    ":silly:", "/images/emoijs/smileys/silly.gif",
    ":skull:", "/images/emoijs/smileys/skull.gif",
    ":sleepy:", "/images/emoijs/smileys/sleepy.gif",
    ":smile:", "/images/emoijs/smileys/smile.gif",
    ":smug:", "/images/emoijs/smileys/smug.gif",
    ":star:", "/images/emoijs/smileys/star.gif",
    ":straightface:", "/images/emoijs/smileys/straightface.gif",
    ":talktohand:", "/images/emoijs/smileys/talktohand.gif",
    ":thinking:", "/images/emoijs/smileys/thinking.gif",
    ":thumbsdown:", "/images/emoijs/smileys/thumbsdown.gif",
    ":thumbsup:", "/images/emoijs/smileys/thumbsup.gif",
    ":timeout:", "/images/emoijs/smileys/timeout.gif",
    ":tongue:", "/images/emoijs/smileys/tongue.gif",
    ":tongue2:", "/images/emoijs/smileys/tongue2.gif",
    ":usa:", "/images/emoijs/smileys/usa.gif",
    ":waiting:", "/images/emoijs/smileys/waiting.gif",
    ":wave:", "/images/emoijs/smileys/wave.gif",
    ":whew:", "/images/emoijs/smileys/whew.gif",
    ":whistling:", "/images/emoijs/smileys/whistling.gif",
    ":worried:", "/images/emoijs/smileys/worried.gif",
    ":yawn:", "/images/emoijs/smileys/yawn.gif",
    ":yinyang:", "/images/emoijs/smileys/yinyang.gif",
]

const bbcodeTags = [
    { html: "<b></b>", tag: "b" },
    { html: "<u></u>", tag: "u" },
    { html: "<s></s>", tag: "s" },
    { html: "<i></i>", tag: "i" },
    { html: "<span style='display:flow;place-self:center;text-align: center;'></span>", tag: "center" },
    { html: "<span style='float: left'>$attr$</span>", tag: "left" },
    { html: "<span style='float: right'>$attr$</span>", tag: "right" },
    { html: "<marquee></marquee>", tag: "marquee" },
    { html: "<span class='rainbow'></span>", tag: "rainbow" },
    { html: "<blink></blink>", tag: "blink" },
    { html: "<code></code>", tag: "code" },
    { html: "<span style='color: $attr$;'></span>", tag: "color" },
    { html: "<a href='$attr$'></a>", tag: "url" },
    { html: "<a href='$attr$'>$attr$</a>", tag: "email" },
    { html: "<img src='$attr$'></img>", tag: "img" },
    { html: "<a href='/article/$attr$'></a>", tag: "article" },
    { html: "<a href='/blog/$attr$'></a>", tag: "blog" },
    { html: "<span style='font-size: $attr$px;'></span>", tag: "size" },
    { html: "<span style='font-family: $attr$;'></span>", tag: "font" },
    { html: "<h1></h1>", tag: "h1" },
    { html: "<h2></h2>", tag: "h2" },
    { html: "<h3></h3>", tag: "h3" },
    { html: "<h4></h4>", tag: "h4" },
    { html: "<h5></h5>", tag: "h5" },
    { html: "<h6></h6>", tag: "h6" },
    { html: "<audio src='$attr$'></audio>", tag: "audio"},
    { html: "<video src='$attr$'></video>", tag: "video"},
    { html: "<span style='cursor:pointer;border-bottom: 1px dashed #ce5151;color: #ce5151;' title=$attr$></span>", tag: "abbr" },
    { html: "<span style='background-color: $attr$'></span>", tag: "bgcolor"},
    { html: "<img class='emoji' src='https://www.pixelcatsend.com/images/catmojis/$attr$.png'></img>", tag: "catmoji" },
];


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

window.bbcodeparse = function bbcodeparse(s) {
    let result = s;
    if (!s) {
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

    return DOMPurify.sanitize(result);
}