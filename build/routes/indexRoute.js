"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var utilities_1 = __importDefault(require("../components/utilities"));
var indexRoute = (0, express_1.Router)();
indexRoute.get("/", function (req, res) {
    // Laod images names to view
    var arr = utilities_1.default.getfullImagesNames(utilities_1.default.getInputPath());
    //console.log(arr);
    var s = "";
    arr.map(function (e) {
        s += "<li>".concat(e, "</li>");
    });
    var resString = "<h3>IMAGES AVAILABLE ON SEREVER</h3><hr>\n                    <ul>".concat(s, "</ul><hr>\n                    to call resize api use the format<br>\n                    <strong>YOURSERVERNAME/resize?imagename=YOURIMAGENAME.EXT&height=NUMBER&width=NUMBER</strong><br>\n                    <p>for example</p><a href='/resize?imagename=palmtunnel.jpg&height=400&width=400'>mySiteName/resize?imagename=palmtunnel.jpg&height=400&width=400</a>");
    res.status(200);
    res.send(resString);
});
exports.default = indexRoute;
