import EventEmitter from "events";

enum LogLevel {
    severe,
    warn,
    info,
    debug
};

export type LogLevelString = "severe" | "warn" | "info" | "debug";

export function isValidLogLevel(level: LogLevelString) {
    return level in LogLevel;
}

class Logger extends EventEmitter {
    logLevel: LogLevel;

    constructor(logLevel: LogLevelString) {
        super();
        this.logLevel = LogLevel[logLevel];
    }

    addHandler(level: LogLevelString, handler: (message: string) => void) {
        this.on(level, handler);
    }

    addHandlerMessage(handler: (obj: { level: LogLevel, message: string }) => void) {
        this.on("message", handler);
    }

    log(level: LogLevelString, message: string): void {
        if (LogLevel[level] <= this.logLevel) {
            this.emit(level, message);
            this.emit("message", { level, message });
        }
    }
}

export default Logger;
