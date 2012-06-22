# Unity template

A single JSDoc template for generating Montage and Screening docs.

This document assumes that the JSDoc and Montage distributions are located in the same directory. (e.g. `/repos/montage` and `/repos/jsdoc`.)

## Overview

Each product has two customized templates whose file names are pre-pended with the product name + hyphen:

* _product_-layout.tmpl
* _product_-index.tmpl

Each product's `-layout.tmpl` file contains product-specific content that's used on every page, including Google analytics code, product name, and product logo. 

Each product's `*-index.tmpl` contains the content specific to each product's main index/landing page. 

All product-specific "static" files (CSS files, images) reside in a `unity/static/_product-name_` directory. These are actually identical except for the PNG logo image.

Below is a snapshot of the Unity template's file/folder structure:

<pre>        
├── static
│   ├── montage
│   │   └── styles
│   │       ├── jsdoc-default.css
│   │       ├── list.js
│   │       ├── logo.png
│   │       └── node-dark.css
│   └── screening
│       └── styles
│          ├── jsdoc-default.css
│          ├── list.js
│          ├── logo.png
│          └── node-dark.css
└── tmpl
    ├── container.tmpl
    ├── details.tmpl
    ├── example.tmpl
    ├── examples.tmpl
    ├── exceptions.tmpl
    ├── fires.tmpl
    ├── members.tmpl
    ├── method.tmpl
    ├── montage-index.tmpl
    ├── montage-layout.tmpl
    ├── params.tmpl
    ├── properties.tmpl
    ├── returns.tmpl
    ├── screening-index.tmpl
    ├── screening-layout.tmpl
    ├── summary_table.tmpl
    └── tutorial.tmpl
</pre>

## Usage

To specify which product's documentation to build, you include a custom query parameter with the `-q` (or --query) parameter when invoking JSDoc, followed by a `product=<product-name>` parameter. Only valid values for `<product-name>` are **montage** and **screening**. 

For example, to build the **Montage docs**: 

> ` ./jsdoc -t templates/unity -q product=montage -d out/montage ../montage/core ../montage/ui ../montage/data`

Or, to build the **Screening docs**: 

> ` ./jsdoc -t templates/unity -q product=screening -d out/screening  ../server/lib/agents-webdriver/agent.js ../server/lib/agents-webdriver/component.js ../server/lib/agents-webdriver/element.js ../server/lib/testcase/script.js ../server/lib/testcase/assert.js`