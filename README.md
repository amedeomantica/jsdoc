JSDoc 3 for Montage and Screening
=======

This is a fork of JSDoc 3, an API documentation generator, to support Montage and Screening products. 

Installation
------------


1. Change directory to your /montage source tree folder.
2. Clone JSDoc from GitHub:

    git clone git@github.com:Motorola-Mobility/jsdoc.git

3. Run the following command:

    jsdoc/jsdoc -t tetsubo -r core/ ui/ data/

Any errors will be reported in the terminal. No console output means the build succeeded.

If you want to verify the actual output of your JSDoc comments, open the ```montage/out``` folder, where the generated files are put by default, and open index.html in a browser.


Dependencies
------------

JSDoc 3 utilises the Mozilla Rhino engine, which requires Java. JSDoc 3 is known
to work with version 1.6.0_24 of Java.

JSDoc 3 uses advanced features in the Rhino application which are only
available in or after the 1.7 release 3. A copy of this version of Rhino is
included in JSDoc so this is not normally an issue that the user needs to be
concerned with. However, in rare cases, users may have their Java CLASSPATH
configured to override that included Rhino and point to some older version of
Rhino instead. If this is the case, simply correct the CLASSPATH to remove the
older Rhino.

Debugging
---------

Rhino is not always very friendly when it comes to reporting errors in
JavaScript. Luckily it comes with a full-on debugger included that can be much
more useful than a simple stack trace. To invoke JSDoc with the debugger do the following:

1. Open the `jsdoc/jsdoc` script in a text editor.
2. Comment the first `java` command string (which launches the standard JSDoc utility), and uncomment the second one:

```
#!/bin/sh

# rhino discards the path to the current script file, so we must add it back
BASEDIR=`dirname $0`
#java -classpath ${BASEDIR}/lib/js.jar org.mozilla.javascript.tools.shell.Main -modules ${BASEDIR}/node_modules -modules ${BASEDIR}/rhino_modules -modules ${BASEDIR} ${BASEDIR}/jsdoc.js --dirname=${BASEDIR} $@

java -classpath ${BASEDIR}/lib/js.jar org.mozilla.javascript.tools.debugger.Main -debug -modules ${BASEDIR}/node_modules -modules ${BASEDIR}/rhino_modules  -modules ${BASEDIR} ${BASEDIR}/jsdoc.js --dirname=${BASEDIR} $@
```

3. Run ```jsdoc``` from the terminal again.

This will open a debugging window. Choose "Break on Exceptions" from the "Debug" menu, then press the "Run" button. If there is an error, you should see exactly
where it is in the source code.

See Also
--------

Project Documentation: <http://usejsdoc.org/> (under development)  
Project Documentation Source: <https://github.com/micmath/micmath.github.com>  
JSDoc User's Group: <http://groups.google.com/group/jsdoc-users>  
Subversion Mirror: <http://code.google.com/p/jsdoc/source>  
Project Annoncements: <http://twitter.com/jsdoc3>

License
-------

JSDoc 3 is copyright (c) 2011 Michael Mathews <micmath@gmail.com>

See file "LICENSE.md" in this distribution for more details about
terms of use.