const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        }
                    },
                    {
                        loader: "css-loader",
                        options: { url: false, sourceMap: true}
                    }
                    , {
                        loader: "sass-loader",
                        options: {sourceMap: true}
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                loader: 'file-loader',
                options: {outputPath: 'assets/images', publicPath: '../images', useRelativePaths: true}
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                loader: 'file-loader',
                options: {outputPath: 'assets/fonts', publicPath: '../fonts', useRelativePaths: true}
            },
            {
                test: /\.hbs/,
                loader: 'handlebars-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.hbs$/,
                use: ['handlebars-template-loader'],
            },

        ]
    },
        plugins: [
            new MiniCssExtractPlugin(),
            new HandlebarsPlugin({
                // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
                entry: path.join(process.cwd(),  "src/html", "*.hbs"),
                // output path and filename(s). This should lie within the webpacks output-folder
                // if ommited, the input filepath stripped of its extension will be used
                output: path.join(process.cwd(), "dist", "[name].html"),
                // you can also add a [path] variable, which will emit the files with their relative path, like
                // output: path.join(process.cwd(), "build", [path], "[name].html"),
                //
                // // data passed to main hbs template: `main-template(data)`
                // data: require("./app/data/project.json"),
                // // or add it as filepath to rebuild data on change using webpack-dev-server
                // data: path.join(__dirname, "app/data/project.json"),

                // globbed path to partials, where folder/filename is unique
                partials: [
                    path.join(process.cwd(),  "src/html", "components", "*", "*.hbs")
                ],

                // register custom helpers. May be either a function or a glob-pattern
                helpers: {
                    nameOfHbsHelper: Function.prototype,
                    projectHelpers: path.join(process.cwd(),  "helpers", "*.helper.js")
                },

                // hooks
                // getTargetFilepath: function (filepath, outputTemplate) {},
                // getPartialId: function (filePath) {}
                onBeforeSetup: function (Handlebars) {},
                onBeforeAddPartials: function (Handlebars, partialsMap) {},
                onBeforeCompile: function (Handlebars, templateContent) {},
                onBeforeRender: function (Handlebars, data, filename) {},
                onBeforeSave: function (Handlebars, resultHtml, filename) {},
                onDone: function (Handlebars, filename) {}
            }),
            new HtmlWebpackPlugin(),
        ]
};
