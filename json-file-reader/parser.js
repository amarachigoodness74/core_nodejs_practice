// JSON parsing functions
const fs = require("fs");

function parseJSON() {
  const stream = fs.createReadStream("data/sample.json", { encoding: "utf8" });

  stream.on("data", (chunk) => {
    console.log("Processing chunk: ", chunk);
    console.log("Processing chunk: ", chunk.length);
  });

  stream.on("end", () => {
    console.log("Finished reading file");
  });

  stream.on("error", (err) => {
    console.error("Error reading file:", err);
  });
}

parseJSON();
