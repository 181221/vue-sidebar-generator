var fs = require("fs");
let regex = /sidebar:\s(\w*)/;

const readSpecified = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile("README.md", "utf8", (err, data) => {
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
let main = async () => {
  let Sidebar = await readSpecified();
  console.log("specified", Sidebar);
  console.log("after calling readFile");
};
main();
