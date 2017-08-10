/* jshint node: true */
'use strict';

var path = require('path');
var resolve = require('resolve');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var fastbootTransform = require('fastboot-transform');

module.exports = {
  name: 'markdown-code-highlighting',
  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import("vendor/highlightjs/highlight.pack.js");
    app.import("vendor/marked/lib/marked.js");
  },

  treeForVendor: function(tree) {
    var trees = [];
    var highlightjs = fastbootTransform(new Funnel(this.pathBase('highlightjs'), {
      destDir: 'highlightjs'
    }));
    var marked = fastbootTransform(new Funnel(this.pathBase('marked'), {
      destDir: 'marked'
    }));
    trees = trees.concat([highlightjs, marked]);
    if (tree) {
      trees.push(tree);
    }
    return mergeTrees(trees);
  },

  pathBase: function(packageName) {
    return path.dirname(resolve.sync(packageName + '/package.json', {
      basedir: __dirname
    }));
  },
};
