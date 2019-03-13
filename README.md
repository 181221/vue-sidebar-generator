### Vuepress sidebar generator

This package reads folders in your workdir with a README.md file and appends it to your sidebar

### Getting started

    npm i vuepress-sidebare-generator

In config.js

    const init = () => {
        let sidebare = getAutomatic();
        return {
            // rest of config options
            sidebar: {
                "/": sidebar
            },
            //config options
        }
    }
    module.exports = init();

there is also an option to select which items to have in your sidebar.
You can specify in README.md for workdir

\---\
title: title\
sidebar: sideItem1, sideItem2, sideItem3\
\---

then in config.js
  
 let sidebar = getSidebar();
