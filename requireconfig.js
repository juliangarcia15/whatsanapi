// currently running a-okay as of Aug 13, 2016

require.config({
    shim : {
        'jquery': {
            exports: "$",
            init: function(){
                return this.$.noConflict();
            }
        },
        'bootstrap' : { "deps" :['jquery'] },
        'underscore': {
            exports: "_"
        },
    },
    // the root path to use for all module lookups
    baseUrl: 'scripts',
    // path mappings for module names not found directly under baseUrl
    paths: {
        // Requirejs plugins
        'tpl':          "_lib/requirejs-tpl/tpl",
        'text':         "_lib/text-master/text",
        'css':          "https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.8/css",

        // Util Libraries
        'jquery':       "_lib/jquery-1.12.4.min",//"https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min",// "_lib/jquery-1.12.4.min", // bootstrap currently needs 1.9.1 - 2
        'underscore':   "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
        'bootstrap':    "_lib/bootstrap-3.3.6/js/bootstrap.min",//"//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min",

        'Backbone':     "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min",
        'Mustache':     "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.2.1/mustache.min",
        'jstree':       "_lib/jstree/dist/jstree",

        // Simplified project paths aka aliases
        'templates':    "views/templates",
        'styles':       "views/styles"
    }
});

define([// Load our app module and pass it to our definition function
    'require',
    'app',
    'jquery',
    'bootstrap'
], function(require, App, $){
    function loadCss(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }


    // The "app" dependency is passed in as "App"
    $(document).ready(function(){
        loadCss('scripts/app.css');

        var a = new App();
        $('[data-toggle="tooltip"]').tooltip();
    });
});
