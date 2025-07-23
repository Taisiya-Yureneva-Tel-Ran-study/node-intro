import config from "config"

export function ReadConfigParameter(parameterName: string): string {
    if (!config.has(parameterName))
        throw new Error(`Parameter ${parameterName} not found.`);
    return config.get(parameterName);
}

export function GetNumberParameterValue(name: string, defaultValue: number): number {
    let val = defaultValue;
    try {
        const s = ReadConfigParameter(name);
        if (!Number.isNaN(Number(s))) {
            val = Number(s);
        }
        else {
            // I'm using throw here because ReadConfigParameter() can also throw 
            // and I catch both cases below using the default value
            throw new Error(`Parameter ${name} is not a number.`);
        }
    } catch (err) {
        console.log(err.message, ` Using ${defaultValue} for ${name}\n`);
    }
    return val;
}

export function GetBooleanParameterValue(name: string, defaultValue: boolean): boolean {
    let val = defaultValue;
    try {
        const s = ReadConfigParameter(name);
        if (typeof s === "boolean"){
            val = s;
        } else {
            throw new Error(`Parameter ${name} is not a boolean.`);   
        }
    } catch (err) {
        console.log(err.message, ` Using ${defaultValue} for ${name}\n`);
    }
    return val;
}