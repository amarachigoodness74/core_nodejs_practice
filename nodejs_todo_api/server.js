const http = require("http");
const router = require("./routes");

const port = 7000;

const server = http.createServer((req, res) => {
  router(req, res);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});