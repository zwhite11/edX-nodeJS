const MongoClient = require("mongodb").MongoClient;
const customers = require("./m3-customer-data.json");
const addresses = require("./m3-customer-address-data.json");
const async = require("async");

// number of entries to insert at a time
const numberToInsert = parseInt(process.argv[2]);
const url = "mongodb://localhost:27017/edx-course-db";

// empty set of async tasks
let tasks = [];

MongoClient.connect(
  url,
  { useNewUrlParser: true },
  (error, db) => {
    if (error) return process.exit(1);
    // new collection called 'customers'
    const collection = db.collection("customers");

    customers.forEach((customer, index) => {
      let start, end;
      // combine customer data with their lost address data
      customers[index] = Object.assign(customer, addresses[index]);
      if (index % numberToInsert === 0) {
        start = index;
        end = start + numberToInsert;
        // adjust 'end' if the above formula results in a value > number of total entries
        end > customers.length ? (end = customers.length) : end;
        // add tasks to the async tasks list
        tasks.push(callback => {
          console.log(
            `Inserting ${start}/${end} records of ${customers.length}`
          );
          collection.insertMany(
            customers.slice(start, end),
            (error, results) => {
              callback(error, results);
            }
          );
        });
      }
    });
    console.log("Starting tasks...");

    // run the async tasks in parallel
    async.parallel(tasks, (error, results) => {
      if (error) console.error(error);
      db.close();
    });
    console.log("Tasks completed");
  }
);
