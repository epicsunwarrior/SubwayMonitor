'use strict';
let statusService = require('./statusService');
let cron = require('node-cron');

let delayedTime = {};
let curStatus = {};
let delayFlag = "delayed";
let clearFlag = "cleared";
let minutesElasped = 0;


let processFunction = function(delayedLines) {
	// Check new delayed lines
	for (let i in delayedLines) {
		let line = delayedLines[i];

		if (!curStatus[line] || curStatus[line] !== delayFlag) {
			console.log("Line " + line + " is experiencing delays");
			curStatus[line] = delayFlag;
		}
		let curCountOfDelay = 0;
		if (delayedTime[line]) {
			curCountOfDelay = delayedTime[line];
		}
		delayedTime[line] = curCountOfDelay + 1;
	}

	// Check old delayed lines
	for (let line in Object.keys(curStatus)) {
		if (curStatus[line] === delayFlag && !delayedLines.contains(line)) {
			console.log("Line " + line + " is now recovered");
			curStatus[line] = clearFlag;
		}
	}
}

cron.schedule('* * * * *', () => {
	console.log("Running scrape");
	minutesElasped = minutesElasped + 1; 
   	statusService.getDelayedLines().then(item => processFunction(item));
});

let getStatus = function(line) {
	return (curStatus[line] && curStatus[line] === delayFlag);
}

let getUptime = function(line) {
	if (delayedTime[line]) {
		return 1 - (delayedTime[line] / minutesElasped);
	} else { 
		return 1;
	}
}

module.exports = {
	getStatus : getStatus,
	getUptime : getUptime,
}
