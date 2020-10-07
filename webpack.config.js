var path = require('path');
var config = {
    mode: "development",
    // TODO: Add common Configuration
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    },
};
var contentConfig = Object.assign({}, config, {
    name: "content",
    entry: './Content/js/content.js',
    output: {
        filename: 'content.js',
        path: path.resolve(__dirname, 'Output')
    }
});
var popupConfig = Object.assign({}, config, {
    name: "popup",
    entry: './Popup/js/popup.js',
    output: {
        filename: 'popup.js',
        path: path.resolve(__dirname, 'Output')
    }
});
var backgrConfig = Object.assign({}, config, {
    name: "background",
    entry: './Background/js/background.js',
    output: {
        filename: 'background.js',
        path: path.resolve(__dirname, 'Output')
    }
});

// Return Array of Configurations
module.exports = [
    contentConfig, popupConfig, backgrConfig
];