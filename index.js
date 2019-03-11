const fs = require("fs");
const Promise = require("promise");

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

  read_file(filename = "README.md") {
    return new Promise(resolve => {
      let content = fs.readFileSync(filename, "utf8");
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

  autoSidebar() {}

  read_Dir(path) {
    return new Promise(resolve => {
      let content = fs.readdirSync(path, "utf8");
      let response = resolve(content);
      return response;
    });
  }
}
//let sidebar = new SidebarUtil().init();
//console.log(sidebar);
module.exports = new SidebarUtil();
