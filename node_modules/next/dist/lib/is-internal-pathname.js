"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isInternalPathname", {
    enumerable: true,
    get: function() {
        return isInternalPathname;
    }
});
function isInternalPathname(pathname) {
    return pathname.startsWith("next/dist/pages/");
}

//# sourceMappingURL=is-internal-pathname.js.map