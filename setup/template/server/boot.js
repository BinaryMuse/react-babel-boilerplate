process.env.NODE_ENV = process.env.NODE_ENV || "development";

require("babel-polyfill");
require("babel-register");
require("./index");
