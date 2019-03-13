### Vuepress sidebar generator

This package reads folders in your workdir with a README.md file and appends it to your sidebar

### Getting started

    npm i vue-sidebar-generator
    or
    yarn add vue-sidebar-generator

In config.js

    let Sidebar = require("vue-sidebar-generator")

    const init = () => {
        let sidebar = Sidebar.autoSidebar(); // default path is "./"

        return {
            // rest of config options
            sidebar: {
                "/": sidebar
            },
            //config options
        }
    }
    module.exports = init();

### support for folders - netlify

    const path = "./docs"
    const sidebar = Sidebar.folderToSidebar(path)

    const init = () => {
        let sidebar = Sidebar.autoSidebar(); // default path is "./"

        return {
            // rest of config options
            sidebar: [
              {
                title: "",
                collapsable: false,
                children: sidebar
              }
            ],
            //config options
        }
    }
    module.exports = init();

this will read all the markdown files in that folder and append to sidebar.

### read sidebar from YAML front matter in README.md

there is also an option to select which items to have in your sidebar.
You can specify in README.md for workdir

\---\
title: title\
sidebar: sideItem1, sideItem2, sideItem3\
\---

then in config.js

    let sidebar = getSidebar();

### Folder structure

```
project
|___.vuepress
|   |   config.js
|
|___post1
|   |   README.md
|
|___post2
|   |   README.md
|
|___post3
|   |   README.md
|
|   package.json
|   README.md
|
```

currently subfolders are not supported.
