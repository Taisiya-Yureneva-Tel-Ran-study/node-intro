import Logger, { isValidLogLevel, LogLevelString } from "./Logger.ts";
import config from "config";
import fs from "node:fs";

const LOG_LEVEL_PARAM = "log_level";

function getConfigParam(paramName: string) {
    if (!config.hasOwnProperty(paramName)) {
        throw new Error(`Config param '${paramName}' is not defined.`);
    }
    return config[paramName];
}

let minLogLevel = "info" as LogLevelString;

try {
    minLogLevel = getConfigParam(LOG_LEVEL_PARAM);
    if (!isValidLogLevel( minLogLevel)) {
        throw new Error(`Invalid log level '${minLogLevel}' in config.`);
    }
} catch (e) {
    console.log(e.message, "Using default log level 'info'");
    minLogLevel = "info";
}

const logger = new Logger(minLogLevel);

logger.addHandlerMessage((obj) => console.log(obj.message));
logger.addHandler("info", (message) => fs.writeFileSync("log.log", message + "\n", {"flag": "a"}))

logger.log("debug", "string");
logger.log("severe", "severe string");
logger.log("warn", "warn string");
logger.log("info", "info string");