const fs = require("fs");
const path = require("path");

/**
 * fn to write data to file
 * @param { Data to write to file } newData 
 * @param {news or user} type 
 * @returns status: !status, message : `${type} added successfully `
 */
function writeToFile(newData, type) {
  let writePath = path.join(__dirname, "../db", `${type}-db.json`);
  let status = fs.writeFile(
    writePath,
    JSON.stringify(newData),
    { encoding: "utf-8", flag: "w" },
    (err, data) => {
      return {
        status: !err,
        message : "Something went wrong "
      };
    }
  );


  return {
    status: !status,
    message : `${type} added successfully `
  };
}

module.exports = { writeToFile };
