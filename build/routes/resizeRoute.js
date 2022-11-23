"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var imageProc_1 = __importDefault(require("../components/imageProc"));
var utilities_1 = __importDefault(require("../components/utilities"));
var resizeRoute = (0, express_1.Router)();
resizeRoute.get("/", function (req, res) {
    //if (Object.keys(req.query).length<3){return}
    var params = utilities_1.default.readParams(req);
    (0, imageProc_1.default)(params).then(function (rtn) {
        if (rtn.completed) {
            res.status(rtn.statusCode || 200).sendFile(rtn.message || '');
        }
        else {
            res.status(rtn.statusCode || 404).send(rtn.message);
        }
    });
});
exports.default = resizeRoute;
