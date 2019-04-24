"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageValidator = /** @class */ (function () {
    function ImageValidator() {
    }
    ImageValidator.validFile = function (fc) {
        var fileName = fc.value;
        var fileExtention = fileName.substr(fileName.length - 4);
        if (fileExtention === '.jpg') {
            return (null);
        }
        else {
            return ({ notvalidfile: true });
        }
    };
    return ImageValidator;
}());
exports.ImageValidator = ImageValidator;
//# sourceMappingURL=ImageValidator.js.map