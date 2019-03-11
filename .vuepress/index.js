const Sidebar = require("../index");
let path = ".././";
let dir = Sidebar.read_Dir(path)._j;
const fs = require("fs");
let regex = /\w*\.(\w)*|node_modules/g;
dir = dir
  .filter(folder => !folder.match(regex))
  .filter(folder => {
    if (fs.statSync(path + folder).isDirectory()) {
      let content = Sidebar.read_Dir(path + folder)._j;
      content = content.filter(element => element.match(/README.md/));
      if (content) {
        return content;
      }
    }
  });
console.log(dir);
