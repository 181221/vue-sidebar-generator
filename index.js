const fs = require("fs");
const Promise = require("promise");

class SidebarUtil {
  constructor() {
    this.regex = /sidebar:\s(\w*)/;
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

  autoSidebar(path = "./") {
    let regex = /\w*\.(\w)*|node_modules/g;
    let dir = this.read_Dir(path)._j;
    dir = dir
      .filter(folder => !folder.match(regex))
      .filter(folder => {
        if (fs.statSync(path + folder).isDirectory()) {
          let content = this.read_Dir(path + folder)._j;
          content = content.filter(element => element.match(/README.md/));
          if (content) return content;
        }
      })
      .map(el => `/${el}/`);
    return dir;
  }

  folderToSidebar(path) {
    let dir = this.read_Dir(path)._j;
    dir = dir
      .filter(folder => folder.match(/w*.md/))
      .map(el => `/${el.replace(".md", "")}/`);
    return dir;
  }

  read_Dir(path) {
    return new Promise(resolve => {
      let content = fs.readdirSync(path, "utf8");
      let response = resolve(content);
      return response;
    });
  }
}
module.exports = new SidebarUtil();
