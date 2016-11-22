let a = 3;

function getUrlParam(type: string){
    return type + 444
}

let deviceType: string = getUrlParam('deviceType');

console.log(deviceType);

import * as _ from "lodash";

console.log(_.each);

import {toExport} from "./tobeImport"

toExport();
