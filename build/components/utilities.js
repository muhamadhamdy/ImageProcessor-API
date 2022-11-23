"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var index_1 = require("../index");
// ======================== Read query parameters ======================
var readParams = function (req) {
    var _a, _b, _c;
    var qParams = { imageName: '', height: 0, width: 0 };
    qParams.imageName = ((_a = req.query.imagename) === null || _a === void 0 ? void 0 : _a.toString()) || '';
    qParams.height = parseInt(((_b = req.query.height) === null || _b === void 0 ? void 0 : _b.toString()) || '0');
    qParams.width = parseInt(((_c = req.query.width) === null || _c === void 0 ? void 0 : _c.toString()) || '0');
    return qParams;
};
// ======================== validate query parameters ======================
var isParamsValid = function (params) {
    if (params.imageName == '') {
        return 'Error reading parameters, please check it again.\n Calls must be in format YOURSERVERNAME/resize?imagename=YOURIMAGENAME.EXT&height=NUMBER&width=NUMBER';
    }
    else if (isNaN(params.height) || isNaN(params.width) || params.height <= 0 || params.width <= 0) {
        return 'Values of height and width must be a positive number over 0.';
    }
    return 'OK';
};
// ======================== Check if file exists ======================
var fileExists = function (imageName, filePath) { return __awaiter(void 0, void 0, void 0, function () {
    var fPath;
    return __generator(this, function (_a) {
        fPath = path_1.default.join(filePath, imageName).normalize();
        return [2 /*return*/, fs_1.default.promises.access(fPath, fs_1.default.constants.F_OK)
                .then(function () { return true; })
                .catch(function () { return false; })];
    });
}); };
// ======================= Get input folder path ======================
var getInputPath = function () {
    var folderPath = path_1.default.resolve(index_1.sitePath, '../resources/images/full');
    return folderPath;
};
// ======================= Get output folder path =====================
var getOutputPath = function () {
    var folderPath = path_1.default.resolve(index_1.sitePath, '../resources/images/thumbnail');
    return folderPath;
};
// ====================== Get thumbnail file name =====================
var getThumbnailName = function (params) {
    var strFileName = params.imageName.split('.');
    return strFileName[0].concat('_', params.height.toString(), '_', params.width.toString(), '.', strFileName[1]);
};
// ===================== Get full images filenames ====================
var getfullImagesNames = function (imagesPath) {
    try {
        return fs_1.default.readdirSync(imagesPath);
    }
    catch (_a) {
        return [];
    }
};
exports.default = {
    readParams: readParams,
    isParamsValid: isParamsValid,
    fileExists: fileExists,
    getInputPath: getInputPath,
    getOutputPath: getOutputPath,
    getThumbnailName: getThumbnailName,
    getfullImagesNames: getfullImagesNames
};
