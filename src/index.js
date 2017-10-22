//Requires a proxy otherwise response is missing Access-Control-Allow-Origin header.
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://d10xkldqejj5hr.cloudfront.net/dev/dashboard.json';

fetch(proxyUrl + url)
  .then(response => {
  });

