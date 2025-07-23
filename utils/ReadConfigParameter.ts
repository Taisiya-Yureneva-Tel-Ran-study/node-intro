import  config from "config"

export function ReadConfigParameter(parameterName: string): string {
    if (!config.has(parameterName)) 
        throw new Error(`Parameter ${parameterName} not found`);
    return config.get(parameterName);
}

export function GetParameterValue(name: string, defaultValue: any): string {
    let val = defaultValue;
    try {
        val = ReadConfigParameter(name);
    } catch (err) {
        console.log(err.message, `using ${defaultValue} for ${name}\n`);
    }
    return val;
}

