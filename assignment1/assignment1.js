const csvToJson = require("csvtojson"); // module for converting csv to json
const fs = require("fs"); // module to work with the filesystem
const path = require("path"); // module for creating compatible path names

// path of the file to be read
const csvFilePath = "customer-data.csv";

// path of the destination file after conversion
const destinationPath = "customer-data.json";

csvToJson()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    // write the converted json to destination file
    fs.writeFile(
      path.join(__dirname, destinationPath),
      JSON.stringify(jsonObj, null, 2),
      // error handling
      function(error) {
        if (error) return console.log(error);
        console.log(`Writing is done to file ${destinationPath}`);
      }
    );
  });
