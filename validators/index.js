// models/index.js
const fs = require("fs");
const path = require("path");

const files = {};

// Read all files in the directory
fs.readdirSync(__dirname)
  // Filter out the current file (index.js) and non-JavaScript files
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  // For each JavaScript file, require it and add it to the modules object
  .forEach((file) => {
    const fileName = path.parse(file).name;
    files[fileName] = require(`./${file}`);
  });

module.exports = files;