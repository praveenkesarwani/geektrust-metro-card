const fs = require("fs");
const filename = process.argv[2];
const { processMetroCardTravel } = require("./metroCardTravel");
fs.readFile(filename, "utf8", (err, data) => {
  if (err) throw err;
  processMetroCardTravel(data);
});
