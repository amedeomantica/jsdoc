(function() {

<<<<<<< HEAD
    var _ = require('underscore/underscore'),
        template = require('underscore/template'),
        fs = require('fs'),
        helper = require('jsdoc/util/templateHelper'),
        dictionary = require('jsdoc/tag/dictionary'),
        scopeToPunc = { 'static': '.', 'inner': '~', 'instance': '#' };

        template.settings.evaluate    = /<\?js([\s\S]+?)\?>/g;
        template.settings.interpolate = /<\?js=([\s\S]+?)\?>/g;

// Customizing so that we have reasonably-good-filenames
function getNamespace(kind) {
    if (dictionary.isNamespace(kind)) {
        return kind+':';
    }
    return '';
}


var containers = ['class', 'module', 'external', 'namespace', 'mixin'];
/**
 * Turn a doclet into a URL.
 */
helper.createLink = function(doclet) {
    var url = '', longname, filename;

    if (containers.indexOf(doclet.kind) < 0) {
        longname = doclet.longname;
        filename = longname.replace(/[^a-zA-Z 0-9 ]+/g,"_");

        url = filename + helper.fileExtension + '#' + getNamespace(doclet.kind) + doclet.name;
    }
    else {
        longname = doclet.longname;
        filename = longname.replace(/[^a-zA-Z 0-9 ]+/g,"_");

        url = filename + helper.fileExtension;
    }

    return url;
};

//END Customizing so that we have reasonably-good-filenames

    var alphabetical = function(m1, m2){
        var nameA = m1.name.toLowerCase(), nameB = m2.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA == nameB) {
            return 0;
        }
        return 1
    };

=======
    var template = require('jsdoc/template'),
        fs = require('fs'),
        helper = require('jsdoc/util/templateHelper'),
        scopeToPunc = { 'static': '.', 'inner': '~', 'instance': '#' };

>>>>>>> refs/remotes/origin/jsdoc-update
    /**
        @global
        @param {TAFFY} data See <http://taffydb.com/>.
        @param {object} opts
<<<<<<< HEAD
     */
    publish = function(data, opts) {
        var out = '',
            containerTemplate = template.render(fs.readFileSync(__dirname + '/templates/screening/tmpl/container.tmpl')),
            indexTemplate = template.render(fs.readFileSync(__dirname + '/templates/screening/tmpl/index.tmpl'));


        function render(tmpl, partialData) {
            var renderFunction = arguments.callee.cache[tmpl];
            if (!renderFunction) {
                renderFunction = arguments.callee.cache[tmpl] = template.render(fs.readFileSync(__dirname + '/templates/screening/tmpl/'+tmpl));
            }
            partialData.render = arguments.callee;
            partialData.find = find;
            partialData.linkto = linkto;
            partialData.htmlsafe = htmlsafe;

            return renderFunction.call(partialData, partialData);
        }
        render.cache = {};
=======
        @param {Tutorial} tutorials
     */
    publish = function(data, opts, tutorials) {
        var out = '',
            view = new template.Template(__dirname + '/templates/screening_2/tmpl');

        // set up templating
        view.layout = 'layout.tmpl';

        // set up tutorials for helper
        helper.setTutorials(tutorials);
>>>>>>> refs/remotes/origin/jsdoc-update

        function find(spec) {
            return data.get( data.find(spec) );
        }

        function htmlsafe(str) {
            return str.replace(/</g, '&lt;');
        }

        function addSignatureParams(f) {
            var pnames = [];
            if (f.params) {
                f.params.forEach(function(p) {
                    if (p.name && p.name.indexOf('.') === -1) {
                        if (p.optional) { pnames.push('<span class="optional">'+p.name+'</span>'); }
                        else { pnames.push(p.name); }
                    }
                });
            }

            f.signature = (f.signature || '') + '('+pnames.join(', ')+')';
        }

        function generateAncestry(thisdoc) {
            var ancestors = [],
                doc = thisdoc;

            while (doc = doc.memberof) {
                doc = find({longname: doc});
                if (doc) { doc = doc[0]; }
                if (!doc) break;
                ancestors.unshift( linkto(doc.longname, (scopeToPunc[doc.scope] || '') + doc.name) );
            }
            if (ancestors.length) {
                ancestors[ancestors.length-1] += (scopeToPunc[thisdoc.scope] || '');
            }
            return ancestors;
        }

        function addSignatureReturns(f) {
            var returnTypes = [];

            if (f.returns) {
                f.returns.forEach(function(r) {
                    if (r.type && r.type.names) {
                        if (! returnTypes.length) { returnTypes = r.type.names; }
                    }
                });
            }

            if (returnTypes && returnTypes.length) {
<<<<<<< HEAD
                returnTypes = _.map(returnTypes, function(r) {
=======
                returnTypes = returnTypes.map(function(r) {
>>>>>>> refs/remotes/origin/jsdoc-update
                    return linkto(r);
                });
            }
            f.signature = '<span class="signature">'+(f.signature || '') + '</span>' + '<span class="type-signature">'+(returnTypes.length? ' &rarr; {'+returnTypes.join('|')+'}' : '')+'</span>';
        }

        function addSignatureType(f) {
            var types = [];

            if (f.type && f.type.names) {
                types = f.type.names;
            }

<<<<<<< HEAD
            f.signature = (f.signature || '') + '<span class="type-signature">'+htmlsafe(types.length? ' :'+types.join('|') : '')+'</span>';
        }

        function removeQuotesFromReelModule(module) {
            var moduleName = module.name;
            if(moduleName.indexOf(".reel\"") !== -1) {
                moduleName = moduleName.replace(".reel\"", ".reel");
                moduleName = moduleName.replace("\"", "");
            }
            module.name = moduleName;
=======
            if (types && types.length) {
                types = types.map(function(t) {
                    return linkto(t, htmlsafe(t));
                });
            }

            f.signature = (f.signature || '') + '<span class="type-signature">'+(types.length? ' :'+types.join('|') : '')+'</span>';
>>>>>>> refs/remotes/origin/jsdoc-update
        }

        function addAttribs(f) {
            var attribs = [];

<<<<<<< HEAD
=======
            if (f.virtual) {
                attribs.push('virtual');
            }

>>>>>>> refs/remotes/origin/jsdoc-update
            if (f.access && f.access !== 'public') {
                attribs.push(f.access);
            }

            if (f.scope && f.scope !== 'instance' && f.scope !== 'global') {
                if (f.kind == 'function' || f.kind == 'member' || f.kind == 'constant') attribs.push(f.scope);
            }

            if (f.readonly === true) {
                if (f.kind == 'member') attribs.push('readonly');
            }

            if (f.kind === 'constant') {
                attribs.push('constant');
                f.kind = 'member';
            }

            f.attribs = '<span class="type-signature">'+htmlsafe(attribs.length? '<'+attribs.join(', ')+'> ' : '')+'</span>';
        }

        data.remove({undocumented: true});
        data.remove({ignore: true});
        if (!opts.private) { data.remove({access: 'private'}); }
        data.remove({memberof: '<anonymous>'});

	    var packageInfo = (find({kind: 'package'}) || []) [0];

        //function renderLinks(text) {
        //    return helper.resolveLinks(text);
        //}

	    data.forEach(function(doclet) {
<<<<<<< HEAD
	        doclet.signature = '';
            doclet.attribs = '';

	        if (doclet.kind === 'member') {
	            addSignatureType(doclet);
	            addAttribs(doclet)
	        }

	        if (doclet.kind === 'constant') {
	            addSignatureType(doclet);
	            addAttribs(doclet)
	        }
=======
             doclet.attribs = '';

>>>>>>> refs/remotes/origin/jsdoc-update

	        if (doclet.examples) {
	            doclet.examples = doclet.examples.map(function(example) {
	                var caption, code;

	                if (example.match(/^\s*<caption>([\s\S]+?)<\/caption>(\s*[\n\r])([\s\S]+)$/i)) {
	                    caption = RegExp.$1;
	                    code    = RegExp.$3;
	                }

                    return {
                        caption: caption || '',
                        code: code || example
                    };
                });
	        }
<<<<<<< HEAD
	        else if (doclet.see) {
=======
	        if (doclet.see) {
>>>>>>> refs/remotes/origin/jsdoc-update
	            doclet.see.forEach(function(seeItem, i) {
	                doclet.see[i] = hashToLink(doclet, seeItem);
	            });
	        }
<<<<<<< HEAD

            if (doclet.kind === 'module') {
                removeQuotesFromReelModule(doclet);
            }

=======
>>>>>>> refs/remotes/origin/jsdoc-update
	    });

	    data.orderBy(['longname', 'version', 'since']);

        // kinds of containers
        var globals = find( {kind: ['member', 'function', 'constant', 'typedef'], memberof: {isUndefined: true}} ),
            modules = find({kind: 'module'}),
            externals = find({kind: 'external'}),
            mixins = find({kind: 'mixin'}),
	        namespaces = find({kind: 'namespace'});

        var outdir = opts.destination;
<<<<<<< HEAD
        if (packageInfo) {
=======
        if (packageInfo && packageInfo.name) {
>>>>>>> refs/remotes/origin/jsdoc-update
            outdir += '/' + packageInfo.name + '/' + packageInfo.version + '/';
        }
        fs.mkPath(outdir);

        // copy static files to outdir
<<<<<<< HEAD
        var fromDir = __dirname + '/templates/screening/static',
=======
        var fromDir = __dirname + '/templates/screening_2/static',
>>>>>>> refs/remotes/origin/jsdoc-update
            staticFiles = fs.ls(fromDir, 3);

        staticFiles.forEach(function(fileName) {
            var toDir = fs.toDir(fileName.replace(fromDir, outdir));
            fs.mkPath(toDir);
            fs.copyFile(fileName, toDir);
        });

        function linkto(longname, linktext) {
            var url = helper.longnameToUrl[longname];
            return url? '<a href="'+url+'">'+(linktext || longname)+'</a>' : (linktext || longname);
        }

<<<<<<< HEAD
=======
        function tutoriallink(tutorial) {
            return helper.toTutorial(tutorial);
        }

        var containers = ['class', 'module', 'external', 'namespace', 'mixin'];

>>>>>>> refs/remotes/origin/jsdoc-update
        data.forEach(function(doclet) {
            var url = helper.createLink(doclet);
            helper.registerLink(doclet.longname, url);
        });

        data.forEach(function(doclet) {
            var url = helper.longnameToUrl[doclet.longname];

	        if (url.indexOf('#') > -1) {
	            doclet.id = helper.longnameToUrl[doclet.longname].split(/#/).pop();
	        }
	        else {
	            doclet.id = doclet.name;
	        }

	        if (doclet.kind === 'function' || doclet.kind === 'class') {
	            addSignatureParams(doclet);
	            addSignatureReturns(doclet);
	            addAttribs(doclet);
	        }
	    })

        // do this after the urls have all been generated
        data.forEach(function(doclet) {
            doclet.ancestors = generateAncestry(doclet);
<<<<<<< HEAD
=======

            doclet.signature = '';

	        if (doclet.kind === 'member') {
	            addSignatureType(doclet);
	            addAttribs(doclet)
	        }

	        if (doclet.kind === 'constant') {
	            addSignatureType(doclet);
	            addAttribs(doclet)
	        }
>>>>>>> refs/remotes/origin/jsdoc-update
        });

        var nav = '',
            seen = {};
<<<<<<< HEAD
//
//        var moduleNames = find({kind: 'module'});
//        if (moduleNames.length) {
//            moduleNames.sort(alphabetical);
//            nav = nav + '<h3>Modules</h3><ul>';
//            moduleNames.forEach(function(m) {
//                if ( !seen.hasOwnProperty(m.longname) ) nav += '<li>'+linkto(m.longname, m.name)+'</li>';
//                seen[m.longname] = true;
//            });
//
//            nav = nav + '</ul>';
//        }

        var classNames = find({kind: 'class'});
        if (classNames.length) {
            classNames.sort(alphabetical);
            nav = nav + '<h3>Prototypes</h3><ul>';
=======

        // var moduleNames = find({kind: 'module'});
        // if (moduleNames.length) {
        //     nav += '<h3>Modules</h3><ul>';
        //     moduleNames.forEach(function(m) {
        //         if ( !seen.hasOwnProperty(m.longname) ) nav += '<li>'+linkto(m.longname, m.name)+'</li>';
        //         seen[m.longname] = true;
        //     });

        //     nav += '</ul>';
        // }

        var externalNames = find({kind: 'external'});
        if (externalNames.length) {
            nav += '<h3>Externals</h3><ul>';
            externalNames.forEach(function(e) {
                if ( !seen.hasOwnProperty(e.longname) ) nav += '<li>'+linkto( e.longname, e.name.replace(/(^"|"$)/g, '') )+'</li>';
                seen[e.longname] = true;
            });

            nav += '</ul>';
        }

        var classNames = find({kind: 'class'});
        if (classNames.length) {
            nav += '<h3>Prototypes</h3><ul>';
>>>>>>> refs/remotes/origin/jsdoc-update
            classNames.forEach(function(c) {
                var moduleSameName = find({kind: 'module', longname: c.longname});
                if (moduleSameName.length) {
                    c.name = c.name.replace('module:', 'require(')+')';
                    moduleSameName[0].module = c;
                }

                if (!seen.hasOwnProperty(c.longname) ) nav += '<li>'+linkto(c.longname, c.name)+'</li>';
                seen[c.longname] = true;
            });

<<<<<<< HEAD
            nav = nav + '</ul>';
        }

        var externalNames = find({kind: 'external'});
        if (externalNames.length) {
            externalNames.sort(alphabetical);
            nav = nav + '<h3>Externals</h3><ul>';
            externalNames.forEach(function(e) {
                if ( !seen.hasOwnProperty(e.longname) ) nav += '<li>'+linkto( e.longname, e.name.replace(/(^"|"$)/g, '') )+'</li>';
                seen[e.longname] = true;
            });

            nav = nav + '</ul>';
=======
            nav += '</ul>';
>>>>>>> refs/remotes/origin/jsdoc-update
        }

        var namespaceNames = find({kind: 'namespace'});
        if (namespaceNames.length) {
<<<<<<< HEAD
            namespaceNames.sort(alphabetical);
            nav = nav + '<h3>Namespaces</h3><ul>';
=======
            nav += '<h3>Namespaces</h3><ul>';
>>>>>>> refs/remotes/origin/jsdoc-update
            namespaceNames.forEach(function(n) {
                if ( !seen.hasOwnProperty(n.longname) ) nav += '<li>'+linkto(n.longname, n.name)+'</li>';
                seen[n.longname] = true;
            });

<<<<<<< HEAD
            nav = nav + '</ul>';
=======
            nav += '</ul>';
>>>>>>> refs/remotes/origin/jsdoc-update
        }

//         var constantNames = find({kind: 'constants'});
//         if (constantNames.length) {
<<<<<<< HEAD
//             nav = nav + '<h3>Constants</h3><ul>';
=======
//             nav += '<h3>Constants</h3><ul>';
>>>>>>> refs/remotes/origin/jsdoc-update
//             constantNames.forEach(function(c) {
//                 if ( !seen.hasOwnProperty(c.longname) ) nav += '<li>'+linkto(c.longname, c.name)+'</li>';
//                 seen[c.longname] = true;
//             });
//
<<<<<<< HEAD
//             nav = nav + '</ul>';
=======
//             nav += '</ul>';
>>>>>>> refs/remotes/origin/jsdoc-update
//         }

        var mixinNames = find({kind: 'mixin'});
        if (mixinNames.length) {
<<<<<<< HEAD
            mixinNames.sort(alphabetical);
            nav = nav + '<h3>Mixins</h3><ul>';
=======
            nav += '<h3>Mixins</h3><ul>';
>>>>>>> refs/remotes/origin/jsdoc-update
            mixinNames.forEach(function(m) {
                if ( !seen.hasOwnProperty(m.longname) ) nav += '<li>'+linkto(m.longname, m.name)+'</li>';
                seen[m.longname] = true;
            });

<<<<<<< HEAD
            nav = nav + '</ul>';
=======
            nav += '</ul>';
        }

        if (tutorials.children.length) {
            nav += '<h3>Tutorials</h3><ul>';
            tutorials.children.forEach(function(t) {
                nav += '<li>'+tutoriallink(t.name)+'</li>';
            });

            nav += '</ul>';
>>>>>>> refs/remotes/origin/jsdoc-update
        }

        var globalNames = find({kind: ['member', 'function', 'constant', 'typedef'], 'memberof': {'isUndefined': true}});

        if (globalNames.length) {
<<<<<<< HEAD
            globalNames.sort(alphabetical);
            nav = nav + '<h3>Global</h3><ul>';
=======
            nav += '<h3>Global</h3><ul>';
>>>>>>> refs/remotes/origin/jsdoc-update
            globalNames.forEach(function(g) {
                if ( g.kind !== 'typedef' && !seen.hasOwnProperty(g.longname) ) nav += '<li>'+linkto(g.longname, g.name)+'</li>';
                seen[g.longname] = true;
            });

<<<<<<< HEAD
            nav = nav + '</ul>';
        }

        for (var longname in helper.longnameToUrl) {
            var classes = find({kind: 'class', longname: longname});
            if (classes.length) generate('Prototype: '+classes[0].name, classes, helper.longnameToUrl[longname]);
=======
            nav += '</ul>';
        }

        // add template helpers
        view.find = find;
        view.linkto = linkto;
        view.tutoriallink = tutoriallink;
        view.htmlsafe = htmlsafe;
        // once for all
        view.nav = nav;

        for (var longname in helper.longnameToUrl) {
            var classes = find({kind: 'class', longname: longname});
            if (classes.length) generate('Prototypes: '+classes[0].name, classes, helper.longnameToUrl[longname]);
>>>>>>> refs/remotes/origin/jsdoc-update

            var modules = find({kind: 'module', longname: longname});
            if (modules.length) generate('Module: '+modules[0].name, modules, helper.longnameToUrl[longname]);

            var namespaces = find({kind: 'namespace', longname: longname});
            if (namespaces.length) generate('Namespace: '+namespaces[0].name, namespaces, helper.longnameToUrl[longname]);

//             var constants = find({kind: 'constant', longname: longname});
//             if (constants.length) generate('Constant: '+constants[0].name, constants, helper.longnameToUrl[longname]);

            var mixins = find({kind: 'mixin', longname: longname});
            if (mixins.length) generate('Mixin: '+mixins[0].name, mixins, helper.longnameToUrl[longname]);

            var externals = find({kind: 'external', longname: longname});
            if (externals.length) generate('External: '+externals[0].name, externals, helper.longnameToUrl[longname]);
        }

        if (globals.length) generate('Global', [{kind: 'globalobj'}], 'global.html');
<<<<<<< HEAD
        generateIndex('Index', 'index.html');

        function generate(title, docs, filename) {
            var data = {
                title: title,
                docs: docs,
                nav: nav,

                // helpers
                render: render,
                find: find,
                linkto: linkto,
                htmlsafe: htmlsafe
            };

            var path = outdir + '/' + filename,
                html = containerTemplate.call(data, data);
=======

        generateIndex('Index', 'index.html');


        function generate(title, docs, filename) {
            var data = {
                title: title,
                docs: docs
            };

            var path = outdir + '/' + filename,
                html = view.render('container.tmpl', data);
>>>>>>> refs/remotes/origin/jsdoc-update

            html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>

            fs.writeFileSync(path, html)
        }

        function generateIndex(title, filename) {
            var classes = find({kind: 'class', longname: longname});
<<<<<<< HEAD
            var data = {
                title: title,
                docs: classes,
                nav: nav,

                // helpers
                render: render,
                find: find,
                linkto: linkto,
                htmlsafe: htmlsafe
            };

            var filename = "index.html";
            var path = outdir + '/' + filename,
                html = indexTemplate.call(data, data);
=======

            for (var foo in classes) {
                console.log(foo);
            };

            var data = {
                title: title,
                docs: classes
            };

            var path = outdir + '/' + filename,
                html = view.render('index.tmpl', data);
>>>>>>> refs/remotes/origin/jsdoc-update

            html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>

            fs.writeFileSync(path, html)
<<<<<<< HEAD

        }
=======
        }

        function generateTutorial(title, tutorial, filename) {
            var data = {
                title: title,
                header: tutorial.title,
                content: tutorial.parse(),
                children: tutorial.children
            };

            var path = outdir + '/' + filename,
                html = view.render('tutorial.tmpl', data);

            // yes, you can use {@link} in tutorials too!
            html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>

            fs.writeFileSync(path, html)
        }

        // tutorials can have only one parent so there is no risk for loops
        function saveChildren(node) {
            node.children.forEach(function(child) {
                generateTutorial('Tutorial: '+child.title, child, helper.tutorialToUrl(child.name));
                saveChildren(child);
            });
        }
        saveChildren(tutorials);
>>>>>>> refs/remotes/origin/jsdoc-update
    }

    function hashToLink(doclet, hash) {
        if ( !/^(#.+)/.test(hash) ) { return hash; }

        var url = helper.createLink(doclet);

        url = url.replace(/(#.+|$)/, hash);
        return '<a href="'+url+'">'+hash+'</a>';
    }

<<<<<<< HEAD
})();
=======
})();
>>>>>>> refs/remotes/origin/jsdoc-update
