const https = require("node:https");

// Using nodejs http core module for http request
https
  .get("https://encrypted.google.com/", (res) => {
    console.log("statusCode:", res.statusCode);
    console.log("headers:", res.headers);
    
    res.on("data", (chunk) => {
      console.log(`Response chunk details: ${chunk}`);
    });

    res.on("end", () => {
      console.log("No more data");
    });
  })
  .on("error", (error) => {
    console.log(`Error: ${error}`);
  });
