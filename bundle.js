/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var transmutation_1 = __webpack_require__(6);
exports.Transmutation = transmutation_1.Transmutation;
var glyph_1 = __webpack_require__(7);
exports.Glyph = glyph_1.Glyph;
var alphabet_1 = __webpack_require__(9);
exports.Alphabet = alphabet_1.Alphabet;
var random_1 = __webpack_require__(10);
exports.Random = random_1.Random;
var config_1 = __webpack_require__(11);
exports.Config = config_1.Config;
exports.RandomConfig = config_1.RandomConfig;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * Immutable
 */
var Vector = /** @class */ (function () {
    function Vector(_x, _y) {
        this._x = _x;
        this._y = _y;
    }
    Vector.prototype.add = function (otherVector) {
        return new Vector(this._x + otherVector._x, this._y + otherVector._y);
    };
    Vector.prototype.subtract = function (otherVector) {
        return new Vector(this._x - otherVector._x, this._y - otherVector._y);
    };
    Vector.prototype.x = function () {
        return this._x;
    };
    Vector.prototype.y = function () {
        return this._y;
    };
    /**
     * Scale the vector's coordinates by some amount
     * @param amount what we want to multiply the vector by
     */
    Vector.prototype.scale = function (amount) {
        return new Vector(this._x * amount, this._y * amount);
    };
    /**
     * Determines how far two points are from one another.
     * @param otherPoint The point we're going to see how far away we're from
     */
    Vector.prototype.dist = function (otherPoint) {
        return Math.abs(Math.sqrt(Math.pow(otherPoint._x - this._x, 2) +
            Math.pow(otherPoint._y - this._y, 2)));
    };
    Vector.prototype.midpoint = function (otherPoint) {
        return new Vector((otherPoint._x + this._x) / 2, (otherPoint._y + this._y) / 2);
    };
    Vector.prototype.normal = function () {
        return this.scale(1.0 / this.magnitude());
    };
    Vector.prototype.magnitude = function () {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    };
    Vector.random = function (seed) {
        return new Vector(seed.nextFloat(), seed.nextFloat());
    };
    Vector.one = function () {
        return new Vector(1.0, 1.0);
    };
    Vector.fromAngle = function (angle) {
        return new Vector(Math.cos(angle), Math.sin(angle));
    };
    return Vector;
}());
exports.Vector = Vector;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var BorderType;
(function (BorderType) {
    BorderType[BorderType["Line"] = 0] = "Line";
    BorderType[BorderType["Text"] = 1] = "Text";
})(BorderType || (BorderType = {}));
exports.BorderType = BorderType;
var BorderConfig = /** @class */ (function () {
    function BorderConfig(borders) {
        this.borders = borders;
    }
    BorderConfig.prototype.GetBorderTypes = function () {
        return this.borders;
    };
    BorderConfig.prototype.Shorthand = function () {
        return this.borders
            .map(function (type) { return (type === BorderType.Line ? "L" : "T"); })
            .reduce(function (previous, current) {
            return previous + current;
        });
    };
    return BorderConfig;
}());
exports.BorderConfig = BorderConfig;
function RandomBorderConfig(random) {
    var circles = random.nextFloat() * 3 + 2;
    var borders = new Array();
    for (var c = 0; c < circles; c++) {
        borders[c] = random.nextFloat() >= 0.5 ? BorderType.Text : BorderType.Line;
    }
    return new BorderConfig(borders);
}
exports.RandomBorderConfig = RandomBorderConfig;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var PolygonConfig = /** @class */ (function () {
    function PolygonConfig(sides, circles, arcs) {
        this.sides = sides;
        this.circles = circles;
        this.arcs = arcs;
    }
    PolygonConfig.prototype.Sides = function () {
        return this.sides;
    };
    PolygonConfig.prototype.Circles = function () {
        return this.circles;
    };
    PolygonConfig.prototype.Arcs = function () {
        return this.arcs;
    };
    PolygonConfig.prototype.Shorthand = function () {
        return this.sides + (this.circles ? "T" : "F") + (this.arcs ? "T" : "F");
    };
    return PolygonConfig;
}());
exports.PolygonConfig = PolygonConfig;
function RandomPolygonConfig(random) {
    return new PolygonConfig(3 + Math.round(random.nextFloat() * 5), random.nextFloat() >= 0.5, random.nextFloat() >= 0.5);
}
exports.RandomPolygonConfig = RandomPolygonConfig;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://www.deviantart.com/notshurly/art/Transmutation-Circle-Tutorial-158371530
exports.__esModule = true;
var src_1 = __webpack_require__(0);
var borderconfig_1 = __webpack_require__(2);
var PolygonConfig_1 = __webpack_require__(3);
var sentenceToWrite = "My first name is a random set of numbers and letters \
And other alphanumerics that changes hourly forever";
var seed = Math.round(Math.random() * 2147483647);
var random = new src_1.Random(seed);
var canvas = document.getElementById("Transmutation");
var transmutationConfig = src_1.RandomConfig(sentenceToWrite, random);
var transmutation = new src_1.Transmutation(canvas, transmutationConfig);
var resizeWindow = function () {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    transmutation.Draw(canvas.width, canvas.height, new Date().getTime() / 10000);
    window.requestAnimationFrame(resizeWindow);
};
window.requestAnimationFrame(resizeWindow);
var $ = function (id) {
    return document.getElementById(id);
};
var SetWindowVariables = function (config, sentence, seed) {
    $("text-to-inscribe").innerText = sentence;
    $("seed").value = seed;
    $("outer-border").value = config.GetBorderConfig().Shorthand();
    $("inner-border").value = config.GetInnerBoarderConfig().Shorthand();
    $("polygons").value = config
        .GetPolygonConfigs()
        .map(function (x) { return x.Shorthand(); })
        .reduce(function (p, c) { return p + c; });
    if (config.GetInnerPolygonConfig() !== null) {
        $("inner-polygon-sides").value = config.GetInnerPolygonConfig().Sides();
        $("inner-polygon-circles").checked = config.GetInnerPolygonConfig().Circles();
        $("inner-polygon-arcs").checked = config.GetInnerPolygonConfig().Arcs();
    }
    else {
        $("inner-polygon-sides").value = 0;
    }
};
SetWindowVariables(transmutationConfig, sentenceToWrite, seed);
$("random-circle").onclick = function () {
    var newSeed = Math.round(Math.random() * 2147483647);
    var newConfig = src_1.RandomConfig(sentenceToWrite, new src_1.Random(newSeed));
    transmutation.SetConfig(newConfig);
    SetWindowVariables(newConfig, sentenceToWrite, newSeed);
};
var borderFromString = function (input) {
    var out = new Array();
    for (var i = 0; i < input.length; i++) {
        if (input.charAt(i) === "L") {
            out.push(borderconfig_1.BorderType.Line);
        }
        else if (input.charAt(i) === "T") {
            out.push(borderconfig_1.BorderType.Text);
        }
    }
    return new borderconfig_1.BorderConfig(out);
};
var polygonFromString = function (input) {
    var sides = parseInt(input.charAt(0));
    var circles = input.charAt(1) === "T" ? true : false;
    var arcs = input.charAt(2) === "T" ? true : false;
    if (isNaN(sides)) {
    }
    else if (sides <= 2) {
    }
    return new PolygonConfig_1.PolygonConfig(sides, circles, arcs);
};
var polygonsFromString = function (input) {
    var output = new Array();
    var remainingInput = input.toUpperCase();
    while (remainingInput.length >= 3) {
        output.push(polygonFromString(remainingInput));
        remainingInput = remainingInput.substr(3);
    }
    return output;
};
var buildCircleFromForm = function () {
    var newSeed = $("seed").value;
    sentenceToWrite = $("text-to-inscribe").value;
    var outerBorder = borderFromString($("outer-border").value.toUpperCase());
    var innerBorder = borderFromString($("inner-border").value.toUpperCase());
    var polygons = polygonsFromString($("polygons").value);
    var innerPolygon = null;
    if ($("inner-polygon-sides").value > 2) {
        innerPolygon = new PolygonConfig_1.PolygonConfig($("inner-polygon-sides").value, $("inner-polygon-circles").checked, $("inner-polygon-arcs").checked);
    }
    var newConfig = new src_1.Config(new src_1.Alphabet(new src_1.Random(newSeed)), sentenceToWrite, outerBorder, polygons, innerBorder, innerPolygon);
    transmutation.SetConfig(newConfig);
};
$("text-to-inscribe").oninput = buildCircleFromForm;
$("seed").oninput = buildCircleFromForm;
$("inner-border").oninput = buildCircleFromForm;
$("outer-border").oninput = buildCircleFromForm;
$("polygons").oninput = buildCircleFromForm;
$("inner-polygon-sides").oninput = buildCircleFromForm;
$("inner-polygon-circles").oninput = buildCircleFromForm;
$("inner-polygon-arcs").oninput = buildCircleFromForm;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var vector_1 = __webpack_require__(1);
var borderconfig_1 = __webpack_require__(2);
var Transmutation = /** @class */ (function () {
    function Transmutation(canvas, config) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.background = "black";
        this.line = "red";
        this.characterOn = 0;
        this.config = config;
    }
    Transmutation.prototype.SetConfig = function (config) {
        this.config = config;
    };
    Transmutation.prototype.DrawMiddle = function (maxRadius, middleCords, config, rotation) {
        var apothem = maxRadius * Math.cos(Math.PI / config.Sides());
        this.Polygon(middleCords, maxRadius, config.Sides() * 2, rotation + Math.PI / 2);
        this.Polygon(middleCords, maxRadius, config.Sides(), rotation + Math.PI / 2);
        this.PolyVertexIntersections(middleCords, maxRadius, config.Sides() * 2, rotation + (Math.PI / 2 + Math.PI / config.Sides()) // One thing to scramble
        );
        if (config.Arcs()) {
            this.PolyMidpointArcs(middleCords, maxRadius, config.Sides() * 2, rotation + (Math.PI / 2 + Math.PI / config.Sides()), maxRadius / 3);
            this.PolyMidpointArcs(middleCords, maxRadius, config.Sides() * 2, rotation + (Math.PI / 2 + Math.PI / config.Sides()), maxRadius / 3.5);
        }
        var midpointCircleRadius = maxRadius / 8;
        if (config.Circles()) {
            this.PolyMidpointCircles(middleCords, apothem, config.Sides(), rotation + (Math.PI / 2 + Math.PI / config.Sides()), midpointCircleRadius);
        }
        return (apothem - midpointCircleRadius) * 0.9;
    };
    Transmutation.prototype.DrawBorder = function (maxRadius, middleCords, border, rotation) {
        var _this = this;
        var remainingRadius = 1;
        var direction = 1;
        border.GetBorderTypes().forEach(function (type) {
            switch (type) {
                case borderconfig_1.BorderType.Line:
                    _this.Circle(middleCords, maxRadius * remainingRadius);
                    break;
                case borderconfig_1.BorderType.Text:
                    _this.CircleText(middleCords, maxRadius * remainingRadius, (maxRadius * remainingRadius) / 20, rotation * direction);
                    direction *= -1;
                    break;
            }
            remainingRadius -= 0.05;
        });
        return maxRadius * remainingRadius;
    };
    Transmutation.prototype.Draw = function (width, height, rotation) {
        var _this = this;
        this.characterOn = 0;
        this.Start();
        var direction = 1;
        var middleCords = new vector_1.Vector(width / 2, height / 2);
        var maxRadius = this.DrawBorder(Math.min(width, height) * 0.48, middleCords, this.config.GetBorderConfig(), rotation * direction);
        direction *=
            this.config.GetBorderConfig().GetBorderTypes().length % 2 === 0 ? 1 : -1;
        this.config.GetPolygonConfigs().forEach(function (polyConfig) {
            maxRadius = _this.DrawMiddle(maxRadius, middleCords, polyConfig, rotation * direction);
            direction *= -1;
        });
        this.ctx.beginPath();
        this.ctx.arc(middleCords.x(), middleCords.y(), maxRadius, 0, 2 * Math.PI);
        this.ctx.fill();
        maxRadius = this.DrawBorder(maxRadius, middleCords, this.config.GetInnerBoarderConfig(), rotation * direction);
        direction *=
            this.config.GetInnerBoarderConfig().GetBorderTypes().length % 2 === 0
                ? 1
                : -1;
        if (this.config.GetInnerPolygonConfig() != null) {
            this.DrawMiddle(maxRadius, middleCords, this.config.GetInnerPolygonConfig(), rotation * direction * -1);
        }
    };
    Transmutation.prototype.Start = function () {
        this.ctx.fillStyle = this.background;
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
    };
    Transmutation.prototype.Polygon = function (pos, radius, sides, rotation) {
        this.ctx.strokeStyle = this.line;
        this.ctx.beginPath();
        var angleIncrement = (Math.PI * 2) / sides;
        for (var vertex = 0; vertex < sides; vertex++) {
            this.ctx.lineTo(pos.x() + radius * Math.cos(rotation + angleIncrement * vertex), pos.y() + radius * Math.sin(rotation + angleIncrement * vertex));
        }
        this.ctx.closePath();
        this.ctx.stroke();
    };
    Transmutation.prototype.PolyMidpointCircles = function (pos, radius, sides, rotation, circleRadius) {
        var angleIncrement = (Math.PI * 2) / sides;
        for (var vertex = 0; vertex < sides; vertex++) {
            this.ctx.strokeStyle = this.line;
            this.ctx.fillStyle = this.background;
            var angle = rotation + angleIncrement * vertex;
            var adjustedPos = vector_1.Vector.fromAngle(angle)
                .scale(radius)
                .add(pos);
            this.ctx.beginPath();
            this.ctx.arc(adjustedPos.x(), adjustedPos.y(), circleRadius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
            this.SpecialSymbol(adjustedPos, circleRadius, angle);
        }
    };
    Transmutation.prototype.PolyVertexIntersections = function (pos, radius, sides, rotation) {
        this.ctx.strokeStyle = this.line;
        var angleIncrement = (Math.PI * 2) / sides;
        for (var vertex = 0; vertex < sides; vertex++) {
            this.ctx.beginPath();
            this.ctx.moveTo(pos.x(), pos.y());
            this.ctx.lineTo(pos.x() + radius * Math.cos(rotation + angleIncrement * vertex), pos.y() + radius * Math.sin(rotation + angleIncrement * vertex));
            this.ctx.stroke();
        }
    };
    Transmutation.prototype.NextSymbol = function (pos, size, angle) {
        var g = this.config
            .GetAlphabet()
            .Glyph(this.config.GetSentence().charAt(this.characterOn));
        if (g !== null) {
            g.Draw(this.ctx, pos, vector_1.Vector.one().scale(size), angle, this.line);
        }
        this.characterOn =
            (this.characterOn + 1) % this.config.GetSentence().length;
    };
    Transmutation.prototype.SpecialSymbol = function (pos, size, angle) {
        // new Glyph(this.random).Draw(
        //   this.ctx,
        //   pos,
        //   Vector.one().scale(size),
        //   angle,
        //   this.line
        // );
    };
    Transmutation.prototype.CircleText = function (pos, radius, fontSize, rotation) {
        var letters = (radius / fontSize) * 4;
        var angle = (Math.PI * 2) / letters;
        for (var i = 0; i < letters; i++) {
            var curAngle = angle * i + rotation;
            this.NextSymbol(pos.add(vector_1.Vector.fromAngle(curAngle).scale(radius)), fontSize, curAngle);
        }
    };
    Transmutation.prototype.Circle = function (pos, radius) {
        this.ctx.strokeStyle = this.line;
        this.ctx.beginPath();
        this.ctx.arc(pos.x(), pos.y(), radius, 0, Math.PI * 2);
        this.ctx.stroke();
    };
    Transmutation.prototype.ThreePointArc = function (initial, median, final) {
        var control = median
            .scale(2)
            .subtract(initial.scale(0.5))
            .subtract(final.scale(0.5));
        this.ctx.beginPath();
        this.ctx.moveTo(initial.x(), initial.y());
        this.ctx.quadraticCurveTo(control.x(), control.y(), final.x(), final.y());
        this.ctx.stroke();
    };
    Transmutation.prototype.PolyMidpointArcs = function (pos, radius, sides, rotation, arcRadius) {
        this.ctx.strokeStyle = this.line;
        this.ctx.fillStyle = this.background;
        var angleIncrement = (Math.PI * 2) / sides;
        for (var vertex = 2; vertex <= sides; vertex += 2) {
            var pointOne = new vector_1.Vector(pos.x() + radius * Math.cos(rotation + angleIncrement * (vertex - 2)), pos.y() + radius * Math.sin(rotation + angleIncrement * (vertex - 2)));
            var pointTwo = new vector_1.Vector(pos.x() + radius * Math.cos(rotation + angleIncrement * (vertex - 1)), pos.y() + radius * Math.sin(rotation + angleIncrement * (vertex - 1)));
            var pointThree = new vector_1.Vector(pos.x() + radius * Math.cos(rotation + angleIncrement * vertex), pos.y() + radius * Math.sin(rotation + angleIncrement * vertex));
            var arcPointOne = pointTwo.add(pointOne
                .subtract(pointTwo)
                .normal()
                .scale(arcRadius));
            var arcPointTwo = pointTwo.add(pointThree
                .subtract(pointTwo)
                .normal()
                .scale(arcRadius));
            var arcPointMidpoint = pointTwo.add(pos
                .subtract(pointTwo)
                .normal()
                .scale(arcRadius));
            this.ThreePointArc(arcPointOne, arcPointMidpoint, arcPointTwo);
        }
    };
    return Transmutation;
}());
exports.Transmutation = Transmutation;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var vector_1 = __webpack_require__(1);
var stroke_1 = __webpack_require__(8);
/**
 * I have found some alphabet dimensions to be ~4 units in height and ~units in
 * width
 */
var Glyph = /** @class */ (function () {
    function Glyph(random) {
        this.random = random;
        do {
            this.strokes = this.generateStrokes(this.random);
        } while (this.validStrokes(this.strokes) == false);
    }
    Glyph.prototype.validStrokes = function (strokes) {
        return strokes.length > 4;
    };
    Glyph.prototype.generateStrokes = function (random) {
        var _this = this;
        var probabilies = [
            [3 / 4, 2 / 3, 3 / 4],
            [2 / 3, 3 / 4, 2 / 3],
            [3 / 4, 2 / 3, 3 / 4]
        ];
        // Pick random points
        var chosenPoints = new Array();
        probabilies.forEach(function (row, rowIndex) {
            row.forEach(function (entry, entryIndex) {
                if (_this.random.nextFloat() > entry) {
                    chosenPoints.push(new vector_1.Vector(entryIndex, rowIndex).add(vector_1.Vector.random(_this.random).scale(0.2)));
                }
            });
        });
        // Build strokes
        var pointsAdded = new Array();
        var strokes = new Array();
        for (var pointIndex = 0; pointIndex < chosenPoints.length; pointIndex++) {
            for (var otherPointsIndex = pointIndex + 1; otherPointsIndex < chosenPoints.length; otherPointsIndex++) {
                var dist = chosenPoints[pointIndex].dist(chosenPoints[otherPointsIndex]);
                if (dist > 0.9 && this.random.nextFloat() > dist - 0.5) {
                    strokes.push(new stroke_1.Stroke(chosenPoints[pointIndex].scale(0.5), chosenPoints[otherPointsIndex].scale(0.5)));
                    if (pointsAdded.indexOf(pointIndex) == -1) {
                        pointsAdded.push(pointIndex);
                    }
                    if (pointsAdded.indexOf(otherPointsIndex) == -1) {
                        pointsAdded.push(otherPointsIndex);
                    }
                }
            }
        }
        for (var pointIndex = 0; pointIndex < chosenPoints.length; pointIndex++) {
            if (pointsAdded.indexOf(pointIndex) === -1 &&
                this.random.nextFloat() > 0.8) {
                strokes.push(new stroke_1.Stroke(chosenPoints[pointIndex].scale(0.5), chosenPoints[pointIndex].scale(0.55)));
                break;
            }
        }
        return strokes;
    };
    Glyph.prototype.Draw = function (ctx, center, dimensions, rotation, strokeStyle) {
        ctx.strokeStyle = strokeStyle;
        this.strokes.forEach(function (stroke) {
            stroke.Draw(ctx, center, dimensions, rotation);
        });
    };
    return Glyph;
}());
exports.Glyph = Glyph;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var vector_1 = __webpack_require__(1);
/**
 * I have found some alphabet dimensions to be ~4 units in height and ~units in
 * width
 */
var Stroke = /** @class */ (function () {
    function Stroke(start, end) {
        this.start = start;
        this.end = end;
    }
    Stroke.prototype.Draw = function (ctx, center, dimensions, rotation) {
        var halfOne = vector_1.Vector.one().scale(0.5);
        var reAdjust = center.subtract(dimensions.scale(0.5));
        var startCentered = this.start.subtract(halfOne);
        var originalStartAngle = Math.atan2(startCentered.y(), startCentered.x());
        var scaledStart = new vector_1.Vector(startCentered.magnitude() * Math.cos(rotation + originalStartAngle), startCentered.magnitude() * Math.sin(rotation + originalStartAngle)).add(halfOne);
        scaledStart = new vector_1.Vector(scaledStart.x() * dimensions.x(), scaledStart.y() * dimensions.y()).add(reAdjust);
        var endCentered = this.end.subtract(halfOne);
        var originalEndAngle = Math.atan2(endCentered.y(), endCentered.x());
        var scaledEnd = new vector_1.Vector(endCentered.magnitude() * Math.cos(rotation + originalEndAngle), endCentered.magnitude() * Math.sin(rotation + originalEndAngle)).add(halfOne);
        scaledEnd = new vector_1.Vector(scaledEnd.x() * dimensions.x(), scaledEnd.y() * dimensions.y()).add(reAdjust);
        //const temp = ctx.lineWidth;
        //ctx.lineWidth = dimensions.magnitude() / 20;
        ctx.beginPath();
        ctx.lineTo(scaledStart.x(), scaledStart.y());
        ctx.lineTo(scaledEnd.x(), scaledEnd.y());
        ctx.closePath();
        ctx.stroke();
        //ctx.lineWidth = temp;
    };
    return Stroke;
}());
exports.Stroke = Stroke;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _1 = __webpack_require__(0);
var numberOfLettersInAlphabet = 26;
var Alphabet = /** @class */ (function () {
    function Alphabet(random) {
        this.glyphs = {};
        for (var currentLetter = 0; currentLetter < numberOfLettersInAlphabet; currentLetter++) {
            this.glyphs[String.fromCharCode(65 + currentLetter)] = new _1.Glyph(random);
        }
    }
    /**
     * Glyph
     */
    Alphabet.prototype.Glyph = function (letter) {
        if (letter.toUpperCase() in this.glyphs) {
            return this.glyphs[letter.toUpperCase()];
        }
        return null;
    };
    return Alphabet;
}());
exports.Alphabet = Alphabet;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Random = /** @class */ (function () {
    function Random(seed) {
        this.seed = seed % 2147483647;
        if (this.seed <= 0) {
            this.seed += 2147483646;
        }
    }
    Random.prototype.next = function () {
        return (this.seed = (this.seed * 16807) % 2147483647);
    };
    Random.prototype.nextFloat = function () {
        return (this.next() - 1) / 2147483646;
    };
    return Random;
}());
exports.Random = Random;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var borderconfig_1 = __webpack_require__(2);
var _1 = __webpack_require__(0);
var PolygonConfig_1 = __webpack_require__(3);
var Config = /** @class */ (function () {
    function Config(alphabet, sentence, borderConfig, polgonConfigs, innerBoarderConfig, innerPolygonConfig) {
        this.alphabet = alphabet;
        this.sentence = sentence;
        this.borderConfig = borderConfig;
        this.polgonConfigs = polgonConfigs;
        this.innerBoarderConfig = innerBoarderConfig;
        this.innerPolygonConfig = innerPolygonConfig;
    }
    Config.prototype.GetSentence = function () {
        return this.sentence.replace(/\s+/g, "");
    };
    Config.prototype.GetBorderConfig = function () {
        return this.borderConfig;
    };
    Config.prototype.GetInnerBoarderConfig = function () {
        return this.innerBoarderConfig;
    };
    Config.prototype.GetAlphabet = function () {
        return this.alphabet;
    };
    Config.prototype.GetPolygonConfigs = function () {
        return this.polgonConfigs;
    };
    Config.prototype.GetInnerPolygonConfig = function () {
        return this.innerPolygonConfig;
    };
    return Config;
}());
exports.Config = Config;
function RandomConfig(sentence, random) {
    var numPolys = 1 + Math.round(random.nextFloat() * 2);
    var polys = new Array(numPolys);
    for (var p = 0; p < numPolys; p++) {
        polys[p] = PolygonConfig_1.RandomPolygonConfig(random);
    }
    return new Config(new _1.Alphabet(random), sentence, borderconfig_1.RandomBorderConfig(random), polys, borderconfig_1.RandomBorderConfig(random), random.nextFloat() > 0.5
        ? null
        : new PolygonConfig_1.PolygonConfig(3 + Math.round(random.nextFloat() * 3), random.nextFloat() >= 0.5, random.nextFloat() >= 0.5));
}
exports.RandomConfig = RandomConfig;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map