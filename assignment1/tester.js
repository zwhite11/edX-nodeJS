const fs = require("fs");
//core module used to perform file system operations
const path = require("path");
//module used to work with files and folders
const csvToJson = require("convert-csv-to-json");
//module used to convert csv files to json objects

const csvFilePath = path.join(__dirname, "customer-data.csv");
//specifying the file to be converted
let json = csvToJson.fieldDelimiter(",").getJsonFromCsv(csvFilePath);
//module method to convert csv files seperated with commas (',')

fs.writeFileSync(
  path.join(__dirname, "customer-data.json"),
  JSON.stringify(json),
  "utf-8"
);
//fs method to create new files and write to them
console.log("done with CSV to JSON conversion");
