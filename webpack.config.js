console.log(11);
var path                        =   require('path');

var config                      =   {
    entry:                          "./public/app.js",
    target:                         "node",
    output:                         {
        path:                       path.resolve(__dirname, 'dist'),
        filename:                   'bundle.js'
    },
    mode:                           'development'
};

module.exports                  =   config;