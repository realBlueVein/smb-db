import { Meteor } from 'meteor/meteor';
import '../collections/watchlist';
const cheerio = require('cheerio')
const Table = require('cli-table');
const request = require('request');
const stringSearcher = require('string-search');


Meteor.publish('Watchlist', function () {
  return Rooms.find({});
});

Meteor.methods({
  'stockScrape'({stock, id}) {
    const stockURL = 'https://finviz.com/quote.ashx?t=' + stock;

    let stats;

    request(stockURL, (error, response, html) => {
      if(!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
  
          const dataTable = $('.snapshot-table2').text();
          
          // ATR
          stringSearcher.find(dataTable,'ATR')
              .then(function(resultArr){
                  let fatr = resultArr[0].text;
                  stats = fatr;
              })
              stringSearcher.find(dataTable,'Avg Volume')
              .then(function(resultArr){
                  let favol = resultArr[0].text;

              })
              stringSearcher.find(dataTable,'Rel Volume')
              .then(function(resultArr){
                  let frvol = resultArr[0].text;
     
              })
              stringSearcher.find(dataTable,'Shs Float')
              .then(function(resultArr){
                  let ffloat = resultArr[0].text;
            
              })
              stringSearcher.find(dataTable,'Short Float')
              .then(function(resultArr){
                  let fsfloat = resultArr[0].text;
                  stats[4] = fsfloat;

              })
              stringSearcher.find(dataTable,'Inst Own')
              .then(function(resultArr){
                  let finst = resultArr[0].text;
        
              })
            }
  });
  // Add update 
  console.log(stats);
  }
});

Meteor.startup(() => {
  // code to run on server at startup
});