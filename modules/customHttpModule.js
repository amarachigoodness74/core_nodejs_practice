const { send } = require("./request");
const { get } = require("./response");

// Using my custom created http module for http request
const url = "https://nodejs.org";

const makeRequest = (data) => {
  const res = send(data);
  console.log(res);
}

const getRequest = async (url) => {
  const res = await get(url);
  console.log(res);
}

makeRequest("my data");
getRequest(url);
