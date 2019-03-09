var fs = require("fs");
var Promise = require("promise");
class SidebarUtil {
  constructor() {
    this.regex = /sidebar:\s(\w*)/;
  }
  init() {
    return this.getSidebar();
  }

  parseContent(content) {
    let data = content.split(/\n/);
    let sidebar = null;
    data.some(line => {
      let hit = line.match(this.regex);
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
  }

  read_file() {
    return new Promise(resolve => {
      let content = fs.readFileSync("README.md", "utf8");
      let response = resolve(content);
      return response;
    });
  }

  getSidebar() {
    let content = this.read_file()._j;
    if (content.errno) {
      throw Error(
        "when reading file, make sure u have a README.md file in home directory"
      );
    } else {
      return this.parseContent(content);
    }
  }
}
let sidebar = new SidebarUtil().init();
console.log(sidebar);
