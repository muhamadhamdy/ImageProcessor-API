"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitePath = void 0;
// Create server
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var indexRoute_1 = __importDefault(require("./routes/indexRoute"));
var resizeRoute_1 = __importDefault(require("./routes/resizeRoute"));
var app = (0, express_1.default)();
var port = process.env.imageProccessorPort || 3111;
exports.sitePath = __dirname;
//serve static images in images folder
app.use('/resources/images', express_1.default.static(path_1.default.resolve('../resources/images')));
// Main site page route
app.use('/', indexRoute_1.default);
// Image resizing route
app.use('/resize', resizeRoute_1.default);
// serving at port 3000
app.listen(port, function () {
    console.log("server started at port number:".concat(port, "\n                "));
    //Server local folder : ${sitePath}
});
