const rp = require("request-promise");
const $ = require("cheerio");

const potusParse = function(url) {
  rp(url)
    .then(html => {
      console.log($(".firstHeading", html).text());

      console.log($(".bday", html).text());
    })
    .catch(err => {
      console.log(err);
    });
};
module.exports = potusParse;

// const htmlparser = require("htmlparser2");
// const parser = new htmlparser.Parser(
//   {
//     onopentag: (name, attribs) => {
//       if (name === "script" && attribs.type === "text/javascript") {
//         console.log("JS! Hooray!");
//       }
//     },
//     ontext: text => {
//       console.log("-->", text);
//     },
//     onclosetag: tagname => {
//       if (tagname === "script") {
//         console.log("That's it?!");
//       }
//     }
//   },
//   { decodeEntities: true }
// );
// parser.write(
//   "Xyz <script type='text/javascript'>var foo = '<<bar>>';</ script>"
// );
// parser.end();
