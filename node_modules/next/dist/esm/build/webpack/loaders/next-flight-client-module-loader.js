import { getRSCModuleInformation } from "../../analysis/get-page-static-info";
import { getModuleBuildInfo, extractCjsExports } from "./get-module-build-info";
export default async function transformSource(source, sourceMap) {
    var _buildInfo_rsc;
    // Avoid buffer to be consumed
    if (typeof source !== "string") {
        throw new Error("Expected source to have been transformed to a string.");
    }
    const callback = this.async();
    // Assign the RSC meta information to buildInfo.
    const buildInfo = getModuleBuildInfo(this._module);
    buildInfo.rsc = getRSCModuleInformation(source, false);
    if (buildInfo.rsc.isClientRef) {
        const exportNames = extractCjsExports(source);
        if (exportNames) buildInfo.rsc.clientRefs = exportNames;
    }
    // This is a server action entry module in the client layer. We need to attach
    // noop exports of `callServer` wrappers for each action.
    if ((_buildInfo_rsc = buildInfo.rsc) == null ? void 0 : _buildInfo_rsc.actions) {
        source = `
import { callServer } from 'next/dist/client/app-call-server'

function __build_action__(action, args) {
  return callServer(action.$$id, args)
}

${source}
`;
    }
    return callback(null, source, sourceMap);
}

//# sourceMappingURL=next-flight-client-module-loader.js.map