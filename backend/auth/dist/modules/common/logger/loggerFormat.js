"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alignColorsAndTime = void 0;
const winston_1 = require("winston");
const colors = require("colors");
const date_fns_1 = require("date-fns");
const alignColorsAndTime = (service, color) => winston_1.format.combine(winston_1.format.printf((info) => colors.green(`[ticket-system] - ${(0, date_fns_1.format)(new Date(), 'yy-MM-dd HH:MM:SS')}\t`) +
    colors[color || 'yellow'](`${info.level.toUpperCase()} [${service}] ${info.message}`)));
exports.alignColorsAndTime = alignColorsAndTime;
//# sourceMappingURL=loggerFormat.js.map