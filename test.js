'use strict';
const axios = require('axios');
const assert = require('assert');

let getStatusEndpoint = "http://localhost:8081/status";
let getUptimeEndpoint = "http://localhost:8081/uptime";

axios.get(getStatusEndpoint, {
  params: {
    line: "A",
  }
}).then(function (response) {
  console.log(response);
}).catch(function (err) {
  console.log(err);
});


axios.get(getUptimeEndpoint, {
  params: {
    line: "A",
  }
}).then(function (response) {
  console.log(response);
}).catch(function (err) {
  console.log(err);
});