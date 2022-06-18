"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getId = void 0;
function getId(query) {
    if (query === "undefined" || query === "null") {
        return null;
    }
    return query && typeof query === "object"
        ? query.id
            ? query.id
            : null
        : query;
}
exports.getId = getId;
