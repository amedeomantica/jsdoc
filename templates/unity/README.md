# Unity template

Unity is a JSDoc template for generating both Montage and Screening docs. A command line parameter specifies which product's docs you want to build. Based on this input, the publish process chooses the apprpropriate template pieces. Each product has two customized templates whose file names are pre-pended with the product name:

* _product_-layout.tmpl
* _product_-index.tmpl

In JSDoc parlance these are "template partials" that are rendered during the publish process. Each product's  \*-layout.tmpl partial defines the overall layout for each product page, includes product-specific CSS files, and defines Google analytics. The \*-index.tmpl partials contain the static content (overview, frontmatter, whatever) for each product. 


* montage-layout.tmpl -- Main layout template for Montage; includes "/static/**montage**/styles/jsdoc-default.css".
* screening-layout.tmpl -- Main layout template for Montage; includes "/static/**screening**/styles/jsdoc-default.css".
* montage-index.tmpl -- Static index page content for Montage.
* screening-index.tmpl -- Static index page content for Screening.

TODO: Currently, the two CSS files are identical except for the image logo added to the `h1` selector (logo.png). This isn't ideal as each CSS change requires updating two files. Fixme.

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
    ├── montage-index.tmpl
    ├── montage-layout.tmpl
    ├── screening-index.tmpl
    ├── screening-layout.tmpl
    ├── container.tmpl
    ├── method.tmpl
    ├── params.tmpl
    ├── properties.tmpl
    ├── returns.tmpl
    ├── details.tmpl
    ├── example.tmpl
    ├── examples.tmpl
    ├── exceptions.tmpl
    ├── fires.tmpl
    ├── members.tmpl
    ├── summary_table.tmpl
    └── tutorial.tmpl
</pre>

## Usage

The following steps assume that the JSDoc and Montage distributions are located in the same directory (e.g. `/repos/montage` and `/repos/jsdoc`). If your environment is set up differently you will need to adjust your paths accordingly.

To use the Unity template, you include a `-q` (or --query) parameter when invoking JSDoc, followed by `product=<product-name>` parameter where `<product-name>` is either **montage** or **screening**. The product name is used to customized what template partials are included in the build.

By default, the system uses the /templates/unity JSDoc template, so you don't have to specify a template. If you want to use another template, you must specify it with the `-t` template option on the command line.

By default, the generated HTML files are placed in a folder called "out" in the JSDoc folder. To specify a folder, use the `-d` command line option

For example, to build the Montage docs

> ` ./jsdoc -q product=montage -d out/montage ../montage/core ../montage/ui ../montage/data`

Or, to build the Screening docs: 

> ` ./jsdoc -q product=screening -d out/screening  ../server/lib/agents-webdriver/agent.js ../server/lib/agents-webdriver/component.js ../server/lib/agents-webdriver/element.js ../server/lib/testcase/script.js ../server/lib/testcase/assert.js`