'use strict';

const request = require('request');
const cheerio = require('cheerio')

let MTA_WEBSITE = "https://new.mta.info";
let LINE_MAPS = {};
LINE_MAPS["line-1", "1"];
LINE_MAPS["line-2", "2"];
LINE_MAPS["line-3", "3"];
LINE_MAPS["line-4", "4"];
LINE_MAPS["line-5", "5"];
LINE_MAPS["line-6", "6"];
LINE_MAPS["line-7", "7"];
LINE_MAPS["line-A", "A"];
LINE_MAPS["line-C", "C"];
LINE_MAPS["line-E", "E"];
LINE_MAPS["line-B", "B"];
LINE_MAPS["line-D", "D"];
LINE_MAPS["line-F", "F"];
LINE_MAPS["line-M", "M"];
LINE_MAPS["line-N", "N"];
LINE_MAPS["line-W", "W"];
LINE_MAPS["line-Q", "Q"];
LINE_MAPS["line-R", "R"];
LINE_MAPS["line-G", "G"];
LINE_MAPS["line-J", "J"];
LINE_MAPS["line-Z", "Z"];
LINE_MAPS["line-S", "S"];
LINE_MAPS["line-L", "L"];

let getDelayedLines = function() {
	return new Promise((resolve, reject) => {
		let delayedLines = [];
		request(MTA_WEBSITE, function(err, res, body) { 
			const $ = cheerio.load(body);
			/*
			let text = $(".by-status:contains('Delays')").html();
			for(let key in LINE_MAPS) {
				if (text.contains(key)) {
					delayedLines.push(LINE_MAPS[key]);
				}
			}
			*/
		});
		delayedLines.push("A");
		resolve(delayedLines);
	});
}

module.exports = {
	getDelayedLines : getDelayedLines,
}