process.env.NODE_ENV = process.env.NODE_ENV || "development";

require("babel/register"); // babel-core/register for Babel 6
require("./index");
