var fs = require("fs");
let regex = /sidebar:\s(\w*)/;
var Promise = require("promise");

const parseContent = content => {
  let data = content.split(/\n/);
  let sidebar = null;
  data.some(line => {
    let hit = line.match(regex);
    if (hit) {
      sidebar = line
        .replace(/sidebar:\s|\\r|\s/g, "")
        .split(",")
        .map(el => {
          return `/${el}/`;
        });
    }
    return hit;
  });
  return sidebar;
};

const read_file = () => {
  return new Promise(resolve => {
    let content = fs.readFileSync("README.md", "utf8");
    let response = resolve(content);
    return response;
  });
};

console.log("før");
let content = read_file()._j;
let sidebar = parseContent(content);
console.log("etter", sidebar);
console.log("asdasd");
