const puppeteer = require("puppeteer");
const $ = require("cheerio");
const express = require("express");

const app = express();
const url = "https://www.ura.gov.sg/Corporate/Media-Room/Media-Releases";

app.get("/", async function(req, res) {
  const result = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const pageContents = await page.content();
  result.push($(".text > a", pageContents).slice(1, 2)["0"].attribs.href);
  result.push(
    $(".text > a", pageContents)
      .slice(1, 2)
      .text()
  );
  res.send(JSON.stringify(result));
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`listening on ${port}`);
});

// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);
//     const pageContents = await page.content();
//   console.log(
//     $(".text", pageContents)
//       .slice(1, 4)
//       .children("a")["0"].attribs.href
// gets first result   .first()
//get textcontent    .text()
//   );
//     result.push($(".text > a", pageContents).slice(1, 2)["0"].attribs.href);
//     result.push(
//       $(".text > a", pageContents)
//         .slice(1, 2)
//         .text()
//     );
//   })();

// puppeteer
//   .launch()

//   .then(function(browser) {
//     return browser.newPage();
//   })

//   .then(function(page) {
//     return page.goto(url).then(function() {
//       return page.content();
//     });
//   })

//   .then(function(html) {
//     $("li", html).each(function() {
//       console.log($(this).text());
//     });
//   })

//   .catch(function(err) {});

// NOT WORKING SINCE URA WEBSITE NEEDS JS
// const rp = require("request-promise");
// const $ = require("cheerio");
// const url = "https://www.ura.gov.sg/Corporate/Media-Room/Media-Releases";

// (async () => {
//   const html = await rp(url);
//   console.log($("li", html).text());
// })();
