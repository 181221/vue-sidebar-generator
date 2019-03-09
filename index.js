var fs = require("fs");
let regex = /sidebar:\s(\w*)/;
var Promise = require("promise");
const test1 = () => {
  return new Promise(async (resolve, reject) => {
    let arr = ["/uke6/", "/uke5/", "/uke4/", "/uke3/", "/uke2/", "/uke1/"];
    let response = await resolve("asdasd");
    return response;
  });
};
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
  let content = () => {
    return new Promise(resolve => {
      let content = fs.readFileSync("README.md", "utf8");
      let response = resolve(content);
      return response;
    });
  };
  return content();
};

const reader = () => {};

const readSpecified = () => {
  return new Promise(async (resolve, reject) => {
    await fs.readFile("README.md", "utf8", (err, data) => {
      if (err) reject(err);
      let content = data.split(/\n/);
      let sidebar = null;
      content.some(line => {
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
      if (sidebar) resolve(sidebar);
      reject(sidebar);
    });
  });
};
console.log("før");
let content = read_file()._j;
let sidebar = parseContent(content);
console.log("etter", sidebar);
/*
let main = async () => {
  let Sidebar = await readSpecified();
  console.log("specified", Sidebar);
  console.log("after calling readFile");
};
main();*/
console.log("asdasd");
