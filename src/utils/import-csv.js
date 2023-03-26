import fs from "node:fs/promises";
import { parse } from "csv-parse";

//const input = fs.createReadStream("./file.csv");

const parser = parse(
  {
    delimiter: ",", // Specify the delimiter used in the CSV file
    columns: true, // Treat the first line as column names
    skip_empty_lines: true, // Skip any empty lines in the file
  },
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data); // Process the parsed data here
  }
);

const takas = [];
var isFirst = false;

const input = fs
  .readFile("./src/file.csv", "utf8")
  .then((data) => {
    if (!isFirst) {
      isFirst = true;
      return;
    }

    const arrayTask = data.split(",");
    takas.push(arrayTask);
  })
  .catch((e) => {
    console.log(e);
  });

// fetch("http://localhost:5000", {
//   method: "POST",
//   body: {
//     title: arrayTask[0],
//     description: arrayConst[1],
//   },
// })
//   .then((res) => {
//     return res.text();
//   })
//   .then((data) => {
//     console.log(data);
//   });
console.log("input", input);
