var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const vgmUrl = `https://www.sabah.com.tr/adana-namaz-vakitleri`;

router.get("/", async(req, res) => {
  request(vgmUrl, function (error, response, html) {
    const $ = cheerio.load(html);
  const scrapedData = [];
  $("body > section > div > div > div.col-xs-12.col-md-8.column-left > div > div.col-xs-12 > div.row.nDetay > div:nth-child(2) > div > div.main > table > tbody > tr").each((index, element) => {
      if (index == 0) return true;
      const tds = $(element).find("td");
      const day = $(tds[0]).text();
      const imsak = $(tds[1]).text();
      const sun = $(tds[2]).text();
      const noon = $(tds[3]).text();
      const afternoon = $(tds[4]).text();
      const evening = $(tds[5]).text();
      const night = $(tds[6]).text();
      const tableRow = { day, imsak, sun, noon, afternoon, evening, night };
      scrapedData.push(tableRow);
  });
  res.json({ data: scrapedData })
  })
})

module.exports = router;
